import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Keep-Alive Cron Job
 * Bu route, Supabase projesinin inaktiflik nedeniyle uyku moduna (pause) geçmesini 
 * engellemek için her 5 günde bir veritabanına küçük bir dokunuş yapar.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  // Vercel Cron Güvenliği: Sadece Vercel'den gelen isteklere izin ver
  // (Not: Lokal testlerde CRON_SECRET olmayabilir)
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // keep_alive tablosunu güncelle veya veri ekle
    // Eğer tablo yoksa hata verecektir, bu yüzden hata yakalama içindedir.
    const { error } = await supabase
      .from('keep_alive')
      .upsert({ id: 1, last_ping: new Date().toISOString() }, { onConflict: 'id' });

    if (error) {
      console.error('Keep-alive update error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase is awake!', 
      timestamp: new Date().toISOString() 
    });
  } catch (err) {
    console.error('Keep-alive unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Unexpected error' }, { status: 500 });
  }
}
