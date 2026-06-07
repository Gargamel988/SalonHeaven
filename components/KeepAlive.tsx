'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export default function KeepAlive() {
  const { error } = useQuery({
    queryKey: ['keepAlivePing'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('keep_alive')
        .upsert({ id: 1, last_ping: new Date().toISOString() }, { onConflict: 'id' })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    staleTime: Infinity, // Sayfa açık kaldığı sürece sadece bir kez çalışır
    gcTime: Infinity,
  });

  if (error) {
    console.error('Database keep-alive ping failed:', error.message);
  }

  return null;
}
