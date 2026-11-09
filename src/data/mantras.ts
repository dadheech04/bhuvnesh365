import { BreathingConfig } from '../types';

export interface MantraInfo {
  id: string;
  name: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  benefits: string[];
  recommendedJapaCount: number; // 108
}

export const mantrasData: MantraInfo[] = [
  {
    id: 'gayatri-mantra',
    name: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    transliteration: 'Oṃ Bhūr Bhuvaḥ Svaḥ Tat-savitur Vareṇyaṃ Bhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt',
    meaning: 'We meditate on that most adorable Supreme Light of the Divine Sun, the Creator of the Universe. May that divine light illuminate and inspire our intellect with higher wisdom and clarity.',
    benefits: [
      'Sharpened cognitive focus, decision making, and mental clarity.',
      'Soothes anxious thought loops and calms nervous system hyperarousal.',
      'Ignites inner vitality, willpower, and disciplined perseverance.'
    ],
    recommendedJapaCount: 108
  },
  {
    id: 'mahamrityunjaya-mantra',
    name: 'Mahamrityunjaya Mantra',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्यormुक्षीय मामृतात्॥',
    transliteration: 'Oṃ Tryambakaṃ Yajāmahe Sugandhiṃ Puṣṭi-vardhanam | Urvārukam-iva Bandhanān Mṛtyor-mukṣīya Māmṛtāt',
    meaning: 'We revere the Three-Eyed Lord Shiva, who is fragrant and nurtures all beings. Just as a ripe melon is effortlessly liberated from its vine, may we be released from mortal limitations, fear, and weakness, rooted in eternal strength.',
    benefits: [
      'Deep psychological resilience during intense bodily and life transformations.',
      'Releases deep-seated physical exhaustion and promotes restorative healing.',
      'Shields against panic, fear of failure, and burnout from demanding work schedules.'
    ],
    recommendedJapaCount: 108
  }
];

export const breathingProtocols: BreathingConfig[] = [
  {
    name: 'Beginner Calm (4-4 Rhythm)',
    inhaleSec: 4,
    holdSec: 0,
    exhaleSec: 4,
    holdEmptySec: 0,
    cycles: 10,
    purpose: 'Gentle equal-pace breathing to reset autonomic tone without holding or straining.'
  },
  {
    name: 'Box Breathing (Navy SEAL 4-4-4-4)',
    inhaleSec: 4,
    holdSec: 4,
    exhaleSec: 4,
    holdEmptySec: 4,
    cycles: 8,
    purpose: 'Peak emotional composure, grounding cortisol during high-stress office demands.'
  },
  {
    name: '4-7-8 Deep Sleep & Decompression',
    inhaleSec: 4,
    holdSec: 7,
    exhaleSec: 8,
    holdEmptySec: 0,
    cycles: 6,
    purpose: 'Powerful parasympathetic activation to transition into deep, restorative sleep by 9:45 PM.'
  },
  {
    name: 'Morning Energy Charge (5-2-5-0)',
    inhaleSec: 5,
    holdSec: 2,
    exhaleSec: 5,
    holdEmptySec: 0,
    cycles: 12,
    purpose: 'Expands lung capacity and oxygenates tissues immediately upon 5:45 AM wake-up.'
  }
];
