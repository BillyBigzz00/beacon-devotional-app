export interface DevotionalTopic {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  devotionalCount: number;
  description: string;
  isPremium: boolean;
  sampleVerses: string[];
}

export const DEVOTIONAL_TOPICS: DevotionalTopic[] = [
  {
    id: 'anxiety-peace',
    title: 'Anxiety & Peace',
    subtitle: 'Finding calm in the storm',
    emoji: '🕊️',
    color: '#5B8FB9',
    devotionalCount: 30,
    description: 'A 30-day journey through Scripture\'s most powerful promises about peace, worry, and trusting God in uncertain times.',
    isPremium: true,
    sampleVerses: ['Philippians 4:6-7', 'Isaiah 26:3', 'Matthew 6:25-27', 'Psalm 23:1-4'],
  },
  {
    id: 'gratitude-joy',
    title: 'Gratitude & Joy',
    subtitle: 'Cultivating a thankful heart',
    emoji: '✨',
    color: '#6B8E5E',
    devotionalCount: 14,
    description: 'Train your eyes to see blessings. These daily readings shift perspective from scarcity to abundance.',
    isPremium: false,
    sampleVerses: ['1 Thessalonians 5:16-18', 'Psalm 118:24', 'James 1:17', 'Philippians 4:4'],
  },
  {
    id: 'faith-doubt',
    title: 'Faith & Doubt',
    subtitle: 'Honest questions, deeper trust',
    emoji: '🌊',
    color: '#4A90A4',
    devotionalCount: 21,
    description: 'For the moments when belief feels hard. Walk through the Bible\'s most honest wrestlings with doubt and emerge with a faith that\'s been tested.',
    isPremium: false,
    sampleVerses: ['Mark 9:24', 'Habakkuk 1:2-3', 'Psalm 13:1-2', 'John 20:27-29'],
  },
  {
    id: 'grief-comfort',
    title: 'Grief & Comfort',
    subtitle: 'Walking through loss with hope',
    emoji: '💛',
    color: '#C9A96E',
    devotionalCount: 21,
    description: 'For seasons of loss and sorrow. These devotionals meet you in your pain and point toward the God who weeps with us.',
    isPremium: true,
    sampleVerses: ['Psalm 34:18', 'Revelation 21:4', '2 Corinthians 1:3-4', 'Matthew 5:4'],
  },
  {
    id: 'marriage-love',
    title: 'Marriage & Love',
    subtitle: 'Building a Christ-centered relationship',
    emoji: '💍',
    color: '#E85D75',
    devotionalCount: 28,
    description: 'Strengthen your marriage through daily reflections on love, sacrifice, forgiveness, and the covenant God designed.',
    isPremium: true,
    sampleVerses: ['1 Corinthians 13:4-7', 'Ephesians 5:25', 'Genesis 2:24', 'Song of Solomon 8:6-7'],
  },
  {
    id: 'leadership-calling',
    title: 'Leadership & Calling',
    subtitle: 'Leading with wisdom and purpose',
    emoji: '🔥',
    color: '#FF6432',
    devotionalCount: 21,
    description: 'Whether you lead at work, in ministry, or at home — discover what it means to lead like Jesus.',
    isPremium: true,
    sampleVerses: ['Proverbs 3:5-6', 'Joshua 1:9', 'Mark 10:43-45', 'Jeremiah 29:11'],
  },
  {
    id: 'forgiveness',
    title: 'Forgiveness & Freedom',
    subtitle: 'Releasing what holds you back',
    emoji: '🗝️',
    color: '#8B6DB0',
    devotionalCount: 21,
    description: 'The hardest and most transformative act of faith. Walk through what it truly means to forgive — and be forgiven.',
    isPremium: true,
    sampleVerses: ['Colossians 3:13', 'Matthew 6:14-15', 'Ephesians 4:31-32', 'Psalm 103:12'],
  },
  {
    id: 'identity-worth',
    title: 'Identity & Worth',
    subtitle: 'Who God says you are',
    emoji: '👑',
    color: '#D4AF37',
    devotionalCount: 14,
    description: 'In a world that measures your value by performance, discover the unshakable identity you have in Christ.',
    isPremium: true,
    sampleVerses: ['Psalm 139:13-14', 'Ephesians 2:10', 'Romans 8:37-39', '1 Peter 2:9'],
  },
  {
    id: 'provision-trust',
    title: 'Provision & Trust',
    subtitle: 'When finances feel uncertain',
    emoji: '🌾',
    color: '#A67C52',
    devotionalCount: 21,
    description: 'God\'s promises for seasons of financial stress, job loss, or uncertainty. Learn to trust the Provider.',
    isPremium: true,
    sampleVerses: ['Matthew 6:31-33', 'Philippians 4:19', 'Proverbs 3:9-10', 'Malachi 3:10'],
  },
  {
    id: 'parenting',
    title: 'Parenting & Family',
    subtitle: 'Raising kids with grace and grit',
    emoji: '🏠',
    color: '#5C9EAD',
    devotionalCount: 28,
    description: 'For exhausted parents who want to lead their families well. Daily wisdom for the beautiful, messy work of raising kids.',
    isPremium: true,
    sampleVerses: ['Deuteronomy 6:6-7', 'Proverbs 22:6', 'Psalm 127:3', 'Colossians 3:21'],
  },
  {
    id: 'courage-fear',
    title: 'Courage & Fear',
    subtitle: 'Moving forward when afraid',
    emoji: '🦁',
    color: '#D97B3A',
    devotionalCount: 14,
    description: '"Do not be afraid" appears 365 times in the Bible — one for every day. This track explores the bravest stories in Scripture.',
    isPremium: false,
    sampleVerses: ['Joshua 1:9', 'Isaiah 41:10', '2 Timothy 1:7', 'Psalm 27:1'],
  },
  {
    id: 'prayer-life',
    title: 'Prayer Life',
    subtitle: 'Learning to talk with God',
    emoji: '🙏',
    color: '#7B68AE',
    devotionalCount: 21,
    description: 'From the Lord\'s Prayer to Paul\'s prison letters, discover how the saints prayed — and transform your own prayer life.',
    isPremium: true,
    sampleVerses: ['Matthew 6:9-13', 'Philippians 4:6', '1 Thessalonians 5:17', 'Psalm 62:8'],
  },
  {
    id: 'rest-sabbath',
    title: 'Rest & Sabbath',
    subtitle: 'Permission to slow down',
    emoji: '🌙',
    color: '#2D4059',
    devotionalCount: 14,
    description: 'In a culture that glorifies hustle, rediscover the radical, countercultural gift of holy rest.',
    isPremium: true,
    sampleVerses: ['Exodus 20:8-10', 'Matthew 11:28-30', 'Psalm 46:10', 'Mark 6:31'],
  },
];

export const getTopicById = (id: string): DevotionalTopic | undefined => {
  return DEVOTIONAL_TOPICS.find(t => t.id === id);
};

export const getPremiumTopics = (): DevotionalTopic[] => {
  return DEVOTIONAL_TOPICS.filter(t => t.isPremium);
};

export const getFreeTopics = (): DevotionalTopic[] => {
  return DEVOTIONAL_TOPICS.filter(t => !t.isPremium);
};
