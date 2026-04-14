'use client';

import { useState } from 'react';
import type { NewsItem } from '@/lib/fetchNews';
import type { Match } from '@/lib/matches';
import { competitionNames, competitionBadgeColors, getMatchResult } from '@/lib/matches';

interface DashboardProps {
  news: NewsItem[];
  upcomingMatches: Match[];
  pastMatches: Match[];
}

const TABS = [
  { id: 'news' as const, label: 'أخبار البارصا', icon: '📰' },
  { id: 'upcoming' as const, label: 'ماتشات جاييان', icon: '📅' },
  { id: 'past' as const, label: 'ماتشات لي فاتو', icon: '🕐' },
];

type TabId = (typeof TABS)[number]['id'];

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatMatchDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ar-MA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

// ─── News Section ────────────────────────────────────────────────────────────

function NewsSection({ news }: { news: NewsItem[] }) {
  if (news.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-3">📭</p>
        <p className="text-lg font-medium">ماكاينش أخبار دابا</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {news.map((item, i) => (
        <NewsCard key={i} item={item} />
      ))}
    </div>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-100">
        {item.imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              (e.currentTarget.parentElement as HTMLElement).classList.add('barca-stripes');
            }}
          />
        ) : (
          <div className="barca-stripes w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-60">⚽</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-[#004D98] transition-colors">
          {item.title}
        </h3>
        {item.snippet && (
          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed flex-1">
            {item.snippet}
          </p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
          <span className="font-semibold text-[#004D98] truncate max-w-[55%]">{item.source}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </a>
  );
}

// ─── Match Section ────────────────────────────────────────────────────────────

function MatchSection({
  matches,
  type,
}: {
  matches: Match[];
  type: 'upcoming' | 'past';
}) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-3">📭</p>
        <p className="text-lg font-medium">ماكاين حتى ماتش دابا</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} type={type} />
      ))}
    </div>
  );
}

function MatchCard({ match, type }: { match: Match; type: 'upcoming' | 'past' }) {
  const result = type === 'past' ? getMatchResult(match) : null;

  const resultStyle =
    result === 'win'
      ? 'border-green-400 bg-green-50'
      : result === 'loss'
      ? 'border-red-400 bg-red-50'
      : result === 'draw'
      ? 'border-yellow-400 bg-yellow-50'
      : 'border-gray-200 bg-white';

  const resultLabel =
    result === 'win'
      ? { text: 'فوز', cls: 'bg-green-100 text-green-700' }
      : result === 'loss'
      ? { text: 'خسارة', cls: 'bg-red-100 text-red-700' }
      : result === 'draw'
      ? { text: 'تعادل', cls: 'bg-yellow-100 text-yellow-700' }
      : null;

  return (
    <div
      className={`rounded-2xl border-2 p-4 shadow-sm card-hover ${resultStyle}`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Competition badge */}
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
            competitionBadgeColors[match.competition]
          }`}
        >
          {competitionNames[match.competition]}
        </span>

        {/* Teams & Score */}
        <div className="flex items-center gap-3 flex-1 justify-center min-w-0">
          <span
            className={`font-bold text-base truncate ${
              match.isHome ? 'text-[#004D98]' : 'text-gray-700'
            }`}
          >
            {match.homeTeam}
          </span>

          {type === 'past' && match.homeScore !== undefined ? (
            <span className="text-2xl font-black text-gray-900 shrink-0">
              {match.homeScore} — {match.awayScore}
            </span>
          ) : (
            <span className="text-lg font-semibold text-gray-400 shrink-0">
              {match.time}
            </span>
          )}

          <span
            className={`font-bold text-base truncate ${
              !match.isHome ? 'text-[#004D98]' : 'text-gray-700'
            }`}
          >
            {match.awayTeam}
          </span>
        </div>

        {/* Date / Result / Venue */}
        <div className="flex items-center gap-2 shrink-0 text-left">
          {resultLabel && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${resultLabel.cls}`}>
              {resultLabel.text}
            </span>
          )}
          <div className="text-xs text-gray-500 text-left">
            <div className="font-medium">{formatMatchDate(match.date)}</div>
            <div className="opacity-70">{match.venue}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard (default export) ───────────────────────────────────────────────

export default function Dashboard({ news, upcomingMatches, pastMatches }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('news');

  const counts: Record<TabId, number> = {
    news: news.length,
    upcoming: upcomingMatches.length,
    past: pastMatches.length,
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <nav className="flex gap-2 mb-8 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 flex-1 justify-center ${
              activeTab === tab.id
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={
              activeTab === tab.id
                ? { background: 'linear-gradient(135deg, #004D98, #A50044)' }
                : {}
            }
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {counts[tab.id] > 0 && (
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${
                  activeTab === tab.id
                    ? 'bg-white/25 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {counts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Content */}
      {activeTab === 'news' && <NewsSection news={news} />}
      {activeTab === 'upcoming' && (
        <MatchSection matches={upcomingMatches} type="upcoming" />
      )}
      {activeTab === 'past' && (
        <MatchSection matches={pastMatches} type="past" />
      )}
    </main>
  );
}
