export interface SportArenaItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  equipmentNeeded: string[];
  assessmentQuestions: {
    question: string;
    easyCondition: string;
    medCondition: string;
    hardCondition: string;
  }[];
  levels: {
    EASY: {
      title: string;
      skills: string[];
      drills: string[];
      durationMin: number;
      targetScore: string;
    };
    MEDIUM: {
      title: string;
      skills: string[];
      drills: string[];
      durationMin: number;
      targetScore: string;
    };
    HARD: {
      title: string;
      skills: string[];
      drills: string[];
      durationMin: number;
      targetScore: string;
    };
  };
}

export const sportsArenaList: SportArenaItem[] = [
  {
    id: 'badminton',
    name: 'Badminton',
    iconName: 'Activity',
    description: 'High-intensity agility sport demanding explosive rotational power, lateral footwork, and lightning reflexes.',
    equipmentNeeded: ['Racquet (G4/G5 grip)', 'Nylon or Feather Shuttles', 'Non-marking court shoes'],
    assessmentQuestions: [
      {
        question: 'How often have you played badminton previously?',
        easyCondition: 'Rarely / Recreational backyard',
        medCondition: 'Play weekly or past club experience',
        hardCondition: 'Tournament or advanced league player'
      },
      {
        question: 'Current ankle and knee stability on rapid changes of direction?',
        easyCondition: 'Cautious or recovering',
        medCondition: 'Good, no pain',
        hardCondition: 'Explosive and highly conditioned'
      }
    ],
    levels: {
      EASY: {
        title: 'Fundamental Grip & Continuous Rallies',
        skills: ['Basic forehand/backhand V-grip', 'Underarm lift and clear', 'Base center court recovery'],
        drills: ['Wall rally drill 50 continuous hits', 'Split-step shadow footwork 5 sets x 30s', 'High serve consistency test'],
        durationMin: 30,
        targetScore: 'Maintain 20-shot continuous cooperative rally'
      },
      MEDIUM: {
        title: 'Overhead Clears, Drops & Net Play',
        skills: ['Scissor kick overhead drop shot', 'Fast flat drive exchanges', 'Crosscourt tumbling net spin'],
        drills: ['Front-back shadow lunges 6 corners', 'Smash & net kill sequence drill', 'Full singles practice set'],
        durationMin: 45,
        targetScore: 'Complete 3 competitive games with sustained pace'
      },
      HARD: {
        title: 'Explosive Jump Smashes & Tournament Matchplay',
        skills: ['Steep angle jump smash at 250+ km/h', 'Late deceptive backhand flick', 'Rapid defensive dive and recovery'],
        drills: ['Multi-shuttle feeding drill (20 shuttles x 5 sets)', 'High-cadence doubles attacking formation'],
        durationMin: 60,
        targetScore: 'Win 2 out of 3 competitive 21-point match sets'
      }
    }
  },
  {
    id: 'cricket',
    name: 'Cricket',
    iconName: 'Shield',
    description: 'Premier Indian bat-and-ball discipline combining hand-eye coordination, explosive bowling mechanics, and tactical awareness.',
    equipmentNeeded: ['Cricket bat (English or Kashmir willow)', 'Leather or heavy tennis ball', 'Batting gloves & pads'],
    assessmentQuestions: [
      {
        question: 'Batting / bowling experience against live pace?',
        easyCondition: 'Tennis ball gully cricket only',
        medCondition: 'Net practice against 100-110 km/h pace',
        hardCondition: 'Leather ball club/district matches'
      }
    ],
    levels: {
      EASY: {
        title: 'Grip, Stance & Straight Bat Presentation',
        skills: ['Balanced shoulder-width batting stance', 'Forward defensive block', 'Basic overarm bowling release'],
        drills: ['Drop-ball drive practice on stationary ball (50 reps)', 'Target cone bowling from 18 yards', 'High catching technique'],
        durationMin: 35,
        targetScore: 'Hit 25 consecutive straight drives in nets'
      },
      MEDIUM: {
        title: 'Front & Back Foot Stroke Execution & Line-Length Bowling',
        skills: ['Cover drive with high elbow', 'Pull shot off back foot', 'Outswing seam presentation'],
        drills: ['Side-arm throwdown session 6 overs', 'Target line bowling (hitting top of off-stump 15 times)', 'Direct hit boundary throws'],
        durationMin: 50,
        targetScore: 'Survive 60 balls in nets scoring 40+ simulated runs'
      },
      HARD: {
        title: 'Elite Power Hitting & Tactical Match Simulation',
        skills: ['Lofted straight drive over long-off', 'Reverse sweep & ramp against spin', 'Reverse swing and yorker execution at death'],
        drills: ['Death overs match simulation (need 36 runs off 18 balls)', 'Bowling 18 consecutive yorkers/slower balls under pressure'],
        durationMin: 75,
        targetScore: 'Execute strike rate > 140 with minimal false shots'
      }
    }
  },
  {
    id: 'chess',
    name: 'Chess (Mental Mastery)',
    iconName: 'Crown',
    description: 'The definitive royal mind discipline: deep calculation, emotional detachment, spatial visualization, and strategic endurance.',
    equipmentNeeded: ['Chessboard (FIDE standard) or Lichess/Chess.com digital timer'],
    assessmentQuestions: [
      {
        question: 'Current online chess rating or tactical puzzle experience?',
        easyCondition: 'Under 1000 ELO / know rules and basic checkmates',
        medCondition: '1000 - 1500 ELO / familiar with openings & forks',
        hardCondition: '1600+ ELO / deep opening prep and positional play'
      }
    ],
    levels: {
      EASY: {
        title: 'Tactical Patterns & Opening Principles',
        skills: ['Control center squares with pawns', 'Develop knights and bishops before queen', 'Castle early for king safety', 'Spot 1-move forks and pins'],
        drills: ['Solve 20 puzzle rush tactics under 3 minutes', 'Practice King + Queen vs King checkmate', 'Italian Game opening study'],
        durationMin: 25,
        targetScore: 'Solve 15 out of 15 mate-in-1 and mate-in-2 puzzles'
      },
      MEDIUM: {
        title: 'Positional Strategy & 3-Move Calculation',
        skills: ['Identify outposts for knights', 'Rook on open file penetration', 'Recognize pawn structure weaknesses (isolated/doubled pawns)'],
        drills: ['Analyze 3 grandmaster games move-by-move', 'Play two 10+0 rapid games with post-game engine review', 'Rook endgame lucena/philidor positions'],
        durationMin: 45,
        targetScore: 'Achieve 75%+ accuracy in a 10-minute rapid game'
      },
      HARD: {
        title: 'Prophylaxis, Dynamic Sacrifices & Master Endgames',
        skills: ['Prophylactic thinking (preventing opponent ideas)', 'Positional exchange sacrifices', 'Complex pawn endgames with opposition and triangulation'],
        drills: ['Blindfold calculation of 5-move tactical variations', 'Speed puzzle storm scoring 35+ correct', 'Classical 30+0 match against 1800+ bot'],
        durationMin: 60,
        targetScore: 'Win a classical game with 0 blunders and under 25 centipawn loss'
      }
    }
  },
  {
    id: 'football',
    name: 'Football (Soccer)',
    iconName: 'Target',
    description: 'Full-pitch cardiovascular endurance, spatial anticipation, first-touch ball mastery, and sprint recovery.',
    equipmentNeeded: ['Size 5 football', 'Turf or grass boots', 'Shin guards'],
    assessmentQuestions: [
      {
        question: 'Continuous running ability on grass pitch?',
        easyCondition: 'Tire out within 15 minutes',
        medCondition: 'Can play 45-minute half comfortably',
        hardCondition: 'Full 90-minute match stamina'
      }
    ],
    levels: {
      EASY: {
        title: 'First Touch & Inside Foot Passing',
        skills: ['Cushioning ground passes with inside boot', 'Short 10-yard push passes', 'Basic dribbling keeping ball within 1 stride'],
        drills: ['Wall rebound passing 100 touches (50 left, 50 right)', 'Figure-8 cone dribbling drill', 'Stationary shooting technique into net corners'],
        durationMin: 35,
        targetScore: 'Complete 40 clean one-touch passes without losing control'
      },
      MEDIUM: {
        title: 'Through-Balls, Shielding & High-Tempo Small Sided',
        skills: ['Driven low passes through defensive lines', 'Body positioning to shield ball under pressure', 'Curled strikes with instep'],
        drills: ['Box-to-box shuttle runs with ball (5 sets)', '3v3 or 5v5 small-sided pitch game', 'Sprint-decelerate-shoot drill'],
        durationMin: 50,
        targetScore: 'Maintain high work-rate across 40 minutes continuous 5v5'
      },
      HARD: {
        title: 'Tactical Pressing, Long Crosses & Match Dominance',
        skills: ['40-yard diagonal switches of play', 'Counter-pressing trigger anticipation', 'First-time volley and half-volley finishing'],
        drills: ['Bleep test to level 12+', 'High-intensity interval pressing simulation', 'Competitive 11v11 matchplay'],
        durationMin: 70,
        targetScore: 'Cover > 6 km distance during match session'
      }
    }
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    iconName: 'Flame',
    description: 'Rapid-fire micro-second adjustments, spin reading, forearm whip acceleration, and close-table footwork.',
    equipmentNeeded: ['ITTF approved paddle', '3-star 40+ celluloid/plastic balls', 'Table with regulation net'],
    assessmentQuestions: [
      {
        question: 'Can you read and return heavy topspin and backspin?',
        easyCondition: 'Struggle with heavy spin',
        medCondition: 'Can loop topspin, chop backspin reliably',
        hardCondition: 'Strong third-ball attack game'
      }
    ],
    levels: {
      EASY: {
        title: 'Shakehand Grip & Consistent Counter-Hit',
        skills: ['Forehand drive flat contact', 'Backhand push control', 'Basic pendulum spin serve'],
        drills: ['Forehand crosscourt rally 50 balls', 'Backhand push exchange drill', 'Shadow side-step footwork'],
        durationMin: 25,
        targetScore: '30 consecutive forehand counter-hits without missing'
      },
      MEDIUM: {
        title: 'Forehand Topspin Loop & Third-Ball Attack',
        skills: ['Brushing ball at top of bounce for heavy topspin', 'Flick return on short serves', 'Falkenberg footwork routine'],
        drills: ['Topspin against backspin push (30 balls)', 'Serve, receive, attack sequence', 'Best of 5 games match'],
        durationMin: 45,
        targetScore: 'Win 3 games with topspin win rate > 60%'
      },
      HARD: {
        title: 'Counter-Looping at Mid-Distance & Deceptive Serves',
        skills: ['Fast banana flick over the table', 'Mid-distance counter-loop exchange', 'Ghost serve with extreme backspin'],
        drills: ['Multi-ball high speed footwork circuit', 'Competitive tournament bracket'],
        durationMin: 60,
        targetScore: 'Execute 10 successful third-ball kill loops'
      }
    }
  }
];
