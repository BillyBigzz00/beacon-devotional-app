export interface BibleTranslation {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
}

export const BIBLE_TRANSLATIONS: BibleTranslation[] = [
  { id: 'niv', name: 'New International Version', abbreviation: 'NIV', description: 'Modern, readable English' },
  { id: 'esv', name: 'English Standard Version', abbreviation: 'ESV', description: 'Literal, scholarly accuracy' },
  { id: 'csb', name: 'Christian Standard Bible', abbreviation: 'CSB', description: 'Balance of accuracy & clarity' },
  { id: 'nlt', name: 'New Living Translation', abbreviation: 'NLT', description: 'Easy-to-understand' },
  { id: 'kjv', name: 'King James Version', abbreviation: 'KJV', description: 'Traditional, historic' },
  { id: 'nkjv', name: 'New King James Version', abbreviation: 'NKJV', description: 'Updated traditional' },
  { id: 'nabre', name: 'New American Bible Revised', abbreviation: 'NABRE', description: 'Catholic approved' },
  { id: 'rsv-ce', name: 'Revised Standard Version CE', abbreviation: 'RSV-CE', description: 'Catholic Edition' },
];

export const DEFAULT_TRANSLATION = 'niv';
