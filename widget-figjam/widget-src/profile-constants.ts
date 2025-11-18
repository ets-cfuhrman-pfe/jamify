// Profile-related constants and helpers

// To keep the widget bundle lean and speed up startup, we load images
// from GitHub raw URLs instead of inlining large data URIs.
// If you change the branch or repo, update CDN_BASE accordingly.
// Using jsDelivr CDN for GitHub avoids raw.githubusercontent rate limits and is cache-friendly.
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/ets-cfuhrman-pfe/jamify@UCE-01-Personnalisation-du-profil/widget-figjam/widget-src/img';

export const CLASSES = ['Rôdeur', 'Mage', 'Barde', 'Alchimiste'] as const;
export type ClassName = typeof CLASSES[number];

export const CLASS_TITLES: Record<ClassName, [string, string, string]> = {
  'Rôdeur': [
    'Apprenti du Sablier',
    'Maître des Horloges',
    'Stratège du Temps',
  ],
  'Mage': [
    'Éveilleur des Murmures',
    'Gardien des Voix',
    'Chanteur des Âmes Unies',
  ],
  'Barde': [
    'Copiste des Premiers Parchemins',
    'Chroniqueur du Savoir',
    'Scribe du Royaume',
  ],
  'Alchimiste': [
    "Distillateur d'Expériences",
    'Sage des Métamorphoses',
    'Alchimiste du Progrès',
  ],
};

export const CLASS_LEVEL_IMAGE_MAP: Record<ClassName, Record<1 | 2 | 3, string>> = {
  'Rôdeur': {
    1: `${CDN_BASE}/Ranger_1.png`,
    2: `${CDN_BASE}/Ranger_2.png`,
    3: `${CDN_BASE}/Ranger_3.png`,
  },
  'Mage': {
    1: `${CDN_BASE}/Mage_1.png`,
    2: `${CDN_BASE}/Mage_2.png`,
    3: `${CDN_BASE}/Mage_3.png`,
  },
  'Barde': {
    1: `${CDN_BASE}/Bard_1.png`,
    2: `${CDN_BASE}/Bard_2.png`,
    3: `${CDN_BASE}/Bard_3.png`,
  },
  'Alchimiste': {
    1: `${CDN_BASE}/Alchemist_1.png`,
    2: `${CDN_BASE}/Alchemist_2.png`,
    3: `${CDN_BASE}/Alchemist_3.png`,
  },
};

export function getProfileImage(selectedClass: ClassName, level: number): string {
  const images = CLASS_LEVEL_IMAGE_MAP[selectedClass];
  if (!images) return `${CDN_BASE}/Ranger_1.png`;
  if (level >= 3) return images[3];
  if (level === 2) return images[2];
  return images[1];
}

export function getTitleFor(selectedClass: ClassName, level: number): string {
  const titlesArr = CLASS_TITLES[selectedClass];
  if (!titlesArr) return 'Aventurier';
  const idx = level >= 3 ? 2 : level === 2 ? 1 : 0;
  return titlesArr[idx];
}
