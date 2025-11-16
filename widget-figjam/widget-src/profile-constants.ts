// Profile-related constants and helpers

// Import all class images for levels 1-3 so esbuild bundles them as data-URIs
import Ranger_1 from './img/Ranger_1.png';
import Ranger_2 from './img/Ranger_2.png';
import Ranger_3 from './img/Ranger_3.png';
import Mage_1 from './img/Mage_1.png';
import Mage_2 from './img/Mage_2.png';
import Mage_3 from './img/Mage_3.png';
import Bard_1 from './img/Bard_1.png';
import Bard_2 from './img/Bard_2.png';
import Bard_3 from './img/Bard_3.png';
import Alchemist_1 from './img/Alchemist_1.png';
import Alchemist_2 from './img/Alchemist_2.png';
import Alchemist_3 from './img/Alchemist_3.png';

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
  'Rôdeur': { 1: Ranger_1, 2: Ranger_2, 3: Ranger_3 },
  'Mage': { 1: Mage_1, 2: Mage_2, 3: Mage_3 },
  'Barde': { 1: Bard_1, 2: Bard_2, 3: Bard_3 },
  'Alchimiste': { 1: Alchemist_1, 2: Alchemist_2, 3: Alchemist_3 },
};

export function getProfileImage(selectedClass: ClassName, level: number): string {
  const images = CLASS_LEVEL_IMAGE_MAP[selectedClass];
  if (!images) return Ranger_1;
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
