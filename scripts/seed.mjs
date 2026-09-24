// One-time seed authoring utility. Runtime and catalogs read only the CSV files.
import { writeFileSync } from "node:fs";
const write = (name, rows) => {
  const keys = Object.keys(rows[0]);
  writeFileSync(
    `src/content/${name}.csv`,
    [keys, ...rows.map((r) => keys.map((k) => r[k] ?? ""))]
      .map((r) =>
        r.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(","),
      )
      .join("\n") + "\n",
  );
};
const subjects = ["Technology", "Society", "Economy", "Climate"];
write(
  "subjects",
  subjects.map((label, i) => ({
    id: label.toLowerCase(),
    label,
    icon: ["◇", "○", "□", "△"][i],
    color: ["sky", "coral", "ochre", "leaf"][i],
    prompt: "Provisional deck subject; confirm taxonomy.",
  })),
);
write(
  "aspects",
  ["Technology", "Governance", "Ecology", "Industry", "Economy", "Social"].map(
    (label, i) => ({
      id: label.toLowerCase(),
      label,
      icon: ["◇", "◎", "△", "▦", "□", "○"][i],
      color: ["sky", "leaf", "leaf", "ochre", "ochre", "coral"][i],
      prompt: "Provisional aspect taxonomy.",
    }),
  ),
);
const specs = [
  [
    "driverless",
    "Technology",
    "Breakthrough",
    "National",
    "Streets without drivers",
    "Autonomous transport outperforms human drivers. Communities must decide who remains accountable.",
    "Autonomous access",
    "Require a human operator",
  ],
  [
    "admin-ai",
    "Technology",
    "Breakthrough",
    "World",
    "The administration shift",
    "AI systems take over routine administrative work, changing how millions earn a living.",
    "Fund a managed transition",
    "Open unrestricted research",
  ],
  [
    "fusion",
    "Technology",
    "Project",
    "National",
    "A small sun on Earth",
    "A public research consortium brings a pilot fusion plant online.",
    "Build the pilot",
  ],
  [
    "robot-care",
    "Technology",
    "Breakthrough",
    "National",
    "Care beyond capacity",
    "Assistive robots expand home care while human carers face new roles.",
    "Keep human oversight",
    "Expand automated care",
  ],
  [
    "orbital",
    "Technology",
    "Capstone",
    "World",
    "Beyond the extraction frontier",
    "An orbital materials network could reduce pressure on terrestrial mining.",
    "Build the network",
  ],
  [
    "ubi",
    "Society",
    "Project",
    "National",
    "A floor beneath everyone",
    "A basic income protects households as paid work becomes less available.",
    "Establish basic income",
  ],
  [
    "vaccines",
    "Society",
    "Policy",
    "World",
    "Health without borders",
    "A shared vaccine program protects access to care in low-wealth regions.",
    "Enact shared access",
  ],
  [
    "dna",
    "Society",
    "Project",
    "World",
    "A shared genetic library",
    "A voluntary research library makes rare conditions easier to study, with public oversight.",
    "Create the library",
  ],
  [
    "commons",
    "Society",
    "Policy",
    "National",
    "The neighborhood commons",
    "Local care, kitchens and learning spaces make public support tangible.",
    "Fund local services",
  ],
  [
    "loneliness",
    "Society",
    "Crisis",
    "National",
    "An age of isolation",
    "Personalized entertainment expands while in-person support networks weaken.",
    "Active on reveal",
  ],
  [
    "civic",
    "Society",
    "Capstone",
    "World",
    "A universal care compact",
    "Nations coordinate durable access to housing, health and lifelong learning.",
    "Adopt the compact",
  ],
  [
    "fossil",
    "Economy",
    "Crisis",
    "National",
    "The last easy reserves",
    "Accessible fossil resources run short before replacement systems are ready.",
    "Active on reveal",
  ],
  [
    "cooperative",
    "Economy",
    "Policy",
    "National",
    "Automation dividends",
    "Worker-owned systems distribute a share of automated production.",
    "Share the dividend",
  ],
  [
    "repair",
    "Economy",
    "Project",
    "National",
    "Built to be repaired",
    "Open standards extend the life of tools, appliances and essential machines.",
    "Build repair networks",
  ],
  [
    "platform",
    "Economy",
    "Breakthrough",
    "World",
    "Platforms become infrastructure",
    "Private platforms mediate essential services and shape public choices.",
    "Regulate public access",
    "Allow private expansion",
  ],
  [
    "circular",
    "Economy",
    "Capstone",
    "World",
    "The circular economy",
    "Material recovery becomes the default across essential industries.",
    "Build circular systems",
  ],
  [
    "heat",
    "Climate",
    "Crisis",
    "World",
    "The long heat season",
    "Persistent heat strains crops, grids and public health.",
    "Active on reveal",
  ],
  [
    "wetlands",
    "Climate",
    "Project",
    "National",
    "Room for the river",
    "Restored wetlands absorb floods and give habitats space to recover.",
    "Restore the wetlands",
  ],
  [
    "grid",
    "Climate",
    "Project",
    "National",
    "A grid that bends",
    "Local storage and distributed generation keep essential services available.",
    "Connect local storage",
  ],
  [
    "cooling",
    "Climate",
    "Breakthrough",
    "World",
    "A cooler city",
    "Reflective roofs and shaded streets reduce dangerous urban heat.",
    "Coordinate a public rollout",
    "Support local experiments",
  ],
  [
    "restoration",
    "Climate",
    "Capstone",
    "World",
    "A living planet network",
    "Connected habitats support recovery across national borders.",
    "Connect protected habitats",
  ],
  [
    "learning",
    "Society",
    "Breakthrough",
    "National",
    "Learning after work",
    "Public learning moves beyond job preparation toward participation and care.",
    "Open lifelong learning",
    "Focus specialist training",
  ],
  [
    "water",
    "Climate",
    "Policy",
    "National",
    "Water held in common",
    "Public water trusts coordinate access during prolonged dry seasons.",
    "Establish water trusts",
  ],
  [
    "energy",
    "Economy",
    "Project",
    "National",
    "Reserves for uncertain days",
    "Shared storage cushions disruptions to energy supply.",
    "Build strategic reserves",
  ],
];
let cards = [],
  resolutions = [],
  effects = [],
  weights = [],
  voting = [],
  expiry = [],
  requirements = [],
  illustrations = [];
