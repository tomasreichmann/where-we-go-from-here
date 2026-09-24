import { content as db, models, getCard } from "../../content";
import { Board } from "../../components/board/Board";
import {
  Ballot,
  BoardRegion,
  Card,
  GoalCard,
  Scale,
  nationStyle,
} from "../../components/Pieces";
import { fixture } from "./board-overview.fixture";
import { normalizeItemInput } from "../../lib/board/boardController";
const items = [
  normalizeItemInput(
    { id: "table", kind: "card", x: 0, y: 0, width: 1500, height: 830 },
    "table",
  ),
];
export function BoardOverview() {
  return (
    <div className="overview">
      <div className="overview-heading">
        <div>
          <span className="eyebrow">THE SHARED FUTURE / DESIGNER OVERVIEW</span>
          <h1>Everything is connected.</h1>
        </div>
        <div className="fixture-tag">
          <i /> Late game · 5 nations · Round {fixture.round}
          <small>Reviews pending · all numeric values illustrative</small>
        </div>
      </div>
      <Board
        items={items}
        label="Complete five-nation late-game designer table"
        renderItem={() => (
          <div className="table-composition">
            <div className="world-top">
              <BoardRegion
                title="01 / The state of the world"
                detail="One nation's collapse affects everyone"
                className="tracks-region"
              >
                <div className="scales">
                  {models.scales.map((s) => (
                    <Scale key={s.id} scale={s} />
                  ))}
                </div>
              </BoardRegion>
              <BoardRegion
                title="Pressure on the world"
                detail="ACTIVE ON REVEAL"
                className="pressure-region"
              >
                <Card card={getCard("heat")} selected="enact" compact />
              </BoardRegion>
            </div>
            <div className="world-middle">
              <BoardRegion
                title="02 / Possible futures"
                detail="Two non-crisis choices per subject · taxonomy provisional"
                className="decks-region"
              >
                <div className="subject-decks">
                  {db.subjects.map((s, i) => (
                    <div className={`subject-deck ${s.color}`} key={s.id}>
                      <header>
                        <b>
                          {s.icon} {s.label}
                        </b>
                        <span>Tier {fixture.tiers[i]}</span>
                      </header>
                      <div className="deck-choices">
                        {fixture.decks[i].map((id) => (
                          <Card key={id} card={getCard(id)} preview />
                        ))}
                      </div>
                      <div className="deck-base">
                        ▱ Ordered draw deck · capstone last
                      </div>
                    </div>
                  ))}
                </div>
              </BoardRegion>
              <BoardRegion title="World issues" detail="PERSISTENT">
                <div className="world-issues">
                  {fixture.world.map((id) => (
                    <Card
                      key={id}
                      card={getCard(id)}
                      selected={id === "admin-ai" ? "B" : "enact"}
                      compact
                    />
                  ))}
                </div>
              </BoardRegion>
            </div>
            <BoardRegion
              title="03 / Five ways to adapt"
              detail="Nations and bonuses unassigned · secret material exposed for design inspection"
              className="nations-region"
            >
              <div className="nation-tableaus">
                {db.nations.map((n, i) => (
                  <section
                    className="nation-tableau"
                    key={n.id}
                    style={nationStyle(n)}
                  >
                    <header>
                      <h3>
                        {n.symbol} {n.label}
                      </h3>
                      <span>IDENTITY PROMPT</span>
                    </header>
                    <p className="nation-prompt">
                      Choose real nation + starting bonus.
                    </p>
                    <div className="tableau-cards">
                      {fixture.nations[i].map((id, j) => (
                        <Card
                          key={`${id}-${j}`}
                          card={getCard(id)}
                          selected={
                            getCard(id).mode === "A/B"
                              ? i % 2
                                ? "B"
                                : "A"
                              : "enact"
                          }
                          compact
                        />
                      ))}
                    </div>
                    <div className="nation-private">
                      <GoalCard
                        goal={db.goals.find((g) => g.id === fixture.goals[i])!}
                        compact
                      />
                      <div className="mini-ballot">
                        ▤ A · B · Yes · No · Abstain
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </BoardRegion>
            <div className="table-bottom">
              <span>
                ● A &nbsp; ▲ B &nbsp; ■ C &nbsp; ◆ D &nbsp; ✚ E &nbsp; National
                limits on every scale
              </span>
              <span>
                ↻ REVIEW: finish event → vote with all matching aspects → remove
                outgoing cards
              </span>
              <span className="discard">
                ▱ Discard / resolved crises · illustrative stack
              </span>
            </div>
          </div>
        )}
      />
      <footer className="overview-footer">
        <span>READ THE TABLE, EXPLORE THE DETAILS</span>
        <span>
          Full cards in Content catalog ↗ &nbsp; · &nbsp; Rules and unresolved
          decisions in Living rules ↗
        </span>
      </footer>
    </div>
  );
}
