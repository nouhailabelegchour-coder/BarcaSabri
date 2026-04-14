/**
 * matches.ts — BarcaSabri
 *
 * Real FC Barcelona match schedule — April 2026.
 *
 * Competition label translations (Darija):
 *   La Liga          → الليغا
 *   Champions League → دوري الأبطال
 *   Copa del Rey     → كوپا ديل ري
 */

export type Competition = 'laliga' | 'ucl' | 'copa' | 'supercopa';
export type MatchStatus = 'upcoming' | 'live' | 'finished';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;        // ISO: YYYY-MM-DD
  time: string;        // HH:MM Madrid time
  competition: Competition;
  venue: string;
  isHome: boolean;     // true if Barça is the home side
  status: MatchStatus;
}

export const competitionNames: Record<Competition, string> = {
  laliga: 'الليغا',
  ucl: 'دوري الأبطال',
  copa: 'كوپا ديل ري',
  supercopa: 'السوپر كوپا',
};

export const competitionBadgeColors: Record<Competition, string> = {
  laliga:     'bg-[#EE3524] text-white',
  ucl:        'bg-[#071D49] text-[#EDBB00]',
  copa:       'bg-[#C8973A] text-white',
  supercopa:  'bg-purple-700 text-white',
};

/** Returns 'win' | 'loss' | 'draw' from Barça's perspective. */
export function getMatchResult(match: Match): 'win' | 'loss' | 'draw' | null {
  if (match.status !== 'finished') return null;
  if (match.homeScore === undefined || match.awayScore === undefined) return null;

  const barcaGoals = match.isHome ? match.homeScore : match.awayScore;
  const opponentGoals = match.isHome ? match.awayScore : match.homeScore;

  if (barcaGoals > opponentGoals) return 'win';
  if (barcaGoals < opponentGoals) return 'loss';
  return 'draw';
}

// ── Upcoming matches ────────────────────────────────────────────────────────

export function getUpcomingMatches(): Match[] {
  return [
    {
      id: 'u1',
      // UCL QF second leg — happening today (Apr 14)
      homeTeam: 'أتلتيكو مدريد',
      awayTeam: 'برشلونة',
      date: '2026-04-14',
      time: '21:00',
      competition: 'ucl',
      venue: 'ميتروپوليتانو — مدريد',
      isHome: false,
      status: 'upcoming',
    },
    {
      id: 'u2',
      homeTeam: 'برشلونة',
      awayTeam: 'ريال سوسيداد',
      date: '2026-04-18',
      time: '21:00',
      competition: 'laliga',
      venue: 'سپوتيفاي كامپ نو',
      isHome: true,
      status: 'upcoming',
    },
    {
      id: 'u3',
      homeTeam: 'برشلونة',
      awayTeam: 'خيتافي',
      date: '2026-04-25',
      time: '18:30',
      competition: 'laliga',
      venue: 'سپوتيفاي كامپ نو',
      isHome: true,
      status: 'upcoming',
    },
    {
      id: 'u4',
      homeTeam: 'فياريال',
      awayTeam: 'برشلونة',
      date: '2026-05-02',
      time: '21:00',
      competition: 'laliga',
      venue: 'المادريغال',
      isHome: false,
      status: 'upcoming',
    },
  ];
}

// ── Past matches ────────────────────────────────────────────────────────────

export function getPastMatches(): Match[] {
  return [
    {
      id: 'p1',
      // La Liga — Barça beat Espanyol 4-1 (Ferran x2, Yamal, Rashford)
      homeTeam: 'برشلونة',
      awayTeam: 'إسبانيول',
      homeScore: 4,
      awayScore: 1,
      date: '2026-04-11',
      time: '16:15',
      competition: 'laliga',
      venue: 'سپوتيفاي كامپ نو',
      isHome: true,
      status: 'finished',
    },
    {
      id: 'p2',
      // UCL QF 1st leg — Barça 0-2 Atlético (10 men)
      homeTeam: 'برشلونة',
      awayTeam: 'أتلتيكو مدريد',
      homeScore: 0,
      awayScore: 2,
      date: '2026-04-08',
      time: '21:00',
      competition: 'ucl',
      venue: 'سپوتيفاي كامپ نو',
      isHome: true,
      status: 'finished',
    },
    {
      id: 'p3',
      // La Liga — Atlético 1-2 Barça (Lewandowski 87')
      homeTeam: 'أتلتيكو مدريد',
      awayTeam: 'برشلونة',
      homeScore: 1,
      awayScore: 2,
      date: '2026-04-04',
      time: '21:00',
      competition: 'laliga',
      venue: 'ميتروپوليتانو — مدريد',
      isHome: false,
      status: 'finished',
    },
    {
      id: 'p4',
      homeTeam: 'برشلونة',
      awayTeam: 'بيتيس',
      homeScore: 3,
      awayScore: 0,
      date: '2026-03-28',
      time: '19:00',
      competition: 'laliga',
      venue: 'سپوتيفاي كامپ نو',
      isHome: true,
      status: 'finished',
    },
    {
      id: 'p5',
      homeTeam: 'برشلونة',
      awayTeam: 'بنفيكا',
      homeScore: 4,
      awayScore: 1,
      date: '2026-03-18',
      time: '21:00',
      competition: 'ucl',
      venue: 'سپوتيفاي كامپ نو',
      isHome: true,
      status: 'finished',
    },
    {
      id: 'p6',
      homeTeam: 'رايو فاياكانو',
      awayTeam: 'برشلونة',
      homeScore: 0,
      awayScore: 3,
      date: '2026-03-14',
      time: '14:00',
      competition: 'laliga',
      venue: 'كامپو دي فوتبول دي فايياكاس',
      isHome: false,
      status: 'finished',
    },
  ];
}
