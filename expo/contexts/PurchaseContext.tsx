import { useState, useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
  PurchasesPackage,
  LOG_LEVEL,
} from 'react-native-purchases';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';

function getRCApiKey(): string {
  if (__DEV__ || Platform.OS === 'web') {
    return process.env.EXPO_PUBLIC_REVENUECAT_TEST_API_KEY ?? '';
  }
  return Platform.select({
    ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY,
    android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY,
    default: process.env.EXPO_PUBLIC_REVENUECAT_TEST_API_KEY,
  }) ?? '';
}

let rcConfigured = false;

function configureRC() {
  if (rcConfigured) return;
  const apiKey = getRCApiKey();
  if (!apiKey) {
    console.log('[RC] No API key found, skipping configuration');
    return;
  }
  try {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    Purchases.configure({ apiKey });
    rcConfigured = true;
    console.log('[RC] Configured successfully');
  } catch (error) {
    console.log('[RC] Configuration error:', error);
  }
}

configureRC();

const PREMIUM_ENTITLEMENT = 'premium';

export const [PurchaseProvider, usePurchases] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [isPremium, setIsPremium] = useState(false);
  const [devPremiumOverride, setDevPremiumOverride] = useState(false);

  const customerInfoQuery = useQuery({
    queryKey: ['rc-customer-info'],
    queryFn: async () => {
      if (!rcConfigured) return null;
      try {
        const info = await Purchases.getCustomerInfo();
        console.log('[RC] Customer info fetched:', JSON.stringify(info.entitlements.active, null, 2));
        return info;
      } catch (error) {
        console.log('[RC] Error fetching customer info:', error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const offeringsQuery = useQuery({
    queryKey: ['rc-offerings'],
    queryFn: async () => {
      if (!rcConfigured) return null;
      try {
        const offerings = await Purchases.getOfferings();
        console.log('[RC] Offerings fetched:', offerings.current?.identifier);
        if (offerings.current?.availablePackages) {
          console.log('[RC] Available packages:', offerings.current.availablePackages.map(p => p.identifier));
        }
        return offerings.current;
      } catch (error) {
        console.log('[RC] Error fetching offerings:', error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (customerInfoQuery.data) {
      const hasPremium = typeof customerInfoQuery.data.entitlements.active[PREMIUM_ENTITLEMENT] !== 'undefined';
      console.log('[RC] Premium status:', hasPremium);
      setIsPremium(hasPremium);
    }
  }, [customerInfoQuery.data]);

  useEffect(() => {
    if (!rcConfigured) return;
    const listener = (info: CustomerInfo) => {
      console.log('[RC] Customer info updated via listener');
      const hasPremium = typeof info.entitlements.active[PREMIUM_ENTITLEMENT] !== 'undefined';
      setIsPremium(hasPremium);
      queryClient.setQueryData(['rc-customer-info'], info);
    };
    Purchases.addCustomerInfoUpdateListener(listener);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
  }, [queryClient]);

  const purchaseMutation = useMutation({
    mutationFn: async (pkg: PurchasesPackage) => {
      console.log('[RC] Purchasing package:', pkg.identifier);
      const result = await Purchases.purchasePackage(pkg);
      return result;
    },
    onSuccess: (data) => {
      const hasPremium = typeof data.customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== 'undefined';
      if (hasPremium) {
        setIsPremium(true);
        queryClient.setQueryData(['rc-customer-info'], data.customerInfo);
        console.log('[RC] Purchase successful, premium unlocked');
      }
    },
    onError: (error: any) => {
      if (error.userCancelled) {
        console.log('[RC] User cancelled purchase');
        return;
      }
      console.log('[RC] Purchase error:', error);
      Alert.alert('Purchase Failed', 'Something went wrong. Please try again.');
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async () => {
      console.log('[RC] Restoring purchases...');
      const info = await Purchases.restorePurchases();
      return info;
    },
    onSuccess: (info) => {
      const hasPremium = typeof info.entitlements.active[PREMIUM_ENTITLEMENT] !== 'undefined';
      setIsPremium(hasPremium);
      queryClient.setQueryData(['rc-customer-info'], info);
      if (hasPremium) {
        Alert.alert('Restored!', 'Your premium access has been restored.');
      } else {
        Alert.alert('No Purchases Found', 'We couldn\'t find any previous purchases to restore.');
      }
      console.log('[RC] Restore complete, premium:', hasPremium);
    },
    onError: (error) => {
      console.log('[RC] Restore error:', error);
      Alert.alert('Restore Failed', 'Something went wrong. Please try again.');
    },
  });

  const purchasePackage = useCallback((pkg: PurchasesPackage) => {
    purchaseMutation.mutate(pkg);
  }, [purchaseMutation]);

  const restorePurchases = useCallback(() => {
    restoreMutation.mutate();
  }, [restoreMutation]);

  const monthlyPackage = offeringsQuery.data?.monthly ?? null;
  const annualPackage = offeringsQuery.data?.annual ?? null;

  const toggleDevPremium = useCallback(() => {
    setDevPremiumOverride(prev => {
      const next = !prev;
      console.log('[RC] Dev premium override:', next);
      return next;
    });
  }, []);

  const effectivePremium = devPremiumOverride || isPremium;

  return {
    isPremium: effectivePremium,
    devPremiumOverride,
    customerInfo: customerInfoQuery.data ?? null,
    offering: offeringsQuery.data ?? null,
    monthlyPackage,
    annualPackage,
    isLoadingOfferings: offeringsQuery.isLoading,
    isPurchasing: purchaseMutation.isPending,
    isRestoring: restoreMutation.isPending,
    purchasePackage,
    restorePurchases,
    toggleDevPremium,
  };
});
