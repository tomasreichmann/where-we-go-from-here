export type RuleSection = {
  id: string;
  title: string;
  prose: string;
  placeholder?: string;
  notes: { questions: string[]; reason: string; todo: string };
  example?: string[];
};
export const rules: RuleSection[] = [
  {
    id: "purpose",
    title: "A shared future. Different ambitions.",
    prose:
      "Represent a nation adapting to technological, social, economic and environmental change. Keep civilization from collapsing while pursuing your secret goal. If the world survives, the highest final victory-point score wins. The Anarchist wins only through destabilization and may not be present.",
    placeholder:
      "Write the final scoring equations and tie rules. Nation identities and starting bonuses are not yet defined.",
    notes: {
      questions: [
        "Nation bonuses and scoring formulas under the national-limit model.",
      ],
      reason:
        "Public nations are separate from secret goals. Risk-seeking goals are not proof of an Anarchist.",
      todo: "Author real nation definitions and scoring equations.",
    },
  },
  {
    id: "limits",
    title: "Watch the world. Protect your nation.",
    prose:
      "Employment, Welfare, Wealth, Energy and Climate have shared world values. Each nation has public collapse limits on every scale. National adaptations move that nation’s limits; they do not directly change the shared world value. Climate is dangerous at both cold and hot extremes. If any nation collapses, the world collapses.",
    placeholder:
      "Exact threshold comparisons, permitted ranges and the movement of Climate’s two sides remain unfinished. Figure values are illustrative.",
    notes: {
      questions: [
        "Climate limit sides and threshold comparisons.",
        "Maximum protection, stacking and universal physical bounds.",
      ],
      reason:
        "Visible limits replace the earlier personal-offset proposal. Welfare combines well-being and public services.",
      todo: "Confirm threshold notation and two-sided limits.",
    },
    example: ["ubi", "wetlands"],
  },
  {
    id: "turns",
    title: "On your turn, choose one action.",
    prose:
      "Take one displayed event, pay to resolve a crisis, or pass. You may help another nation by paying to resolve its crisis; this takes your turn. Removing a crisis stops its ongoing penalties, but past damage remains. When passing, you may discard one displayed non-capstone event. Capstones cannot be discarded this way.",
    placeholder:
      "Crisis payment units, amounts, consent and matching breakthrough remedies still need rules.",
    notes: {
      questions: ["Crisis-payment units and affected-player consent."],
      reason: "Helping slows the draw pace, which may matter for the ending.",
      todo: "Write remedy conditions for each crisis.",
    },
    example: ["fossil"],
  },
  {
    id: "refill",
    title: "A revealed crisis cannot wait.",
    prose:
      "Keep two non-crisis choices face up for each subject whenever its deck allows. Crises activate immediately when revealed. A National crisis goes to the revealing player; a World crisis enters the world area. Remove the crisis from the display and keep refilling until two non-crisis choices are available or the deck is empty. A refill may reveal several crises.",
    placeholder:
      "Assigning setup crises and automatically activating A/B crises remain unresolved.",
    notes: {
      questions: [
        "Setup crisis assignment.",
        "Automatic crisis A/B handling.",
        "Multiple tier transitions during one refill chain.",
      ],
      reason:
        "Crises do not wait to be chosen. The illustrated chain uses provisional cards.",
      todo: "Specify setup owner and transition queue.",
    },
    example: ["fossil", "heat", "robot-care"],
  },
  {
    id: "decisions",
    title: "Choose a response, then keep its consequences.",
    prose:
      "National decisions belong to the acting player. For an A/B event, rotate left for A or right for B; only the chosen resolution contributes persistent aspects and effects. Projects and Policies have one enacted effect. A World Project or Policy is voted into play or discarded without its effect. Project prerequisites count World cards plus your own National cards, never other nations’ National cards.",
    placeholder:
      "Define whether prerequisites must remain satisfied after construction. Capstone requirements and special rules are provisional.",
    notes: {
      questions: [
        "Continued project prerequisites.",
        "Policy replacement, conflicts and stacking.",
      ],
      reason:
        "Do not invent an alternative B effect for a single-effect Project.",
      todo: "Finalize capstone special rules.",
    },
    example: ["driverless", "fusion"],
  },
  {
    id: "votes",
    title: "Your influence is reusable.",
    prose:
      "Each World event names eligible voting aspects independently of its subject. Add all matching aspect quantities on your National cards, including active crises. Strength is at least one; the minimum is not an extra vote. Technology ×1 plus Economy ×2 gives three votes when both are eligible. Votes are fully reusable. Reveal ballots simultaneously and declare strength. The initiating player counts and breaks ties. Use A/B, Yes/No and Abstain as appropriate.",
    notes: {
      questions: ["Abstention tie cases."],
      reason:
        "Weighted aspects are persistent influence, not a spendable resource.",
      todo: "Add a complete multi-nation ballot example.",
    },
    example: ["driverless", "cooperative"],
  },
  {
    id: "reviews",
    title: "Finish the event before revisiting the past.",
    prose:
      "Subjects advance independently when the first card of a new tier is revealed. Finish the selected event before reviews and discards. Each player may nominate one World issue from the advancing subject; nominations must be unique. Review votes use every matching National aspect, including cards about to expire. Only after the votes are outgoing cards removed. Revision undoes the old outcome and applies the new one; expiry preserves past immediate changes.",
    placeholder:
      "Specify review order, review initiators, non-additive reversal and whether multiple expiry conditions use any or all. Older displayed-card aging also needs a rule.",
    notes: {
      questions: [
        "Review order and initiator assignment.",
        "Any/all multi-subject expiry.",
        "Non-additive reversal and ongoing-limit restoration.",
      ],
      reason: "Do not remove outgoing voting strength before the review.",
      todo: "Write expiry and reversal worked examples.",
    },
    example: ["repair"],
  },
  {
    id: "end",
    title: "Complete the round. Check survival first.",
    prose:
      "After every player has acted, apply ongoing track penalties and crises once, then check collapse before normal completion. Low world Wealth lowers world Welfare through one world penalty, not once per nation. Rotate the starting player. Building any capstone or exhausting three draw decks schedules the ending at round end; everyone receives the same number of turns. Collapse takes precedence. There is no early-round immunity from collapse.",
    placeholder:
      "Exact penalty amounts, ordering and cascading thresholds remain unfinished.",
    notes: {
      questions: ["Penalty ordering and newly crossed thresholds."],
      reason:
        "Later collapse is a balance target rather than a rule preventing early collapse.",
      todo: "Specify upkeep ordering and balance fixture values.",
    },
    example: ["orbital"],
  },
];
