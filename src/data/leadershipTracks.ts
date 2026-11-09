import { LeadershipChallenge } from '../types';

export interface LeadershipTrackInfo {
  id: string;
  title: string;
  quote: string;
  iconName: string;
  description: string;
  challenges: LeadershipChallenge[];
}

export const leadershipTracksData: LeadershipTrackInfo[] = [
  {
    id: 'negotiation',
    title: 'Negotiation & Persuasion',
    quote: 'He who has learned to disagree without being disagreeable has discovered the highest secret of influence.',
    iconName: 'Handshake',
    description: 'Master value creation, tactical empathy, framing, and principled win-win outcomes in business and life.',
    challenges: [
      {
        id: 'neg-1',
        track: 'Negotiation',
        title: 'Tactical Empathy & Labeling',
        description: 'Practice Chris Voss labeling technique to defuse resistance before proposing your idea.',
        actionableStep: 'In today’s office discussion, state: "It seems like you are concerned that..." before offering your own recommendation. Note the counterpart’s immediate drop in defensiveness.',
        reflectionPrompt: 'Did labeling their unspoken concern make them more receptive to your proposal?',
        difficulty: 'Easy'
      },
      {
        id: 'neg-2',
        track: 'Negotiation',
        title: 'Calibrated "How" & "What" Questions',
        description: 'Stop using aggressive "Why" questions that trigger defensiveness; replace them with collaborative "How".',
        actionableStep: 'When encountering a difficult deadline or constraint today, ask: "How can we structure this so that quality remains uncompromised?"',
        reflectionPrompt: 'How did framing it as a joint problem alter the dynamic?',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'communication',
    title: 'High-Impact Communication',
    quote: 'Precision of thought breeds precision of speech.',
    iconName: 'MessageSquare',
    description: 'Structure thoughts with extreme clarity, eliminate filler words, and communicate executive-level authority.',
    challenges: [
      {
        id: 'comm-1',
        track: 'Communication',
        title: 'The Executive BLUF Principle',
        description: 'Bottom Line Up Front: Deliver conclusion in the first sentence before giving supporting context.',
        actionableStep: 'In your next team email or spoken update, state the primary decision/recommendation first, followed by max 3 bullet points.',
        reflectionPrompt: 'Was your message received with greater urgency and zero confusion?',
        difficulty: 'Easy'
      },
      {
        id: 'comm-2',
        track: 'Communication',
        title: 'Zero-Filler Word Audit',
        description: 'Eliminate "um", "ah", "basically", and "like" by replacing them with deliberate, confident pauses.',
        actionableStep: 'During a 15-minute meeting today, consciously pause in silence when gathering your thought instead of making vocal filler sounds.',
        reflectionPrompt: 'Did people pay more attention during your silent pauses?',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'public-speaking',
    title: 'Public Speaking & Stage Presence',
    quote: 'Your voice is an instrument of conviction; speak from the diaphragm, not the throat.',
    iconName: 'Mic',
    description: 'Command attention in meetings, webinars, and presentations with vocal resonance, pacing, and presence.',
    challenges: [
      {
        id: 'ps-1',
        track: 'Public Speaking',
        title: 'Diaphragmatic 60-Second Opening',
        description: 'Open a presentation or meeting without apologizing or clearing your throat.',
        actionableStep: 'Begin with a compelling statistic, provocative question, or direct bold statement with relaxed shoulders and deep belly breath.',
        reflectionPrompt: 'How did your energy level feel throughout the rest of your speaking turn?',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'decision-making',
    title: 'High-Stakes Decision Making',
    quote: 'Indecision is the greatest thief of executive energy.',
    iconName: 'Compass',
    description: 'Use mental models (First Principles, Inversion, Regret Minimization) to decide swiftly under uncertainty.',
    challenges: [
      {
        id: 'dec-1',
        track: 'Decision-Making',
        title: 'Inversion Thinking Audit',
        description: 'Instead of asking how to succeed, ask what catastrophic errors would guarantee failure.',
        actionableStep: 'Write down 3 worst mistakes that could derail your current month project, and install safeguards against all three today.',
        reflectionPrompt: 'What hidden risks became instantly obvious through inversion?',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence & Stoic Poise',
    quote: 'Between stimulus and response there is a space. In that space is our power to choose our response.',
    iconName: 'Heart',
    description: 'Master self-regulation, avoid emotional reactivity, and remain the calmest person in the room during crises.',
    challenges: [
      {
        id: 'eq-1',
        track: 'Emotional Intelligence',
        title: 'The 3-Second Stoic Delay',
        description: 'When feeling triggered or criticized, take three slow nasal breaths before replying.',
        actionableStep: 'If an irritating message or comment arrives today, wait 3 seconds, relax your jaw, and reply only with objective facts.',
        reflectionPrompt: 'Did delaying prevent an unproductive conflict?',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'delegation',
    title: 'Strategic Delegation & Systems Building',
    quote: 'A leader is a maker of leaders, not a gatherer of followers.',
    iconName: 'Users',
    description: 'Empower peers and teammates with clear definitions of done, ownership boundaries, and check-in cadence.',
    challenges: [
      {
        id: 'del-1',
        track: 'Delegation',
        title: 'Outcome-Based Briefing',
        description: 'Delegate by defining the exact end outcome rather than micromanaging every single micro-step.',
        actionableStep: 'Hand off a task today by explicitly defining: 1. Success criteria, 2. Deadline, 3. Authority limits. Let them choose the execution route.',
        reflectionPrompt: 'Did they rise to the level of autonomy provided?',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'confidence',
    title: 'Unshakable Self-Confidence',
    quote: 'Confidence is not "they will like me"; confidence is "I will be fine even if they don\'t".',
    iconName: 'Award',
    description: 'Anchor self-worth in disciplined execution, physical strength, and keeping promises made to yourself.',
    challenges: [
      {
        id: 'conf-1',
        track: 'Confidence',
        title: 'Posture & Eye Contact Mastery',
        description: 'Hold open posture, head level, shoulders retracted, maintaining comfortable eye contact.',
        actionableStep: 'Maintain eye contact for 2 extra seconds before breaking away during conversations today.',
        reflectionPrompt: 'Did this shift your internal perception of personal power?',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'honesty',
    title: 'Radical Honesty & Integrity',
    quote: 'Integrity is doing the right thing, even when no one is watching.',
    iconName: 'CheckCircle',
    description: 'Eliminate convenient white lies, honor commitments 100%, and align internal values with external actions.',
    challenges: [
      {
        id: 'hon-1',
        track: 'Honesty',
        title: 'Total Truth Day',
        description: 'Speak with absolute accuracy without exaggeration or diplomatic distortion.',
        actionableStep: 'Notice every temptation to exaggerate numbers, project timelines, or personal accomplishments today. Keep words strictly accurate.',
        reflectionPrompt: 'How liberating was it to have zero cognitive load from pretense?',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'leadership',
    title: 'Inspiring Leadership & Culture',
    quote: 'Leadership is unlocking people\'s potential to become better.',
    iconName: 'Flame',
    description: 'Lead by front-line example, give public praise, absorb team blame, and cast an ambitious vision.',
    challenges: [
      {
        id: 'lead-1',
        track: 'Leadership',
        title: 'Specific Authentic Appreciation',
        description: 'Deliver praise that highlights specific effort and character rather than generic flattery.',
        actionableStep: 'Privately commend a colleague or family member today highlighting a specific behavior you admired.',
        reflectionPrompt: 'How did this impact their enthusiasm and trust in you?',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'english-fluency',
    title: 'English Vocabulary & Eloquence',
    quote: 'The limits of my language mean the limits of my world.',
    iconName: 'BookOpen',
    description: 'Expand vocabulary with high-level executive terms and practice verbal eloquence daily.',
    challenges: [
      {
        id: 'eng-1',
        track: 'English Fluency',
        title: 'Five Advanced Words Integration',
        description: 'Learn and actively speak 5 sophisticated executive English words in conversations.',
        actionableStep: 'Incorporate today: 1. "Efficacy" 2. "Dispassionate" 3. "Paramount" 4. "Nuanced" 5. "Imperative".',
        reflectionPrompt: 'Did these words elevate the sophistication of your communication?',
        difficulty: 'Easy'
      },
      {
        id: 'eng-2',
        track: 'English Fluency',
        title: '15-Minute Extempore Monologue',
        description: 'Speak aloud for 15 minutes continuously in English on a chosen transformation or work topic.',
        actionableStep: 'Record a 5-minute daily personal audio vlog summarizing what you learned today in English.',
        reflectionPrompt: 'Notice your sentence rhythm and ease of word retrieval.',
        difficulty: 'Medium'
      }
    ]
  }
];
