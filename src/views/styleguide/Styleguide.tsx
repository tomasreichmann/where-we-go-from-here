import { content as db, models, getCard } from "../../content";
import {
  Aspect,
  Ballot,
  BoardRegion,
  Card,
  DesignQuestion,
  EffectRow,
  GoalCard,
  IllustrationFrame,
  NationCard,
  OrientedCard,
  Prompt,
  RequirementRow,
  Scale,
  StatusBadge,
  VoteStrength,
} from "../../components/Pieces";
import { Board } from "../../components/board/Board";
import {
  fanLayout,
  deckLayout,
  stackLayout,
  flexLayout,
} from "../../lib/board/boardLayout";
import { normalizeItemInput } from "../../lib/board/boardController";
import { RuleFigure } from "../rules/Rules";
const definitions = [
  [
    "Prompt placeholder",
    "Use when prose or art is not authored. Always expose its writing prompt.",
    "Inline / prose / illustration",
  ],
  [
    "Status badge",
    "Use when describing authoring state; never treat a missing field as complete.",
    "Prompt / partial / defined / illustrative",
  ],
  [
    "Aspect symbol",
    "Use for persistent influence, independently from a deck subject.",
    "Six provisional types / weighted quantities",
  ],
  [
    "Effect row",
    "Use for descriptive changes, not evaluated mechanics.",
    "Immediate / ongoing / world value / national limit / rule",
  ],
  [
    "Requirement row",
    "Use for project prerequisites and capstone special-rule prompts.",
    "Structured count / prose / unresolved",
  ],
  [
    "Illustration frame",
    "Use for an asset or its mandatory illustration prompt.",
    "Prompt / asset",
  ],
  [
    "Design question",
    "Use in development annotations close to the affected rule.",
    "Question / reasoning / TODO",
  ],
  [
    "Card frame",
    "Use for every source-backed card in readable or fitted views.",
    "Full / compact / prompt / partial / long content",
  ],
  [
    "Event card",
    "Use for unresolved landscape A/B events and selected outcomes.",
    "Breakthrough / crisis / A left / B right",
  ],
  [
    "Project & policy",
    "Use for one enacted effect; World versions use Yes/No.",
    "National / World / ongoing / non-expiring",
  ],
  [
    "Capstone",
    "Use for final projects that schedule round-end completion.",
    "Proposed prerequisites / special-rule prompt",
  ],
  [
    "Nation",
    "Use for public identity and unassigned starting bonuses.",
    "Five symbol + color identities / prompt",
  ],
  [
    "Secret goal",
    "Use for end-board scoring prompts; exposed only for designer inspection here.",
    "Ordinary / near-collapse / Anarchist",
  ],
  [
    "Ballot & vote strength",
    "Use to illustrate valid ballot options and reusable influence.",
    "A/B/Abstain / Yes/No/Abstain / weighted / minimum one",
  ],
  [
    "Shared scale",
    "Use for shared world state with five attributable national limits.",
    "Low danger / two-sided provisional Climate / overlapping limits",
  ],
  [
    "Tier & expiry",
    "Use for independent subject progression and absolute expiry.",
    "Tier / permanent / multi-subject any/all unresolved",
  ],
  [
    "Board & regions",
    "Use to compose the same canonical pieces in fitted static surfaces.",
    "Overview / rule figure / fan / deck / stack / flex / discard",
  ],
  [
    "World & nation tableau",
    "Use to expose selected effects, aspects, limits and expiry.",
    "World issues / active crises / five National tableaus",
  ],
  [
    "Rule section & readiness",
    "Use for current player prose and collected authoring gaps.",
    "Player placeholder / development note / local TODO / category counts",
  ],
];
export function Styleguide() {
  return (
    <div className="document">
      <div className="page-heading">
        <span className="eyebrow">COMPONENT FIELD GUIDE</span>
        <h1>A language for possible futures.</h1>
        <p>
          Warm surfaces, clear structure and botanical accents. Color
          identifies; labels and symbols carry meaning.
        </p>
      </div>
      <section>
        <h2>01 / Semantic foundations</h2>
        <div className="swatches">
          {[
            "surface",
            "background",
            "ink",
            "muted",
            "border",
            "accent",
            "danger",
            "warning",
            "success",
          ].map((t) => (
            <div key={t}>
              <i style={{ background: `var(--${t})` }} />
              <b>{t}</b>
            </div>
          ))}
        </div>
        <div className="type-sample">
          <h1>Shared futures.</h1>
          <p>
            System sans for readable prose. Georgia for editorial headings.
            Tabular numerals for world state.
          </p>
          <span className="eyebrow">
            SMALL LABEL / CONTEXT, NEVER BODY COPY
          </span>
        </div>
      </section>
      <section>
        <h2>02 / Component index</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Use when</th>
                <th>Variants & states</th>
              </tr>
            </thead>
            <tbody>
              {definitions.map(([name, use, variants]) => (
                <tr key={name}>
                  <th>{name}</th>
                  <td>{use}</td>
                  <td>{variants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2>03 / Primitives</h2>
        <div className="demo-grid">
          <div>
            <StatusBadge>Prompt</StatusBadge> <StatusBadge>Partial</StatusBadge>{" "}
            <StatusBadge>Defined · provisional</StatusBadge>
            <Prompt>Describe how this response protects a community.</Prompt>
            {db.aspects.map((a) => (
              <Aspect key={a.id} aspect={a} quantity="2" />
            ))}
          </div>
          <div>
            <EffectRow effect={db.effects[0]} />
            <RequirementRow requirement={db.requirements[0]} />
            <DesignQuestion>
              Does this requirement need to remain satisfied?
            </DesignQuestion>
          </div>
          <IllustrationFrame card={getCard("wetlands")} />
        </div>
      </section>
      <section>
        <h2>04 / Authored, unfinished and stressed</h2>
        <p>
          Readable cards use intrinsic height; the fitted board scales canonical
          components as a whole.
        </p>
        <div className="card-grid">
          {[
            "open-horizon",
            "ocean-partial",
            "driverless",
            "heat",
            "commons",
            "repair",
            "orbital",
          ].map((id) => (
            <Card key={id} card={getCard(id)} />
          ))}
          <Card
            card={{
              ...getCard("learning"),
              id: "styleguide-long-prose",
              statement:
                "A deliberately long editorial example: " +
                getCard("learning").statement.repeat(5),
              prompt: "Stress case derived from learning; not a source record.",
            }}
          />
        </div>
      </section>
      <section>
        <h2>05 / Outcomes and orientation</h2>
        <p>
          Unselected A/B events are landscape. A turns left 90°; B turns right
          90°. The active strip counter-rotates into reading position and
          conceals the inactive resolution.
        </p>
        <div className="landscape-demo">
          <Card card={getCard("driverless")} />
        </div>
        <div className="rotation-demos">
          <div>
            <h3>A selected · −90°</h3>
            <OrientedCard card={getCard("driverless")} selected="A" />
          </div>
          <div>
            <h3>B selected · +90°</h3>
            <OrientedCard card={getCard("driverless")} selected="B" />
          </div>
          <Card card={getCard("fusion")} selected="enact" />
        </div>
      </section>
      <section>
        <h2>06 / Nations, goals and influence</h2>
        <div className="demo-grid">
          <NationCard nation={db.nations[0]} />
          <GoalCard goal={db.goals[1]} />
          <div>
            {db.ballots.map((b) => (
              <Ballot key={b.id} ballot={b} />
            ))}
            <VoteStrength
              cards={["driverless", "cooperative"].map(getCard)}
              eligible={["technology", "economy"]}
            />
            <VoteStrength cards={[]} eligible={["ecology"]} />
          </div>
        </div>
      </section>
      <section>
        <h2>07 / Shared tracks</h2>
        <div className="scale-demos">
          {models.scales.map((s) => (
            <Scale key={s.id} scale={s} />
          ))}
        </div>
      </section>
      <section>
        <h2>08 / Static layout vocabulary</h2>
        <p>
          Fan and deck layouts are for hidden or non-active material. Active
          tableau cards use exposed, non-overlapping strips.
        </p>
        <div className="demo-grid">
          {[fanLayout, deckLayout, stackLayout, flexLayout].map((layout, i) => {
            const result = layout(
              ["A", "B", "C"].map((id) => ({ id, width: 160, height: 210 })),
            );
            return (
              <BoardRegion key={i} title={["Fan", "Deck", "Stack", "Flex"][i]}>
                <Board
                  className="layout-demo"
                  items={result.placements.map((p) =>
                    normalizeItemInput({ ...p, kind: "card" }, p.id),
                  )}
                  label={`${["Fan", "Deck", "Stack", "Flex"][i]} layout example`}
                  renderItem={(item) => (
                    <div className="card-back">
                      ◈<b>SECRET GOAL</b>
                      <span>{item.id} · designer sample</span>
                    </div>
                  )}
                />
              </BoardRegion>
            );
          })}
        </div>
        <RuleFigure
          ids={["ubi", "wetlands"]}
          label="Shared Board / rule section example"
        />
      </section>
    </div>
  );
}
