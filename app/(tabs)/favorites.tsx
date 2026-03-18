import React from 'react';
import { useRouter } from 'expo-router';
import FavoritesScreen from '@/components/FavoritesScreen';
import { DailyDevotional } from '@/mocks/devotional';

export default function FavoritesTab() {
  const router = useRouter();

  const handleSelectDevotional = (devotional: DailyDevotional) => {
    router.push({
      pathname: '/devotional',
      params: { devotionalId: devotional.id },
    } as any);
  };

  return (
    <FavoritesScreen
      onSelectDevotional={handleSelectDevotional}
    />
  );
}
