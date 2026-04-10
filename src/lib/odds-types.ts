export interface MatchOdds {
  matchId: string; // Same format as our match IDs: "A-0", "B-1", etc.
  home: string;
  draw: string;
  away: string;
  bookmaker: string;
  affiliateLink: string;
  updatedAt: string;
}

// Affiliate config - update these when you have your affiliate link
export const ODDS_CONFIG = {
  bookmaker: "Unibet",
  affiliateBaseUrl: "", // Set your affiliate link here, e.g. "https://www.unibet.se/?utm_source=kollavm&..."
  enabled: false, // Set to true when affiliate link is ready
};
