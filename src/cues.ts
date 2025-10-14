// src/cues.ts
export type CueSet = {
  id: string;
  lines: string[];
};

export const cueSets: CueSet[] = [
  // 1) Relieve
  {
    id: "1",
    lines: [
      "Breathe in… and out.",
      "Waves carry what you no longer hold.",
      "You are not alone out here.",
      "Your worry is smaller than it felt.",
      "You did well. Be gentle with yourself.",
    ],
  },

  // 2) Intention
  {
    id: "2",
    lines: [
      "Set your worries down for a moment.",
      "Think of something you truly wish for.",
      "Picture it clearly — the colors, the light, the feeling.",
      "Whisper it into the lantern before you let it rise.",
      "The flame carries your intention upward.",
      "Now, take action. Begin with this very moment.",
    ],
  },

  // 3) Grounding
  {
    id: "3",
    lines: [
      "Feel the weight of your feet on the ground.",
      "Notice the air brushing past your nose and leaving again.",
      "Let your shoulders fall, unclench your jaw.",
      "Match your breath to the rhythm of the waves.",
      "Take this moment to release tension and feel your whole being.",
    ],
  },

  // 4) Self-Compassion
  {
    id: "4",
    lines: [
      "You’ve already come such a long way.",
      "It’s okay to admit that it was hard.",
      "Even your imperfections are what make you, you.",
      "Perhaps your truest self is already the most complete version of you.",
      "Tell yourself softly: you did well.",
      "Don’t forget kindness toward yourself and the world around you.",
    ],
  },

  // 5) Forward / Micro-Action
  {
    id: "5",
    lines: [
      "Now, choose one small step you can take.",
      "Something simple : a note, a message, a five-minute start.",
      "The smallest motion still changes the tide.",
      "As the lantern rises, mark this beginning inside you.",
      "Momentum builds quietly, one breath at a time.",
      "I’m cheering for your journey ahead. You’ve got this.",
    ],
  },
];

// 맵 접근용
export const cueMap: Record<string, string[]> = Object.fromEntries(
  cueSets.map(s => [s.id, s.lines])
);

// ID 목록
export const cueSetIds = cueSets.map(s => s.id);