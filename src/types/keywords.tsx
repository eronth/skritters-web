type SkritterKeyword = 
  'HELPFUL' | 'FLIGHTY' | 'WATERFOND' |
  'NOCTERNAL' | 'SCOUT' | 'COLD-BLOODED' |
  'DISTRACTED' | 'CONCENTRATION' | 'MEEK' |
  'STEADY' | 'FEROCIOUS' | 'SHARP-EYED' |
  'DREAMER' | 'POINTED';

type ItemKeyword = 'WOOD' | 'METAL' | 'GEM' 
  | 'FLAME' | 'FROST' | 'WATER' | 'ZAP'
  | 'GLOOMY';

type Keyword = SkritterKeyword | ItemKeyword;

export type {
  Keyword,
  ItemKeyword,
  SkritterKeyword
}
