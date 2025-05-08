
export const SKRITTER_KEYWORDS = {
  HELPFUL: 'HELPFUL',
  FLIGHTY: 'FLIGHTY',
  WATERFOND: 'WATERFOND',
  NOCTERNAL: 'NOCTERNAL',
  SCOUT: 'SCOUT',
  'COLD-BLOODED': 'COLD-BLOODED',
  DISTRACTED: 'DISTRACTED',
  CONCENTRATION: 'CONCENTRATION',
  MEEK: 'MEEK',
  STEADY: 'STEADY',
  FEROCIOUS: 'FEROCIOUS',
  'SHARP-EYED': 'SHARP-EYED',
  DREAMER: 'DREAMER',
  POINTED: 'POINTED',
} as const;
type SkritterKeyword = typeof SKRITTER_KEYWORDS[keyof typeof SKRITTER_KEYWORDS];
 

export const ITEM_KEYWORDS = {
  PLANT: 'PLANT',
  METAL: 'METAL',
  GEM: 'GEM',
  FLAME: 'FLAME',
  FROST: 'FROST',
  WATER: 'WATER',
  ZAP: 'ZAP',
  GLOOMY: 'GLOOMY',
  METALORPLANT: 'METALORPLANT',
} as const;
type ItemKeyword = typeof ITEM_KEYWORDS[keyof typeof ITEM_KEYWORDS];

type Keyword = SkritterKeyword | ItemKeyword;

export type {
  Keyword,
  ItemKeyword,
  SkritterKeyword
}
