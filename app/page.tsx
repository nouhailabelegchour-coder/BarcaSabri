import { fetchBarcelonaNews } from '@/lib/fetchNews';
import { getUpcomingMatches, getPastMatches } from '@/lib/matches';
import Dashboard from '@/components/Dashboard';

/**
 * ISR: Vercel will regenerate this page at most once every 5 minutes.
 * News stays fresh without a full rebuild.
 */
export const revalidate = 300;

export default async function Home() {
  // Fetch news and match data in parallel on the server
  const [news] = await Promise.allSettled([fetchBarcelonaNews()]);

  const newsData = news.status === 'fulfilled' ? news.value : [];
  const upcomingMatches = getUpcomingMatches();
  const pastMatches = getPastMatches();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header
        className="text-white py-10 px-4 text-center shadow-xl"
        style={{ background: 'linear-gradient(135deg, #004D98 0%, #A50044 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Logo Row */}
          <div className="flex items-center justify-center gap-4 mb-3">
            {/* Diagonal stripes badge mimicking Barca crest shape */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 shadow-lg"
              style={{ background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)' }}
            >
              ⚽
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-black text-shadow tracking-wide">
                بارصا صابري
              </h1>
              <p className="text-xs font-medium opacity-70 mt-0.5 tracking-widest uppercase">
                Barça Sabri
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-base font-medium opacity-85 mb-5">
            بلا صابرة ماكاينش فرحة — الموقع ديالك لأخبار وماتشات برشلونة
          </p>

          {/* Quick badges */}
          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <span className="bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
              🏆 الليغا
            </span>
            <span className="bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
              ⭐ دوري الأبطال
            </span>
            <span className="bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
              📡 أخبار حية
            </span>
            <span className="bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
              🇲🇦 بالدارجة
            </span>
          </div>
        </div>
      </header>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <div
        className="py-3 px-4 text-white text-sm font-semibold"
        style={{ background: '#003570' }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 opacity-90">
          <span>📰 {newsData.length} خبر</span>
          <span>📅 {upcomingMatches.length} ماتشات جاييان</span>
          <span>🕐 {pastMatches.length} ماتشات فاتو</span>
        </div>
      </div>

      {/* ── Dashboard (client — tabs + content) ────────────────────────── */}
      <Dashboard
        news={newsData}
        upcomingMatches={upcomingMatches}
        pastMatches={pastMatches}
      />

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-gray-200 py-6 text-center text-gray-400 text-xs">
        <p className="font-semibold text-gray-500">
          بارصا صابري &copy; {new Date().getFullYear()}
        </p>
        <p className="mt-1 opacity-60">
          مصنوع بـ ❤️ لعشاق برشلونة — ألوان: بلاوغرانا
        </p>
      </footer>
    </div>
  );
}
