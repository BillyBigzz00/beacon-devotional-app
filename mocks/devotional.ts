export interface DailyDevotional {
  id: string;
  date: string;
  headline: string;
  source: string;
  sourceUrl?: string;
  articleTitle?: string;
  articleUnavailable?: boolean;
  verses: VerseReference[];
  reflection: string;
  premiumReflection?: string;
}

export interface VerseReference {
  reference: string;
  text: Record<string, string>;
}

export const MOCK_DEVOTIONALS: DailyDevotional[] = [
  {
    id: '2026-02-04',
    date: '2026-02-04',
    headline: 'Medical breakthrough brings new hope as researchers announce successful trials for affordable treatment targeting childhood leukemia.',
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com/hub/health',
    articleTitle: 'Childhood Leukemia Treatment Breakthrough',
    verses: [
      {
        reference: 'Jeremiah 30:17',
        text: {
          'niv': 'But I will restore you to health and heal your wounds, declares the LORD.',
          'esv': 'For I will restore health to you, and your wounds I will heal, declares the LORD.',
          'csb': 'But I will bring you health and will heal your wounds—this is the LORD\'s declaration.',
          'nlt': 'I will give you back your health and heal your wounds, says the LORD.',
          'kjv': 'For I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD.',
          'nkjv': 'For I will restore health to you and heal you of your wounds, says the LORD.',
          'nabre': 'For I will restore your health; I will heal your wounds—oracle of the LORD.',
          'rsv-ce': 'For I will restore health to you, and your wounds I will heal, says the LORD.',
        },
      },
      {
        reference: 'James 5:14-15',
        text: {
          'niv': 'Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord. And the prayer offered in faith will make the sick person well.',
          'esv': 'Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord. And the prayer of faith will save the one who is sick.',
          'csb': 'Is anyone among you sick? He should call for the elders of the church, and they are to pray over him, anointing him with oil in the name of the Lord. The prayer of faith will save the sick person.',
          'nlt': 'Are any of you sick? You should call for the elders of the church to come and pray over you, anointing you with oil in the name of the Lord. Such a prayer offered in faith will heal the sick.',
          'kjv': 'Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick.',
          'nkjv': 'Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord. And the prayer of faith will save the sick.',
          'nabre': 'Is anyone among you sick? He should summon the presbyters of the church, and they should pray over him and anoint him with oil in the name of the Lord. The prayer of faith will save the sick person.',
          'rsv-ce': 'Is any among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord; and the prayer of faith will save the sick man.',
        },
      },
    ],
    reflection: `In a world that often feels overwhelmed by suffering, news of healing breakthroughs reminds us that hope persists. When researchers dedicate their lives to finding cures, when medicine advances to save the most vulnerable among us—children battling cancer—we witness human ingenuity partnering with divine compassion.

Jeremiah's promise of restoration speaks across millennia to every parent who has sat in a hospital waiting room, every child who has faced fear beyond their years. God declares Himself a healer not just of bodies, but of wounds both seen and unseen.

James reminds us that healing involves community. The elders pray, the oil is applied, faith is offered—it's never meant to be a solitary struggle. Whether through the hands of doctors, the prayers of believers, or the breakthrough of science, God works through many means to bring restoration.

Today, pray for the researchers working tirelessly in laboratories. Pray for families awaiting treatment. And remember: every act of healing, every medical discovery, every moment of relief from suffering reflects the heart of a God who promises to make all things new.`,
    premiumReflection: `In a world that often feels overwhelmed by suffering, news of healing breakthroughs reminds us that hope persists. When researchers dedicate their lives to finding cures, when medicine advances to save the most vulnerable among us—children battling cancer—we witness human ingenuity partnering with divine compassion.

Jeremiah's promise of restoration speaks across millennia to every parent who has sat in a hospital waiting room, every child who has faced fear beyond their years. The Hebrew word for "restore"—shub—carries the sense of returning something to its original state. God's healing isn't just patching up brokenness; it's restoration to wholeness, to the way things were meant to be.

James reminds us that healing involves community. The elders pray, the oil is applied, faith is offered—it's never meant to be a solitary struggle. Notice that James doesn't separate physical healing from spiritual wellbeing. In the biblical worldview, we are integrated beings, and true healing addresses the whole person.

The early church understood something we often forget: science and faith are not enemies. The same God who created natural laws also works through those who discover and apply them. Medical research is, in a real sense, a form of worship—using the minds God gave us to push back against the effects of a broken world.

Today, pray for the researchers working tirelessly in laboratories. Pray for families awaiting treatment. Remember the children in oncology wards who show courage that humbles adults. And hold onto this truth: every act of healing, every medical discovery, every moment of relief from suffering reflects the heart of a God who promises to wipe away every tear and make all things new.`,
  },
  {
    id: '2026-02-03',
    date: '2026-02-03',
    headline: 'Communities across the nation come together to support families affected by recent flooding, with volunteers working around the clock to provide shelter and supplies.',
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com/hub/weather',
    articleTitle: 'Flood Relief Communities',
    verses: [
      {
        reference: 'Galatians 6:2',
        text: {
          'niv': 'Carry each other\'s burdens, and in this way you will fulfill the law of Christ.',
          'esv': 'Bear one another\'s burdens, and so fulfill the law of Christ.',
          'csb': 'Carry one another\'s burdens; in this way you will fulfill the law of Christ.',
          'nlt': 'Share each other\'s burdens, and in this way obey the law of Christ.',
          'kjv': 'Bear ye one another\'s burdens, and so fulfil the law of Christ.',
          'nkjv': 'Bear one another\'s burdens, and so fulfill the law of Christ.',
          'nabre': 'Bear one another\'s burdens, and so you will fulfill the law of Christ.',
          'rsv-ce': 'Bear one another\'s burdens, and so fulfil the law of Christ.',
        },
      },
      {
        reference: 'Isaiah 58:10',
        text: {
          'niv': 'And if you spend yourselves in behalf of the hungry and satisfy the needs of the oppressed, then your light will rise in the darkness, and your night will become like the noonday.',
          'esv': 'If you pour yourself out for the hungry and satisfy the desire of the afflicted, then shall your light rise in the darkness and your gloom be as the noonday.',
          'csb': 'And if you offer yourself to the hungry, and satisfy the afflicted one, then your light will shine in the darkness, and your night will be like noonday.',
          'nlt': 'Feed the hungry, and help those in trouble. Then your light will shine out from the darkness, and the darkness around you will be as bright as noon.',
          'kjv': 'And if thou draw out thy soul to the hungry, and satisfy the afflicted soul; then shall thy light rise in obscurity, and thy darkness be as the noon day.',
          'nkjv': 'If you extend your soul to the hungry and satisfy the afflicted soul, then your light shall dawn in the darkness, and your darkness shall be as the noonday.',
          'nabre': 'If you lavish your food on the hungry and satisfy the afflicted; then your light shall rise in the darkness, and your gloom shall become like midday.',
          'rsv-ce': 'If you pour yourself out for the hungry and satisfy the desire of the afflicted, then shall your light rise in the darkness and your gloom be as the noonday.',
        },
      },
    ],
    reflection: `When disaster strikes, something beautiful often emerges from the rubble: the undeniable human impulse to help one another. We see neighbors who were strangers yesterday becoming lifelines today. We witness communities setting aside differences to focus on what matters most—caring for those in need.

This is the heart of the Gospel in action. Paul reminds us that bearing one another's burdens is not merely a kind suggestion; it is the very fulfillment of Christ's law of love. When we step into someone's pain, when we offer our hands, our resources, our presence, we embody the compassion Jesus showed throughout His ministry.

Isaiah paints a stunning picture: when we pour ourselves out for the hungry and afflicted, our light rises in the darkness. Notice the promise isn't that we'll have light—it's that we'll become light. Our acts of mercy don't just help others; they transform us and illuminate the world around us.

Today, whether you're able to volunteer, donate, or simply pray, remember that every act of compassion ripples outward. You may be the answer to someone's desperate prayer. Let your light shine.`,
    premiumReflection: `When disaster strikes, something beautiful often emerges from the rubble: the undeniable human impulse to help one another. We see neighbors who were strangers yesterday becoming lifelines today. We witness communities setting aside differences to focus on what matters most—caring for those in need.

This is the heart of the Gospel in action. Paul reminds us that bearing one another's burdens is not merely a kind suggestion; it is the very fulfillment of Christ's law of love. The Greek word for "burden" here—baros—refers to a crushing weight, something too heavy to carry alone. We were never designed for isolated suffering.

When we step into someone's pain, when we offer our hands, our resources, our presence, we embody the compassion Jesus showed throughout His ministry. He didn't heal from a distance or send instructions. He touched lepers, dined with outcasts, wept at tombs. His love was incarnational—present, physical, real.

Isaiah paints a stunning picture: when we pour ourselves out for the hungry and afflicted, our light rises in the darkness. Notice the promise isn't that we'll have light—it's that we'll become light. Our acts of mercy don't just help others; they transform us and illuminate the world around us.

The prophet's words contain a subtle but powerful truth: we cannot give what we don't have, yet in the giving, we receive. This is the divine economy of grace—a paradox where pouring out fills us up, where losing our lives for others' sake is how we truly find them.

Today, whether you're able to volunteer, donate, or simply pray, remember that every act of compassion ripples outward. You may be the answer to someone's desperate prayer. Your small act of kindness might be the moment someone glimpses God's love made tangible. Let your light shine—not for your own glory, but as a beacon pointing to the One who is Light itself.`,
  },
  {
    id: '2026-02-02',
    date: '2026-02-02',
    headline: 'Global leaders reach historic agreement on debt relief for developing nations, offering hope to millions struggling under economic hardship.',
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com/world/',
    articleTitle: 'Global Debt Relief Agreement',
    verses: [
      {
        reference: 'Deuteronomy 15:1-2',
        text: {
          'niv': 'At the end of every seven years you must cancel debts. This is how it is to be done: Every creditor shall cancel any loan they have made to a fellow Israelite.',
          'esv': 'At the end of every seven years you shall grant a release. And this is the manner of the release: every creditor shall release what he has lent to his neighbor.',
          'csb': 'At the end of every seven years you must cancel debts. This is how to cancel debt: Every creditor is to cancel what he has lent his neighbor.',
          'nlt': 'At the end of every seventh year you must cancel the debts of everyone who owes you money. This is how it must be done.',
          'kjv': 'At the end of every seven years thou shalt make a release. And this is the manner of the release: Every creditor that lendeth ought unto his neighbour shall release it.',
          'nkjv': 'At the end of every seven years you shall grant a release of debts. And this is the form of the release: Every creditor who has lent anything to his neighbor shall release it.',
          'nabre': 'At the end of every seven-year period you shall have a relaxation of debts, which shall be observed as follows.',
          'rsv-ce': 'At the end of every seven years you shall grant a release. And this is the manner of the release: every creditor shall release what he has lent to his neighbor.',
        },
      },
      {
        reference: 'Proverbs 19:17',
        text: {
          'niv': 'Whoever is kind to the poor lends to the LORD, and he will reward them for what they have done.',
          'esv': 'Whoever is generous to the poor lends to the LORD, and he will repay him for his deed.',
          'csb': 'Kindness to the poor is a loan to the LORD, and he will give a reward to the lender.',
          'nlt': 'If you help the poor, you are lending to the LORD—and he will repay you!',
          'kjv': 'He that hath pity upon the poor lendeth unto the LORD; and that which he hath given will he pay him again.',
          'nkjv': 'He who has pity on the poor lends to the LORD, and He will pay back what he has given.',
          'nabre': 'Whoever is kind to the poor lends to the LORD, who will pay back the sum in full.',
          'rsv-ce': 'He who is kind to the poor lends to the LORD, and he will repay him for his deed.',
        },
      },
    ],
    reflection: `The concept of debt relief might seem like modern economics, but it's actually deeply rooted in Scripture. God established the Year of Jubilee and the seven-year debt release not as mere financial policy, but as a radical statement about human dignity and divine generosity.

The Lord understands that crushing debt doesn't just strain bank accounts—it crushes spirits, divides families, and steals hope. When economic systems trap people in cycles of poverty, the vulnerable suffer most. Children go hungry. Dreams die. Communities crumble.

This is why Scripture consistently calls God's people to a different standard. We are to be generous because we serve a generous God. We are to release others from bondage because Christ released us from the ultimate debt we could never repay.

Proverbs offers a remarkable perspective: kindness to the poor is actually a loan to God Himself. When we advocate for justice, when we support policies that lift the oppressed, when we personally extend grace to those who owe us, we're participating in God's redemptive work.

Today, consider: where might you extend relief to someone burdened? It may not be financial—perhaps it's forgiving a wrong, releasing an expectation, or simply offering hope to someone in despair.`,
  },
  {
    id: '2026-02-01',
    date: '2026-02-01',
    headline: 'Young entrepreneur from rural community launches initiative providing free coding classes to underserved students, now reaching thousands across multiple states.',
    source: 'NPR',
    sourceUrl: 'https://www.npr.org/sections/education/',
    articleTitle: 'Coding Initiative for Underserved Students',
    verses: [
      {
        reference: 'Proverbs 22:6',
        text: {
          'niv': 'Start children off on the way they should go, and even when they are old they will not turn from it.',
          'esv': 'Train up a child in the way he should go; even when he is old he will not depart from it.',
          'csb': 'Start a youth out on his way; even when he grows old he will not depart from it.',
          'nlt': 'Direct your children onto the right path, and when they are older, they will not leave it.',
          'kjv': 'Train up a child in the way he should go: and when he is old, he will not depart from it.',
          'nkjv': 'Train up a child in the way he should go, and when he is old he will not depart from it.',
          'nabre': 'Train the young in the way they should go; even when old, they will not swerve from it.',
          'rsv-ce': 'Train up a child in the way he should go, and when he is old he will not depart from it.',
        },
      },
      {
        reference: 'Matthew 19:14',
        text: {
          'niv': 'Jesus said, "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these."',
          'esv': 'But Jesus said, "Let the little children come to me and do not hinder them, for to such belongs the kingdom of heaven."',
          'csb': 'Jesus said, "Leave the little children alone, and don\'t try to keep them from coming to me, because the kingdom of heaven belongs to such as these."',
          'nlt': 'But Jesus said, "Let the children come to me. Don\'t stop them! For the Kingdom of Heaven belongs to those who are like these children."',
          'kjv': 'But Jesus said, Suffer little children, and forbid them not, to come unto me: for of such is the kingdom of heaven.',
          'nkjv': 'But Jesus said, "Let the little children come to Me, and do not forbid them; for of such is the kingdom of heaven."',
          'nabre': 'Jesus said, "Let the children come to me, and do not prevent them; for the kingdom of heaven belongs to such as these."',
          'rsv-ce': 'But Jesus said, "Let the children come to me, and do not hinder them; for to such belongs the kingdom of heaven."',
        },
      },
    ],
    reflection: `Every generation holds the power to shape the next. When someone invests in young people—especially those who might otherwise be overlooked—they plant seeds that will bear fruit for decades to come.

Solomon's wisdom about training children isn't just about discipline; it's about direction. It's about showing young people a path, giving them tools, and believing in their potential before they can see it themselves. The entrepreneur in today's story understood something profound: opportunity shouldn't depend on zip code.

Jesus' words cut through the disciples' gatekeeping with divine clarity. Children matter. Their access to Jesus—and by extension, to opportunity, education, dignity, and hope—should never be hindered by adult systems that weren't designed with them in mind.

What barriers exist in your community that keep young people from flourishing? What unique gift, skill, or resource do you have that could open a door for someone just starting their journey?

Today, consider one young person in your life. How might you invest in their future?`,
    premiumReflection: `Every generation holds the power to shape the next. When someone invests in young people—especially those who might otherwise be overlooked—they plant seeds that will bear fruit for decades to come.

Solomon's wisdom about training children isn't just about discipline; it's about direction. The Hebrew word "chanakh" (train) carries the sense of dedicating or inaugurating—like dedicating a temple. We are called to treat the formation of young minds with sacred seriousness, recognizing that we're not just teaching skills but shaping souls.

Jesus' words cut through the disciples' gatekeeping with divine clarity. Children matter. Their access to Jesus—and by extension, to opportunity, education, dignity, and hope—should never be hindered by adult systems that weren't designed with them in mind. The kingdom belongs to those with childlike faith, wonder, and openness to possibility.

In our modern context, digital literacy has become as foundational as reading and writing. When young people in underserved communities lack access to technology education, we're not just limiting their career options—we're limiting their ability to participate fully in society's future.

The young entrepreneur in today's story understood something the disciples missed: you don't wait for people to prove they deserve access. You create access and watch what happens when potential meets opportunity.

What barriers exist in your community that keep young people from flourishing? What unique gift, skill, or resource do you have that could open a door for someone just starting their journey? Remember: Moses was raised in privilege but called to liberate the oppressed. Ruth was a foreigner who became an ancestor of Christ. God delights in unexpected partnerships that cross boundaries.

Today, consider one young person in your life. How might you invest in their future? Your mentorship might be the turning point they'll reference in their own success story someday.`,
  },
  {
    id: '2026-01-31',
    date: '2026-01-31',
    headline: 'After decades apart, siblings separated during childhood refugee crisis are reunited through DNA matching technology and volunteer efforts.',
    source: 'BBC',
    sourceUrl: 'https://www.bbc.com/news/world',
    articleTitle: 'Refugee Siblings Reunited',
    verses: [
      {
        reference: 'Psalm 68:6',
        text: {
          'niv': 'God sets the lonely in families, he leads out the prisoners with singing; but the rebellious live in a sun-scorched land.',
          'esv': 'God settles the solitary in a home; he leads out the prisoners to prosperity, but the rebellious dwell in a parched land.',
          'csb': 'God provides homes for those who are deserted. He leads out the prisoners to prosperity, but the rebellious live in a scorched land.',
          'nlt': 'God places the lonely in families; he sets the prisoners free and gives them joy. But he makes the rebellious live in a sun-scorched land.',
          'kjv': 'God setteth the solitary in families: he bringeth out those which are bound with chains: but the rebellious dwell in a dry land.',
          'nkjv': 'God sets the solitary in families; He brings out those who are bound into prosperity; but the rebellious dwell in a dry land.',
          'nabre': 'God gives the desolate a home to dwell in, leads prisoners out to prosperity; but rebels must dwell in a parched land.',
          'rsv-ce': 'God gives the desolate a home to dwell in; he leads out the prisoners to prosperity; but the rebellious dwell in a parched land.',
        },
      },
      {
        reference: 'Genesis 45:4-5',
        text: {
          'niv': 'Then Joseph said to his brothers, "Come close to me." When they had done so, he said, "I am your brother Joseph, the one you sold into Egypt! And now, do not be distressed and do not be angry with yourselves for selling me here, because it was to save lives that God sent me ahead of you."',
          'esv': 'So Joseph said to his brothers, "Come near to me, please." And they came near. And he said, "I am your brother, Joseph, whom you sold into Egypt. And now do not be distressed or angry with yourselves because you sold me here, for God sent me before you to preserve life."',
          'csb': 'Then Joseph said to his brothers, "Please, come near me," and they came near. "I am Joseph, your brother," he said, "the one you sold into Egypt. And now don\'t be grieved or angry with yourselves for selling me here, because God sent me ahead of you to preserve life."',
          'nlt': '"Please, come closer," he said to them. So they came closer. And he said again, "I am Joseph, your brother, whom you sold into slavery in Egypt. But don\'t be upset, and don\'t be angry with yourselves for selling me to this place. It was God who sent me here ahead of you to preserve your lives."',
          'kjv': 'And Joseph said unto his brethren, Come near to me, I pray you. And they came near. And he said, I am Joseph your brother, whom ye sold into Egypt. Now therefore be not grieved, nor angry with yourselves, that ye sold me hither: for God did send me before you to preserve life.',
          'nkjv': 'And Joseph said to his brothers, "Please come near to me." So they came near. Then he said: "I am Joseph your brother, whom you sold into Egypt. But now, do not therefore be grieved or angry with yourselves because you sold me here; for God sent me before you to preserve life."',
          'nabre': '"Come closer to me," Joseph told his brothers. When they had done so, he said: "I am your brother Joseph, whom you sold into Egypt. But now do not be distressed, and do not be angry with yourselves for having sold me here. It was really for the sake of saving lives that God sent me here ahead of you."',
          'rsv-ce': 'So Joseph said to his brothers, "Come near to me, I pray you." And they came near. And he said, "I am your brother, Joseph, whom you sold into Egypt. And now do not be distressed, or angry with yourselves, because you sold me here; for God sent me before you to preserve life."',
        },
      },
    ],
    reflection: `Separation is one of humanity's deepest wounds. Families torn apart by war, poverty, persecution—these are not abstract statistics but sacred bonds violently severed. When reunion finally comes, even after decades, we glimpse something of heaven breaking through.

The Psalmist declares that God "sets the lonely in families." This isn't just about biological connection; it's about God's fundamental design for human flourishing. We were made for belonging, for knowing and being known, for having people who share our story.

Joseph's reunion with his brothers after years of separation and suffering reveals the mysterious ways God weaves even tragedy into redemption. "God sent me here to preserve life." The tears Joseph shed weren't just of joy but of decades of pain transformed by purpose.

Today, pray for the millions still separated from loved ones by borders, conflicts, and bureaucracies. And examine your own life: who might be lonely and in need of family? The stranger, the refugee, the forgotten elder—they may be your opportunity to participate in God's work of setting the lonely in families.`,
    premiumReflection: `Separation is one of humanity's deepest wounds. Families torn apart by war, poverty, persecution—these are not abstract statistics but sacred bonds violently severed. When reunion finally comes, even after decades, we glimpse something of heaven breaking through.

The Psalmist declares that God "sets the lonely in families." This isn't just about biological connection; it's about God's fundamental design for human flourishing. We were made for belonging, for knowing and being known, for having people who share our story. The Hebrew word "yachid" (solitary/lonely) describes complete isolation—the opposite of the trinitarian community that is God's own nature.

Joseph's reunion with his brothers after years of separation and suffering reveals the mysterious ways God weaves even tragedy into redemption. Notice the grace: instead of condemnation for their betrayal, Joseph offers theological interpretation. "God sent me here to preserve life." The tears Joseph shed weren't just of joy but of decades of pain transformed by purpose.

Modern technology that reunites lost family members participates in this divine work of restoration. Every volunteer who helps, every database that connects, every test that confirms kinship—these are tools of grace, bringing together what should never have been torn apart.

Yet we must also acknowledge the ongoing wound. For every joyful reunion, countless others remain separated. The refugee child who grew up never knowing their parents. The families still divided by walls, policies, and oceans. Their grief is real, their longing valid, their hope often fragile.

Today, pray for the millions still separated from loved ones by borders, conflicts, and bureaucracies. Support organizations doing this sacred work of reconnection. And examine your own life: who might be lonely and in need of family? The stranger, the refugee, the forgotten elder—they may be your opportunity to participate in God's work of setting the lonely in families.`,
  },
  {
    id: '2026-01-30',
    date: '2026-01-30',
    headline: 'Local church opens its doors 24/7 as warming center during brutal winter storm, providing meals and shelter to hundreds of homeless individuals.',
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com/hub/religion',
    articleTitle: 'Church Warming Center',
    verses: [
      {
        reference: 'Matthew 25:35-36',
        text: {
          'niv': 'For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in, I needed clothes and you clothed me, I was sick and you looked after me, I was in prison and you came to visit me.',
          'esv': 'For I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you welcomed me, I was naked and you clothed me, I was sick and you visited me, I was in prison and you came to me.',
          'csb': 'For I was hungry and you gave me something to eat; I was thirsty and you gave me something to drink; I was a stranger and you took me in; I was naked and you clothed me; I was sick and you took care of me; I was in prison and you visited me.',
          'nlt': 'For I was hungry, and you fed me. I was thirsty, and you gave me a drink. I was a stranger, and you invited me into your home. I was naked, and you gave me clothing. I was sick, and you cared for me. I was in prison, and you visited me.',
          'kjv': 'For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me.',
          'nkjv': 'For I was hungry and you gave Me food; I was thirsty and you gave Me drink; I was a stranger and you took Me in; I was naked and you clothed Me; I was sick and you visited Me; I was in prison and you came to Me.',
          'nabre': 'For I was hungry and you gave me food, I was thirsty and you gave me drink, a stranger and you welcomed me, naked and you clothed me, ill and you cared for me, in prison and you visited me.',
          'rsv-ce': 'For I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you welcomed me, I was naked and you clothed me, I was sick and you visited me, I was in prison and you came to me.',
        },
      },
      {
        reference: 'Hebrews 13:2',
        text: {
          'niv': 'Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it.',
          'esv': 'Do not neglect to show hospitality to strangers, for thereby some have entertained angels unawares.',
          'csb': 'Don\'t neglect to show hospitality, for by doing this some have welcomed angels as guests without knowing it.',
          'nlt': 'Don\'t forget to show hospitality to strangers, for some who have done this have entertained angels without realizing it!',
          'kjv': 'Be not forgetful to entertain strangers: for thereby some have entertained angels unawares.',
          'nkjv': 'Do not forget to entertain strangers, for by so doing some have unwittingly entertained angels.',
          'nabre': 'Do not neglect hospitality, for through it some have unknowingly entertained angels.',
          'rsv-ce': 'Do not neglect to show hospitality to strangers, for thereby some have entertained angels unawares.',
        },
      },
    ],
    reflection: `When temperatures drop to deadly levels, a church becomes what it was always meant to be: sanctuary. Not just a place for Sunday services, but a literal refuge where the most vulnerable find warmth, food, and dignity.

Jesus' words in Matthew 25 are startling in their directness. He doesn't say caring for the hungry and homeless is *like* serving Him. He says it *is* serving Him. "I was a stranger and you invited me in." Christ identifies so completely with the suffering that to welcome them is to welcome Him.

Hebrews adds another layer of mystery: some strangers are angels. We never know who we're really serving when we open our doors to those in need. The disheveled person seeking shelter from the cold might carry a message, a blessing, a divine encounter we'd miss if we looked away.

This is the church at its best—not a building that sits empty six days a week, but a living community that responds to real needs in real time. Lights on. Doors open. Meals served. Presence offered.

What doors are you being called to open today?`,
  },
  {
    id: '2026-01-29',
    date: '2026-01-29',
    headline: 'Retired teacher, 82, finally receives high school diploma after family circumstances forced her to drop out 65 years ago to care for siblings.',
    source: 'NPR',
    sourceUrl: 'https://www.npr.org/sections/education/',
    articleTitle: 'Retired Teacher Receives Diploma',
    verses: [
      {
        reference: 'Ecclesiastes 3:1,11',
        text: {
          'niv': 'There is a time for everything, and a season for every activity under the heavens... He has made everything beautiful in its time.',
          'esv': 'For everything there is a season, and a time for every matter under heaven... He has made everything beautiful in its time.',
          'csb': 'There is an occasion for everything, and a time for every activity under heaven... He has made everything appropriate in its time.',
          'nlt': 'For everything there is a season, a time for every activity under heaven... Yet God has made everything beautiful for its own time.',
          'kjv': 'To every thing there is a season, and a time to every purpose under the heaven... He hath made every thing beautiful in his time.',
          'nkjv': 'To everything there is a season, a time for every purpose under heaven... He has made everything beautiful in its time.',
          'nabre': 'There is an appointed time for everything, and a time for every affair under the heavens... He has made everything appropriate to its time.',
          'rsv-ce': 'For everything there is a season, and a time for every matter under heaven... He has made everything beautiful in its time.',
        },
      },
      {
        reference: 'Isaiah 46:4',
        text: {
          'niv': 'Even to your old age and gray hairs I am he, I am he who will sustain you. I have made you and I will carry you; I will sustain you and I will rescue you.',
          'esv': 'Even to your old age I am he, and to gray hairs I will carry you. I have made, and I will bear; I will carry and will save.',
          'csb': 'I will be the same until your old age, and I will bear you up when you turn gray. I have made you, and I will carry you; I will bear and rescue you.',
          'nlt': 'I will be your God throughout your lifetime—until your hair is white with age. I made you, and I will care for you. I will carry you along and save you.',
          'kjv': 'And even to your old age I am he; and even to hoar hairs will I carry you: I have made, and I will bear; even I will carry, and will deliver you.',
          'nkjv': 'Even to your old age, I am He, and even to gray hairs I will carry you! I have made, and I will bear; even I will carry, and will deliver you.',
          'nabre': 'Even to your old age I am he, even when your hair is gray I will carry you; I have done this, and I will lift you up, I will carry you to safety.',
          'rsv-ce': 'Even to your old age I am He, and to gray hairs I will carry you. I have made, and I will bear; I will carry and will save.',
        },
      },
    ],
    reflection: `Some dreams take sixty-five years to fulfill. For the young girl who sacrificed her education to care for her siblings, the diploma seemed lost forever. Yet God's timing extends far beyond our calendars.

Ecclesiastes reminds us that God "makes everything beautiful in its time." Not necessarily in our preferred time, but in *its* time—the moment when the beauty can be fully appreciated, when the story has reached the chapter where this resolution makes sense.

This woman went on to become a teacher anyway, spending her career educating others despite never receiving her own diploma. Her sacrifice wasn't wasted; it was multiplied. And now, at 82, the recognition finally comes—not as a correction of injustice, but as a celebration of a life well-lived.

Isaiah's promise spans all our years: "Even to your old age and gray hairs I am he." God doesn't abandon us when we've passed our prime productivity. He carries us, sustains us, rescues us—right up to our final breath.

What dreams have you set aside? What recognition do you long for? Trust that nothing is wasted in God's economy. The story isn't over yet.`,
  },
  {
    id: '2026-01-28',
    date: '2026-01-28',
    headline: 'Thousands of farmers in the Midwest adopt regenerative agriculture practices, restoring soil health and revitalizing rural economies.',
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com/hub/agriculture',
    articleTitle: 'Regenerative Agriculture Movement',
    verses: [
      {
        reference: 'Genesis 2:15',
        text: {
          'niv': 'The LORD God took the man and put him in the Garden of Eden to work it and take care of it.',
          'esv': 'The LORD God took the man and put him in the garden of Eden to work it and keep it.',
          'csb': 'The LORD God took the man and placed him in the garden of Eden to work it and watch over it.',
          'nlt': 'The LORD God placed the man in the Garden of Eden to tend and watch over it.',
          'kjv': 'And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.',
          'nkjv': 'Then the LORD God took the man and put him in the garden of Eden to tend and keep it.',
          'nabre': 'The LORD God then took the man and settled him in the garden of Eden, to cultivate and care for it.',
          'rsv-ce': 'The LORD God took the man and put him in the garden of Eden to till it and keep it.',
        },
      },
      {
        reference: 'Hosea 10:12',
        text: {
          'niv': 'Sow righteousness for yourselves, reap the fruit of unfailing love, and break up your unplowed ground; for it is time to seek the LORD, until he comes and showers his righteousness on you.',
          'esv': 'Sow for yourselves righteousness; reap steadfast love; break up your fallow ground, for it is the time to seek the LORD, that he may come and rain righteousness upon you.',
          'csb': 'Sow righteousness for yourselves and reap faithful love; break up your unplowed ground. It is time to seek the LORD until he comes and sends righteousness on you like the rain.',
          'nlt': 'I said, \'Plant the good seeds of righteousness, and you will harvest a crop of love. Plow up the hard ground of your hearts, for now is the time to seek the LORD, that he may come and shower righteousness upon you.\'',
          'kjv': 'Sow to yourselves in righteousness, reap in mercy; break up your fallow ground: for it is time to seek the LORD, till he come and rain righteousness upon you.',
          'nkjv': 'Sow for yourselves righteousness; reap in mercy; break up your fallow ground, for it is time to seek the LORD, till He comes and rains righteousness on you.',
          'nabre': 'Sow for yourselves justice, reap the fruit of loyalty; break up for yourselves a new field, for it is time to seek the LORD, till he come and rain justice upon you.',
          'rsv-ce': 'Sow for yourselves righteousness, reap the fruit of steadfast love; break up your fallow ground, for it is the time to seek the LORD, that he may come and rain salvation upon you.',
        },
      },
    ],
    reflection: `From the very first chapter of the human story, God entrusted us with a garden. Not to exploit, but to tend. Not to deplete, but to keep. The Hebrew words \"abad\" and \"shamar\" — to serve and to guard — frame our relationship with creation as one of stewardship, not ownership.

When farmers choose regenerative practices over short-term profit, they echo this original calling. They're saying: this soil is not just a resource to be mined, but a living system to be nurtured. The results speak for themselves — healthier land, cleaner water, stronger communities.

Hosea's agricultural metaphor cuts deep. \"Break up your unplowed ground\" — this isn't just about farming technique. It's about the hard, compacted places in our hearts that resist new growth. Sometimes restoration requires going backward before going forward, tearing up what seemed settled to make room for something living.

What ground in your life needs breaking up? What depleted soil needs patient, faithful tending rather than another quick fix?`,
    premiumReflection: `From the very first chapter of the human story, God entrusted us with a garden. Not to exploit, but to tend. Not to deplete, but to keep. The Hebrew words \"abad\" and \"shamar\" — to serve and to guard — frame our relationship with creation as one of stewardship, not ownership.

When farmers choose regenerative practices over short-term profit, they echo this original calling. They're saying: this soil is not just a resource to be mined, but a living system to be nurtured. The results speak for themselves — healthier land, cleaner water, stronger communities.

Hosea's agricultural metaphor cuts deep. \"Break up your unplowed ground\" — this isn't just about farming technique. It's about the hard, compacted places in our hearts that resist new growth. Sometimes restoration requires going backward before going forward, tearing up what seemed settled to make room for something living.

The regenerative agriculture movement mirrors a spiritual truth the church has always known: the way of death is extraction, and the way of life is restoration. Industrial farming treats soil as an input; regenerative farming treats it as a community of living organisms. Similarly, God doesn't strip-mine our souls for productivity — He cultivates us with patience, seasons, and rest.

Consider the Sabbath principle built into Israel's agricultural law: every seventh year, the land was to rest. God designed rhythms of productivity and restoration into the very fabric of creation. When we ignore these rhythms — in our land, our work, our relationships — things break down.

What ground in your life needs breaking up? What depleted soil needs patient, faithful tending rather than another quick fix? Perhaps the most regenerative thing you can do today is simply rest — and trust that God is working even in the fallow seasons.`,
  },
  {
    id: '2026-01-27',
    date: '2026-01-27',
    headline: 'Veterans mental health crisis prompts new bipartisan legislation expanding access to counseling and community support programs nationwide.',
    source: 'NPR',
    sourceUrl: 'https://www.npr.org/sections/health/',
    articleTitle: 'Veterans Mental Health Legislation',
    verses: [
      {
        reference: 'Psalm 34:17-18',
        text: {
          'niv': 'The righteous cry out, and the LORD hears them; he delivers them from all their troubles. The LORD is close to the brokenhearted and saves those who are crushed in spirit.',
          'esv': 'When the righteous cry for help, the LORD hears and delivers them out of all their troubles. The LORD is near to the brokenhearted and saves the crushed in spirit.',
          'csb': 'The righteous cry out, and the LORD hears, and rescues them from all their troubles. The LORD is near the brokenhearted; he saves those crushed in spirit.',
          'nlt': 'The LORD hears his people when they call to him for help. He rescues them from all their troubles. The LORD is close to the brokenhearted; he rescues those whose spirits are crushed.',
          'kjv': 'The righteous cry, and the LORD heareth, and delivereth them out of all their troubles. The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
          'nkjv': 'The righteous cry out, and the LORD hears, and delivers them out of all their troubles. The LORD is near to those who have a broken heart, and saves such as have a contrite spirit.',
          'nabre': 'The righteous cry out, the LORD hears and he rescues them from all their afflictions. The LORD is close to the brokenhearted, saves those whose spirit is crushed.',
          'rsv-ce': 'When the righteous cry for help, the LORD hears, and delivers them out of all their troubles. The LORD is near to the brokenhearted, and saves the crushed in spirit.',
        },
      },
      {
        reference: 'Isaiah 61:1-2',
        text: {
          'niv': 'The Spirit of the Sovereign LORD is on me, because the LORD has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners, to proclaim the year of the LORD\'s favor.',
          'esv': 'The Spirit of the Lord GOD is upon me, because the LORD has anointed me to bring good news to the poor; he has sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to those who are bound; to proclaim the year of the LORD\'s favor.',
          'csb': 'The Spirit of the Lord GOD is on me, because the LORD has anointed me to bring good news to the poor. He has sent me to heal the brokenhearted, to proclaim liberty to the captives and freedom to the prisoners; to proclaim the year of the LORD\'s favor.',
          'nlt': 'The Spirit of the Sovereign LORD is upon me, for the LORD has anointed me to bring good news to the poor. He has sent me to comfort the brokenhearted and to proclaim that captives will be released and prisoners will be freed. He has sent me to tell those who mourn that the time of the LORD\'s favor has come.',
          'kjv': 'The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound; To proclaim the acceptable year of the LORD.',
          'nkjv': 'The Spirit of the Lord GOD is upon Me, because the LORD has anointed Me to preach good tidings to the poor; He has sent Me to heal the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to those who are bound; to proclaim the acceptable year of the LORD.',
          'nabre': 'The spirit of the Lord GOD is upon me, because the LORD has anointed me; he has sent me to bring good news to the afflicted, to bind up the brokenhearted, to proclaim liberty to the captives, release to the prisoners, to announce a year of favor from the LORD.',
          'rsv-ce': 'The Spirit of the Lord GOD is upon me, because the LORD has anointed me to bring good tidings to the afflicted; he has sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to those who are bound; to proclaim the year of the LORD\'s favor.',
        },
      },
    ],
    reflection: `Those who have served in the military carry burdens most of us will never fully understand. The weight of what they've witnessed, the trauma of combat, the difficulty of reintegrating into civilian life — these are not signs of weakness but scars of sacrifice.

David, the warrior-king who wrote many of the Psalms, understood this intimately. His cry in Psalm 34 comes from someone who knew both the battlefield and the darkest nights of the soul. And his testimony is clear: God doesn't stand at a distance from our pain. He draws near.

Isaiah's prophetic vision — the same passage Jesus read aloud in the synagogue at Nazareth to announce His ministry — puts the brokenhearted at the center of God's concern. Binding up wounds, proclaiming freedom to captives, releasing those in darkness. This is the mission of God.

When a nation creates systems to care for its most wounded, it participates in that mission. Counseling, community, connection — these aren't luxuries for veterans. They're lifelines.

Pray today for those who served and came home carrying invisible wounds. And ask yourself: how can I be part of the binding up?`,
    premiumReflection: `Those who have served in the military carry burdens most of us will never fully understand. The weight of what they've witnessed, the trauma of combat, the moral injuries that fester long after the physical wounds heal, the difficulty of reintegrating into civilian life — these are not signs of weakness but scars of sacrifice.

David, the warrior-king who wrote many of the Psalms, understood this intimately. Before he was king, he was a soldier. Before he was a poet, he was a man who killed and nearly was killed. His cry in Psalm 34 comes from someone who knew both the battlefield and the darkest nights of the soul. And his testimony is clear: God doesn't stand at a distance from our pain. He draws near. The Hebrew \"qarov\" (near) implies physical closeness — God presses in when we are crushed.

Isaiah's prophetic vision — the same passage Jesus read aloud in the synagogue at Nazareth to announce His ministry — puts the brokenhearted at the center of God's concern. The phrase \"bind up\" uses medical imagery: God as physician, wrapping wounds with careful, tender hands. This isn't a quick fix. It's sustained, attentive care.

When a nation creates systems to care for its most wounded, it participates in that mission. Counseling, community, connection — these aren't luxuries for veterans. They're lifelines. The church has a particular calling here: to be a community where no one suffers alone, where asking for help is honored as courage, not treated as failure.

The early church was known for caring for soldiers and their families. We carry that legacy. Pray today for those who served and came home carrying invisible wounds. And ask yourself: how can I be part of the binding up?`,
  },
  {
    id: '2026-01-26',
    date: '2026-01-26',
    headline: 'International space agency confirms discovery of water ice deposits on the Moon, opening new possibilities for future human exploration.',
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com/science/',
    articleTitle: 'Lunar Water Ice Discovery',
    verses: [
      {
        reference: 'Psalm 19:1-2',
        text: {
          'niv': 'The heavens declare the glory of God; the skies proclaim the work of his hands. Day after day they pour forth speech; night after night they reveal knowledge.',
          'esv': 'The heavens declare the glory of God, and the sky above proclaims his handiwork. Day to day pours out speech, and night to night reveals knowledge.',
          'csb': 'The heavens declare the glory of God, and the expanse proclaims the work of his hands. Day after day they pour out speech; night after night they communicate knowledge.',
          'nlt': 'The heavens proclaim the glory of God. The skies display his craftsmanship. Day after day they continue to speak; night after night they make him known.',
          'kjv': 'The heavens declare the glory of God; and the firmament sheweth his handywork. Day unto day uttereth speech, and night unto night sheweth knowledge.',
          'nkjv': 'The heavens declare the glory of God; and the firmament shows His handiwork. Day unto day utters speech, and night unto night reveals knowledge.',
          'nabre': 'The heavens declare the glory of God; the firmament proclaims the works of his hands. Day unto day pours forth speech; night unto night whispers knowledge.',
          'rsv-ce': 'The heavens are telling the glory of God; and the firmament proclaims his handiwork. Day to day pours forth speech, and night to night declares knowledge.',
        },
      },
      {
        reference: 'Job 38:4-7',
        text: {
          'niv': '"Where were you when I laid the earth\'s foundation? Tell me, if you understand. Who marked off its dimensions? Surely you know! Who stretched a measuring line across it? On what were its footings set, or who laid its cornerstone — while the morning stars sang together and all the angels shouted for joy?"',
          'esv': '"Where were you when I laid the foundation of the earth? Tell me, if you have understanding. Who determined its measurements — surely you know! Or who stretched the line upon it? On what were its bases sunk, or who laid its cornerstone, when the morning stars sang together and all the sons of God shouted for joy?"',
          'csb': '"Where were you when I established the earth? Tell me, if you have understanding. Who fixed its dimensions? Certainly you know! Who stretched a measuring line across it? What supports its foundations? Or who laid its cornerstone while the morning stars sang together and all the sons of God shouted for joy?"',
          'nlt': '"Where were you when I laid the foundations of the earth? Tell me, if you know so much. Who determined its dimensions and stretched out the surveying line? What supports its foundations, and who laid its cornerstone as the morning stars sang together and all the angels shouted for joy?"',
          'kjv': '"Where wast thou when I laid the foundations of the earth? declare, if thou hast understanding. Who hath laid the measures thereof, if thou knowest? or who hath stretched the line upon it? Whereupon are the foundations thereof fastened? or who laid the corner stone thereof; When the morning stars sang together, and all the sons of God shouted for joy?"',
          'nkjv': '"Where were you when I laid the foundations of the earth? Tell Me, if you have understanding. Who determined its measurements? Surely you know! Or who stretched the line upon it? To what were its foundations fastened? Or who laid its cornerstone, when the morning stars sang together, and all the sons of God shouted for joy?"',
          'nabre': '"Where were you when I founded the earth? Tell me, if you have understanding. Who determined its size? Surely you know? Who stretched out the measuring line for it? Into what were its pedestals sunk, and who laid its cornerstone, while the morning stars sang together and all the sons of God shouted for joy?"',
          'rsv-ce': '"Where were you when I laid the foundation of the earth? Tell me, if you have understanding. Who determined its measurements — surely you know! Or who stretched the line upon it? On what were its bases sunk, or who laid its cornerstone, when the morning stars sang together, and all the sons of God shouted for joy?"',
        },
      },
    ],
    reflection: `Water on the Moon. Let that sink in for a moment. The same substance that Jesus walked upon, that flowed from the rock at Moses' command, that covered the earth in Noah's day — it sits frozen in craters 240,000 miles away.

The Psalmist looked up at the same Moon thousands of years ago and saw what we sometimes miss in our age of scientific achievement: the heavens are speaking. Every discovery, every data point, every frozen molecule of H₂O on a lunar surface is another syllable in creation's ongoing declaration of God's glory.

Job's encounter with God's voice from the whirlwind is perhaps the Bible's most magnificent celebration of cosmic wonder. God doesn't answer Job's questions about suffering with theology — He answers with astronomy, biology, meteorology. He points to the staggering scale and intricate beauty of creation and essentially says: I've got this.

Science and faith are not competitors. Every telescope is, in a sense, a prayer — an act of reaching toward the unknown with curiosity and wonder. When we discover water on the Moon, we discover another brushstroke from the Artist who flung stars across the void.

Look up tonight. What is creation declaring to you?`,
    premiumReflection: `Water on the Moon. Let that sink in for a moment. The same substance that Jesus walked upon, that flowed from the rock at Moses' command, that covered the earth in Noah's day — it sits frozen in craters 240,000 miles away.

The Psalmist looked up at the same Moon thousands of years ago and saw what we sometimes miss in our age of scientific achievement: the heavens are speaking. The Hebrew verb \"mesapperim\" (declare) is in the intensive form — the heavens aren't whispering; they're proclaiming, broadcasting, insisting. Every discovery is another volume in creation's library of divine revelation.

Job's encounter with God's voice from the whirlwind is perhaps the Bible's most magnificent celebration of cosmic wonder. God doesn't answer Job's questions about suffering with theology — He answers with astronomy, biology, meteorology. He points to the staggering scale and intricate beauty of creation and essentially says: I've got this. The God who laid the earth's foundations and made the morning stars sing is not stumped by your midnight questions.

Notice God's question: \"Where were you?\" This isn't meant to belittle — it's meant to liberate. You don't have to hold the universe together. You don't have to understand everything. You are held by the One who does.

Science and faith are not competitors. Every telescope is, in a sense, a prayer — an act of reaching toward the unknown with curiosity and wonder. The medieval monks who preserved ancient astronomical texts understood this. The priest who first proposed the Big Bang theory understood this. Discovery deepens worship.

When we find water on the Moon, we find another reason to marvel at a Creator who seems to have hidden surprises everywhere — as if the universe itself is a gift waiting to be unwrapped. Look up tonight. What is creation declaring to you?`,
  },
  {
    id: '2026-01-25',
    date: '2026-01-25',
    headline: 'Record-breaking literacy program in sub-Saharan Africa teaches over 2 million adults to read in just three years through innovative mobile learning.',
    source: 'BBC',
    sourceUrl: 'https://www.bbc.com/news/education',
    articleTitle: 'African Literacy Breakthrough',
    verses: [
      {
        reference: 'Proverbs 4:7',
        text: {
          'niv': 'The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding.',
          'esv': 'The beginning of wisdom is this: Get wisdom, and whatever you get, get insight.',
          'csb': 'Wisdom is supreme — so get wisdom. And whatever else you get, get understanding.',
          'nlt': 'Getting wisdom is the wisest thing you can do! And whatever else you do, develop good judgment.',
          'kjv': 'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.',
          'nkjv': 'Wisdom is the principal thing; therefore get wisdom. And in all your getting, get understanding.',
          'nabre': 'The beginning of wisdom is: get wisdom; whatever else you get, get understanding.',
          'rsv-ce': 'The beginning of wisdom is this: Get wisdom, and whatever you get, get insight.',
        },
      },
      {
        reference: 'Nehemiah 8:8',
        text: {
          'niv': 'They read from the Book of the Law of God, making it clear and giving the meaning so that the people understood what was being read.',
          'esv': 'They read from the book, from the Law of God, clearly, and they gave the sense, so that the people understood the reading.',
          'csb': 'They read out of the book of the law of God, translating and giving the meaning so that the people could understand what was read.',
          'nlt': 'They read from the Book of the Law of God and clearly explained the meaning of what was being read, helping the people understand each passage.',
          'kjv': 'So they read in the book in the law of God distinctly, and gave the sense, and caused them to understand the reading.',
          'nkjv': 'So they read distinctly from the book, in the Law of God; and they gave the sense, and helped them to understand the reading.',
          'nabre': 'They read from the book of the law of God, interpreting it so that all could understand what was read.',
          'rsv-ce': 'And they read from the book, from the law of God, clearly; and they gave the sense, so that the people understood the reading.',
        },
      },
    ],
    reflection: `To read is to be free. Every word decoded is a door opened, a chain loosened, a horizon expanded. When millions gain literacy, entire societies transform — not through force, but through understanding.

Solomon places wisdom above all other pursuits. In the ancient world, literacy was rare and precious; scribes held enormous power simply because they could read and write. When literacy spreads to the many, power is redistributed. Knowledge becomes democratic. Scripture becomes accessible.

The scene in Nehemiah is extraordinary. After decades of exile, the people of Israel gather to hear God's Word read aloud — and the readers take care to explain it clearly. This wasn't mere information transfer. When the people understood, they wept. Truth, when it finally breaks through, is overwhelming.

Mobile technology carrying literacy to remote villages would have seemed miraculous to Ezra and Nehemiah. Yet the principle is the same: get the word to the people, make it clear, and watch transformation happen.

Who in your world needs access to understanding? How might you help someone read — not just words, but the story God is writing in their life?`,
  },
  {
    id: '2026-01-24',
    date: '2026-01-24',
    headline: 'Teenage climate activists win landmark court case, forcing government to strengthen environmental protections for future generations.',
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com/hub/climate-and-environment',
    articleTitle: 'Youth Climate Court Victory',
    verses: [
      {
        reference: '1 Timothy 4:12',
        text: {
          'niv': 'Don\'t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.',
          'esv': 'Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity.',
          'csb': 'Don\'t let anyone despise your youth, but set an example for the believers in speech, in conduct, in love, in faith, and in purity.',
          'nlt': 'Don\'t let anyone think less of you because you are young. Be an example to all believers in what you say, in the way you live, in your love, your faith, and your purity.',
          'kjv': 'Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.',
          'nkjv': 'Let no one despise your youth, but be an example to the believers in word, in conduct, in love, in spirit, in faith, in purity.',
          'nabre': 'Let no one have contempt for your youth, but set an example for those who believe, in speech, conduct, love, faith, and purity.',
          'rsv-ce': 'Let no one despise your youth, but set the believers an example in speech and conduct, in love, in faith, in purity.',
        },
      },
      {
        reference: 'Psalm 24:1',
        text: {
          'niv': 'The earth is the LORD\'s, and everything in it, the world, and all who live in it.',
          'esv': 'The earth is the LORD\'s and the fullness thereof, the world and those who dwell therein.',
          'csb': 'The earth and everything in it, the world and its inhabitants, belong to the LORD.',
          'nlt': 'The earth is the LORD\'s, and everything in it. The world and all its people belong to him.',
          'kjv': 'The earth is the LORD\'s, and the fulness thereof; the world, and they that dwell therein.',
          'nkjv': 'The earth is the LORD\'s, and all its fullness, the world and those who dwell therein.',
          'nabre': 'The earth is the LORD\'s and all it holds, the world and those who dwell in it.',
          'rsv-ce': 'The earth is the LORD\'s and the fulness thereof, the world and those who dwell therein.',
        },
      },
    ],
    reflection: `Throughout Scripture, God has a pattern of using the young to shame the old, the weak to confront the powerful, the small to topple the mighty. David before Goliath. Josiah reforming a nation at age eight. Jeremiah protesting that he's too young to prophesy, only to be told God has already appointed him.

Paul's charge to Timothy echoes across the centuries to every young person told they're too inexperienced to matter: set an example. Don't wait for permission. Lead with integrity and watch the skeptics fall silent.

The Psalmist's declaration that the earth belongs to God is the theological foundation for environmental stewardship. If the earth is the Lord's, then it is not ours to destroy. We are tenants, not owners. Caretakers, not consumers.

When young people stand up for the planet's future, they're exercising a deeply biblical impulse — the same impulse that led the prophets to cry out against injustice and exploitation. They're asking the same question God asks us: what kind of world will you leave behind?

Today, listen to a younger voice you might normally dismiss. God may be speaking through them.`,
    premiumReflection: `Throughout Scripture, God has a pattern of using the young to shame the old, the weak to confront the powerful, the small to topple the mighty. David before Goliath. Josiah reforming a nation at age eight. Jeremiah protesting that he's too young to prophesy, only to be told God has already appointed him. Samuel, a boy in the temple, hearing God's voice when the old priest Eli could not.

Paul's charge to Timothy echoes across the centuries to every young person told they're too inexperienced to matter: set an example. Don't wait for permission. Don't shrink back because of age. Lead with integrity and watch the skeptics fall silent. The Greek word \"kataphroneo\" (despise/look down on) implies not just dismissal but contempt. Paul is addressing a real cultural prejudice against youth leadership.

The Psalmist's declaration that the earth belongs to God is the theological foundation for environmental stewardship. If the earth is the Lord's, then it is not ours to destroy. We are tenants, not owners. Caretakers, not consumers. The doctrine of creation care isn't a modern invention — it's woven into the fabric of Scripture from Genesis through Revelation.

When young people stand up for the planet's future, they're exercising a deeply biblical impulse — the same impulse that led the prophets to cry out against injustice and exploitation. Amos condemned those who trampled the poor. Isaiah decried those who joined house to house until there was no space left. The prophetic tradition has always included care for the commons.

Today, listen to a younger voice you might normally dismiss. God may be speaking through them. And consider: what creation-care practice could you adopt that honors the truth that this earth — every river, forest, and atmosphere — belongs to the Lord?`,
  },
];

export const getTodayDevotional = (): DailyDevotional => {
  const today = new Date().toISOString().split('T')[0];
  const todayDevotional = MOCK_DEVOTIONALS.find(d => d.date === today);
  if (todayDevotional) {
    return todayDevotional;
  }
  return MOCK_DEVOTIONALS[0];
};

export const getDevotionalById = (id: string): DailyDevotional | undefined => {
  return MOCK_DEVOTIONALS.find(d => d.id === id);
};

export const getPastDevotionals = (days: number): DailyDevotional[] => {
  return MOCK_DEVOTIONALS.slice(0, days);
};

export const getAllDevotionals = (): DailyDevotional[] => {
  return MOCK_DEVOTIONALS;
};
