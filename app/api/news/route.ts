import { NextResponse } from 'next/server';
import { fetchBarcelonaNews } from '@/lib/fetchNews';

/**
 * GET /api/news
 *
 * API route that proxies Serper.dev news requests.
 * Useful for client-side refresh buttons without exposing the API key.
 * Cached on Vercel Edge for 5 minutes.
 */
export const revalidate = 300;

export async function GET() {
  try {
    const news = await fetchBarcelonaNews();
    return NextResponse.json({ news, total: news.length });
  } catch (error) {
    console.error('[/api/news]', error);
    return NextResponse.json(
      { error: 'فشل تحميل الأخبار', news: [], total: 0 },
      { status: 500 }
    );
  }
}
