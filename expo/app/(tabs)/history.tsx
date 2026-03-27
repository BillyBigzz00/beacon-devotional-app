import React from 'react';
import { useRouter } from 'expo-router';
import HistoryScreen from '@/components/HistoryScreen';
import { DailyDevotional } from '@/mocks/devotional';

export default function HistoryTab() {
  const router = useRouter();

  const handleSelectDevotional = (devotional: DailyDevotional) => {
    router.push({
      pathname: '/devotional',
      params: { devotionalId: devotional.id },
    } as any);
  };

  const handleUpgrade = () => {
    router.push('/premium' as any);
  };

  return (
    <HistoryScreen
      onSelectDevotional={handleSelectDevotional}
      onUpgrade={handleUpgrade}
    />
  );
}
