// Blocked words/patterns related to racism and hate speech (Swedish + English)
const BLOCKED_PATTERNS = [
  // Swedish slurs & hate speech
  /\bn[e3]g[e3]r/i,
  /\bbl[a4]tt[e3]/i,
  /\bsv[a4]rtsk[a4]ll/i,
  /\bfl[a4]tna[s5][a4]/i,
  /\bap[a4]j[a4]v[e3]l/i,
  /\bk[a4]n[a4]k/i,
  /\br[a4]sh[a4]t/i,
  /\br[a4]s[i1]s[tm]/i,
  /\butl[a4]nn[i1]ng/i,
  // English slurs
  /\bn[i1]gg/i,
  /\bk[i1]k[e3]/i,
  /\bsp[i1]c/i,
  /\bch[i1]nk/i,
  /\bw[e3]tb[a4]ck/i,
  /\bg[o0]{2}k/i,
  /\bc[o0]{2}n/i,
  // General hate
  /\bh[e3][i1]l\s*h[i1]tl[e3]r/i,
  /\bn[a4]z[i1]/i,
  /\bwhite\s*power/i,
  /\bwhite\s*suprem/i,
  /\beth?n[i1]c\s*cleans/i,
];

export function isOffensive(text: string): boolean {
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(text));
}