specs.forEach(([id, subject, kind, scope, title, statement, a, b], i) => {
  const single = !b;
  cards.push({
    id,
    kind,
    scope,
    subject: subject.toLowerCase(),
    tier: kind === "Capstone" ? 4 : 1 + (i % 3),
    prompt: `Explore ${title.toLowerCase()} as a provisional public-policy response.`,
    title,
    statement,
    illustration: id,
    status: "defined",
    mode: single
      ? scope === "World" && kind !== "Crisis"
        ? "Yes/No"
        : "single"
      : "A/B",
    activation: kind === "Crisis" ? "reveal" : "",
    provenance: "Authored provisional; all numbers illustrative",
  });
  illustrations.push({
    id,
    prompt: `Illustrate ${title.toLowerCase()}: a bright solarpunk civic scene, restrained shapes, no explicit violence.`,
    asset: "",
    status: "prompt",
  });
  [a, b].filter(Boolean).forEach((label, j) => {
    let outcome = single ? "enact" : j ? "B" : "A";
    resolutions.push({
      id: `${id}-${outcome}`,
      card: id,
      key: outcome,
      label,
      text:
        label +
        ". " +
        (kind === "Crisis"
          ? "The ongoing pressure remains until a remedy is paid."
          : "A proposed response for design inspection."),
      prompt: `Write the exact ${label.toLowerCase()} outcome.`,
    });
    const aspect =
      subject === "Society"
        ? "social"
        : subject === "Climate"
          ? "ecology"
          : subject.toLowerCase();
    weights.push({
      id: `${id}-${outcome}-1`,
      card: id,
      outcome,
      aspect,
      quantity: i % 4 === 0 ? 2 : 1,
    });
    if (i % 4 === 0)
      weights.push({
        id: `${id}-${outcome}-2`,
        card: id,
        outcome,
        aspect: "governance",
        quantity: 1,
      });
    const scale =
      id === "ubi"
        ? "employment"
        : id === "heat"
          ? "climate"
          : ["welfare", "energy", "wealth", "employment"][i % 4];
    effects.push({
      id: `${id}-${outcome}`,
      card: id,
      outcome,
      timing: kind === "Crisis" || kind === "Policy" ? "ongoing" : "immediate",
      target:
        kind === "Policy"
          ? "rule"
          : scope === "National"
            ? "national limit"
            : "world value",
      scale,
      side: scope === "National" ? "lower" : "",
      value:
        kind === "Policy"
          ? ""
          : kind === "Crisis"
            ? 1
            : scope === "National"
              ? -1
              : 1,
      text:
        id === "vaccines"
          ? "Proposed exception: low Wealth no longer reduces Welfare."
          : kind === "Policy"
            ? "Proposed rule: maintain access to the service described above."
            : scope === "National"
              ? `Move this nation's ${scale} lower limit −1; illustrative adaptation.`
              : `World ${scale} ${kind === "Crisis" ? "+1 ongoing" : "+1"}; illustrative.`,
      prompt: "Confirm magnitude, stacking and reversal.",
    });
  });
  if (scope === "World") {
    [
      "governance",
      subject === "Climate"
        ? "ecology"
        : subject === "Society"
          ? "social"
          : subject.toLowerCase(),
    ].forEach((aspect) =>
      voting.push({
        id: `${id}-${aspect}`,
        card: id,
        aspect,
        options: b ? "A|B|Abstain" : "Yes|No|Abstain",
      }),
    );
  }
  expiry.push({
    id: `${id}-expiry`,
    card: id,
    subject: subject.toLowerCase(),
    tier: 4,
    permanent: kind === "Policy" ? "true" : "false",
    combination: "unresolved",
  });
  if (id === "repair")
    expiry.push({
      id: "repair-expiry-2",
      card: id,
      subject: "technology",
      tier: 3,
      permanent: "false",
      combination: "unresolved",
    });
  if (kind === "Project" || kind === "Capstone")
    requirements.push({
      id: `${id}-req`,
      card: id,
      aspect:
        subject === "Climate"
          ? "ecology"
          : subject === "Society"
            ? "social"
            : subject.toLowerCase(),
      quantity: kind === "Capstone" ? 5 : 3,
      text: "Provisional: count World + your National aspects only.",
      prompt:
        kind === "Capstone"
          ? "Write distinct capstone special rule; construction schedules round-end completion."
          : "Decide whether prerequisites must remain satisfied.",
    });
});
cards.push({
  id: "open-horizon",
  kind: "Breakthrough",
  scope: "",
  subject: "",
  tier: "",
  prompt:
    "Explore how collective ownership changes access to automated research.",
  title: "",
  statement: "",
  illustration: "",
  status: "prompt",
  mode: "unresolved",
  activation: "",
  provenance: "Unfinished content",
});
cards.push({
  id: "ocean-partial",
  kind: "Project",
  scope: "World",
  subject: "climate",
  tier: 3,
  prompt: "Explore responsible ocean restoration.",
  title: "An ocean in recovery",
  statement: "",
  illustration: "",
  status: "partial",
  mode: "Yes/No",
  activation: "",
  provenance: "Unfinished content",
});
// Refine generic authoring scaffolds into distinct, explicitly provisional responses.
const responses = {
  "driverless-A":
    "Open roads to autonomous fleets; improve material access while paid driving work contracts.",
  "driverless-B":
    "Require accountable human operators and preserve trusted access to transport.",
  "admin-ai-A":
    "Fund public services as routine administrative jobs disappear.",
  "admin-ai-B":
    "Expand research without a transition program; output rises while work and energy systems face strain.",
  "robot-care-A":
    "Keep trained carers responsible for each care plan and use robots as assistants.",
  "robot-care-B":
    "Offer automated care widely, with fewer paid care roles and broader basic access.",
  "platform-A": "Guarantee essential access through public regulation.",
  "platform-B":
    "Allow private platforms to expand; material output grows without a public access guarantee.",
  "cooling-A": "Coordinate shaded streets and reflective roofs across cities.",
  "cooling-B":
    "Support neighborhood cooling experiments and local care networks.",
  "learning-A":
    "Open public learning to everyone, whether or not they hold paid work.",
  "learning-B":
    "Protect specialist training and support income from scarce skills.",
};
resolutions.forEach(
  (r) =>
    (r.text =
      responses[r.id] ??
      `${r.label}. ${cards.find((c) => c.id === r.card).statement}`),
);
const revised = {
  "driverless-A": [
    ["employment", 1],
    ["wealth", -1],
  ],
  "driverless-B": [["welfare", -1]],
  "admin-ai-A": [
    ["employment", -1],
    ["welfare", 1],
  ],
  "admin-ai-B": [
    ["employment", -2],
    ["wealth", 2],
    ["energy", -1],
  ],
  "robot-care-A": [["welfare", -1]],
  "robot-care-B": [
    ["employment", 1],
    ["welfare", -1],
  ],
  "fusion-enact": [["energy", -2]],
  "ubi-enact": [["employment", -2]],
  "loneliness-enact": [["welfare", 1]],
  "fossil-enact": [["energy", 1]],
  "dna-enact": [["welfare", 1]],
  "repair-enact": [["wealth", -1]],
  "platform-A": [["welfare", 1]],
  "platform-B": [["wealth", 2]],
  "wetlands-enact": [["climate", 1]],
  "grid-enact": [["energy", -1]],
  "cooling-A": [["climate", -1]],
  "cooling-B": [["welfare", 1]],
  "learning-A": [["welfare", -1]],
  "learning-B": [["employment", -1]],
  "energy-enact": [["energy", -1]],
  "orbital-enact": [["wealth", 2]],
  "civic-enact": [["welfare", 2]],
  "circular-enact": [["energy", 1]],
  "restoration-enact": [["climate", -1]],
};
effects = effects.flatMap((e) =>
  revised[e.id]
    ? revised[e.id].map(([scale, value], i) => ({
        ...e,
        id: `${e.id}-${i}`,
        scale,
        value,
        side:
          e.target === "national limit"
            ? e.card === "wetlands"
              ? "upper"
              : "lower"
            : "",
        text:
          e.target === "national limit"
            ? `${scale[0].toUpperCase() + scale.slice(1)} ${e.card === "wetlands" ? "upper" : "lower"} limit ${value > 0 ? "+" : ""}${value}${e.timing === "ongoing" ? " while active" : ""} · illustrative.`
            : `World ${scale} ${value > 0 ? "+" : ""}${value} · illustrative.`,
      }))
    : e,
);
weights = weights.map((w) =>
  w.outcome === "B"
    ? {
        ...w,
        aspect:
          w.card === "driverless"
            ? "governance"
            : w.card === "robot-care"
              ? "technology"
              : w.card === "learning"
                ? "economy"
                : w.aspect,
        quantity: 1,
      }
    : w,
);
cards.find((c) => c.id === "commons").tier = 1;
const capstonePrompts = {
  orbital:
    "Special-rule prompt: define off-world resource access and who benefits.",
  civic: "Special-rule prompt: define shared care obligations across nations.",
  circular:
    "Special-rule prompt: define how material recovery changes ongoing consumption.",
  restoration:
    "Special-rule prompt: define cross-border habitat protection and Climate tolerance.",
};
requirements.forEach((r) => {
  if (capstonePrompts[r.card])
    r.prompt =
      capstonePrompts[r.card] + " Construction schedules round-end completion.";
});
for (const [name, rows] of Object.entries({
  cards,
  resolutions,
  effects,
  "card-aspects": weights,
  "voting-aspects": voting,
  expiry,
  requirements,
  illustrations,
}))
  write(name, rows);
