import { CLASSES, CLASS_TITLES, CLASS_LEVEL_IMAGE_MAP, getProfileImage, getTitleFor } from '../widget-figjam/widget-src/profile-constants';

describe('profile-constants', () => {
  test('CLASSES contains expected entries', () => {
    expect(CLASSES).toEqual(['Rôdeur', 'Mage', 'Barde', 'Alchimiste']);
  });

  test('getTitleFor returns correct titles per level boundaries', () => {
    const cls = 'Rôdeur' as const;
    expect(getTitleFor(cls, 1)).toBe(CLASS_TITLES[cls][0]);
    expect(getTitleFor(cls, 2)).toBe(CLASS_TITLES[cls][1]);
    expect(getTitleFor(cls, 3)).toBe(CLASS_TITLES[cls][2]);
    expect(getTitleFor(cls, 99)).toBe(CLASS_TITLES[cls][2]); // max tier clamp
  });

  test('getProfileImage returns correct image per level boundaries', () => {
    const cls = 'Mage' as const;
    expect(getProfileImage(cls, 1)).toBe(CLASS_LEVEL_IMAGE_MAP[cls][1]);
    expect(getProfileImage(cls, 2)).toBe(CLASS_LEVEL_IMAGE_MAP[cls][2]);
    expect(getProfileImage(cls, 3)).toBe(CLASS_LEVEL_IMAGE_MAP[cls][3]);
    expect(getProfileImage(cls, 99)).toBe(CLASS_LEVEL_IMAGE_MAP[cls][3]); // clamp
  });
});
