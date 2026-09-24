import { content as db, models, getCard } from "../../content";
import { tables } from "../../content/loader";
import {
  Ballot,
  Card,
  GoalCard,
  NationCard,
  Prompt,
  StatusBadge,
} from "../../components/Pieces";
export function Catalogs() {
  return (
    <div className="document">
      <div className="page-heading">
        <span className="eyebrow">THE CONTENT LIBRARY</span>
        <h1>Possibilities, in print.</h1>
        <p>
          All records come from editable CSV sources. Authored examples are
          provisional; an empty field stays a writing prompt.
        </p>
      </div>
      <nav className="anchor-nav" aria-label="Catalog sections">
        {[
          "Breakthrough",
          "Crisis",
          "Project",
          "Policy",
          "Capstone",
          "Nations",
          "Goals",
          "Ballots",
          "Source tables",
        ].map((t) => (
          <a href={`#catalog-${t.replace(" ", "-")}`} key={t}>
            {t}
          </a>
        ))}
      </nav>
      {["Breakthrough", "Crisis", "Project", "Policy", "Capstone"].map(
        (kind) => (
          <section
            className="catalog-section"
            id={`catalog-${kind}`}
            key={kind}
          >
            <div className="section-title">
              <h2>{kind}s</h2>
              <StatusBadge>
                {db.cards.filter((c) => c.kind === kind).length} records
              </StatusBadge>
            </div>
            <div className="card-grid">
              {models.cards
                .filter((c) => c.kind === kind)
                .map((c) => (
                  <Card key={c.id} card={c} />
                ))}
            </div>
          </section>
        ),
      )}
      <section id="catalog-Nations">
        <h2>Nations / identities to be chosen</h2>
        <div className="card-grid">
          {db.nations.map((n) => (
            <NationCard key={n.id} nation={n} />
          ))}
        </div>
      </section>
      <section id="catalog-Goals">
        <h2>Secret goals / scoring in progress</h2>
        <div className="card-grid">
          {db.goals.map((g) => (
            <GoalCard key={g.id} goal={g} />
          ))}
        </div>
      </section>
      <section id="catalog-Ballots">
        <h2>Ballots</h2>
        <div className="card-grid">
          {db.ballots.map((b) => (
            <Ballot key={b.id} ballot={b} />
          ))}
        </div>
      </section>
      <section id="catalog-Source-tables">
        <h2>All source tables</h2>
        <p>
          Stable IDs connect these records. Missing prose and open questions
          remain explicit.
        </p>
        {tables.map((name) => (
          <details key={name}>
            <summary>
              {name}.csv <span>{db[name].length} records</span>
            </summary>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    {Object.keys(db[name][0] ?? {}).map((k) => (
                      <th key={k}>{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {db[name].map((r) => (
                    <tr key={r.id}>
                      {Object.entries(r).map(([k, v]) => (
                        <td key={k}>
                          {v || <span className="muted">Not authored</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ))}
      </section>
      <Prompt>
        Open questions about taxonomy, scoring, expiry and special rules are
        collected beside their current rules in Living rules.
      </Prompt>
    </div>
  );
}