write(
  "scales",
  ["Employment", "Welfare", "Wealth", "Energy", "Climate"].map((label, i) => ({
    id: label.toLowerCase(),
    label,
    meaning: [
      "Livelihoods from selling skills and services",
      "Well-being and public support",
      "Shared material wealth",
      "Available energy",
      "Dangerous cold to dangerous heat",
    ][i],
    min: 0,
    max: 12,
    value: [5, 7, 6, 8, 8][i],
    prompt: "Illustrative range/value; exact thresholds remain unresolved.",
  })),
);
write(
  "nations",
  ["A", "B", "C", "D", "E"].map((id, i) => ({
    id,
    label: `Nation ${id}`,
    symbol: ["●", "▲", "■", "◆", "✚"][i],
    color: ["sky", "coral", "leaf", "ochre", "violet"][i],
    prompt:
      "Choose a real nation and define its starting bonus; no trait is approved.",
  })),
);
write(
  "goals",
  [
    [
      "resilience",
      "Resilience through care",
      "Reward final Welfare and protective national adaptations. Exact scoring equation remains open.",
    ],
    [
      "edge",
      "At the edge",
      "Reward a surviving world close to collapse. Exact distance and scoring formula remain open.",
    ],
    [
      "abundance",
      "Shared abundance",
      "Reward final Wealth and public infrastructure. Write the scoring formula.",
    ],
    [
      "steward",
      "Long stewardship",
      "Reward stable Climate and ecology aspects. Write the scoring formula.",
    ],
    [
      "anarchist",
      "The Anarchist",
      "Win only through destabilization; ordinary nation actions, no special powers.",
    ],
  ].map(([id, title, prompt]) => ({ id, title, prompt, status: "partial" })),
);
write("ballots", [
  {
    id: "choice",
    label: "A / B / Abstain",
    prompt: "Reveal simultaneously and declare reusable eligible strength.",
  },
  {
    id: "enactment",
    label: "Yes / No / Abstain",
    prompt:
      "World Projects and Policies enact one effect or are discarded without it.",
  },
]);
write(
  "limits",
  ["A", "B", "C", "D", "E"].flatMap((nation, i) =>
    ["employment", "welfare", "wealth", "energy", "climate"].flatMap(
      (scale, j) => [
        {
          id: `${nation}-${scale}-lower`,
          nation,
          scale,
          side: "lower",
          value: 1 + ((i + j) % 4),
          provenance: "Illustrative fixture; Climate sides provisional",
        },
        ...(scale === "climate"
          ? [
              {
                id: `${nation}-${scale}-upper`,
                nation,
                scale,
                side: "upper",
                value: 9 + (i % 3),
                provenance: "Illustrative fixture; Climate sides provisional",
              },
            ]
          : []),
      ],
    ),
  ),
);
