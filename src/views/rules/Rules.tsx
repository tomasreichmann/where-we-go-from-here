import { useState } from "react";
import { rules } from "../../rules";
import { content as db, models, getCard } from "../../content";
import { readiness } from "../../content/loader";
import { registry } from "../registry";
import { Card, DesignQuestion, Prompt } from "../../components/Pieces";
import { StaticBoardFigure } from "../../components/board/Board";
import { normalizeItemInput } from "../../lib/board/boardController";
export function RuleFigure({ ids, label }: { ids: string[]; label: string }) {
  return (
    <figure>
      <StaticBoardFigure
        className="rule-figure"
        label={label}
        items={ids.map((id, i) =>
          normalizeItemInput(
            {
              id,
              kind: "card",
              x: ids
                .slice(0, i)
                .reduce(
                  (sum, key) => sum + (getCard(key).mode === "A/B" ? 660 : 340),
                  0,
                ),
              y: 0,
              width: getCard(id).mode === "A/B" ? 640 : 320,
              height: 650,
            },
            id,
          ),
        )}
        renderItem={(item) => <Card card={getCard(item.id)} />}
      />
      <figcaption>
        {label} · Provisional examples; numeric values illustrative.
      </figcaption>
    </figure>
  );
}
export function Rules() {
  const [notes, setNotes] = useState(false);
  const counts = readiness(db);
  return (
    <div className="document rules-document">
      <div className="page-heading">
        <span className="eyebrow">LIVING RULEBOOK / DRAFT 01</span>
        <h1>How we get there.</h1>
        <p>
          A competitive game with a shared survival requirement. These are the
          current rules; unfinished player rules remain visible.
        </p>
        {import.meta.env.DEV && (
          <label className="notes-toggle">
            <input
              type="checkbox"
              checked={notes}
              onChange={(e) => setNotes(e.target.checked)}
            />{" "}
            Show design notes
          </label>
        )}
      </div>
      <div className="rule-layout">
        <nav className="rule-toc" aria-label="Rule sections">
          {rules.map((r, i) => (
            <a href={`#rule-${r.id}`} key={r.id}>
              <span>0{i + 1}</span>
              {r.title}
            </a>
          ))}
          <a href="#readiness">Readiness</a>
        </nav>
        <div>
          {rules.map((r, i) => (
            <section className="rule-section" id={`rule-${r.id}`} key={r.id}>
              <span className="eyebrow">
                0{i + 1} / {r.id.toUpperCase()}
              </span>
              <h2>{r.title}</h2>
              <p>{r.prose}</p>
              {r.placeholder && <Prompt>{r.placeholder}</Prompt>}
              {r.example && (
                <RuleFigure
                  ids={r.example}
                  label={
                    r.id === "refill"
                      ? "Refill chain: National crisis → World crisis → non-crisis choice; continue to two choices"
                      : r.title
                  }
                />
              )}{" "}
              {import.meta.env.DEV && notes && (
                <div data-dev-note>
                  <DesignQuestion>{r.notes.questions.join(" ")}</DesignQuestion>
                  <p className="dev-reason">Reasoning: {r.notes.reason}</p>
                  <p>TODO: {r.notes.todo}</p>
                </div>
              )}
            </section>
          ))}
          <section id="readiness">
            <span className="eyebrow">CONTENT READINESS</span>
            <h2>What still needs definition.</h2>
            <p>
              Counts describe authored content, not balance or a completion
              percentage.
            </p>
            <div className="readiness-grid">
              {Object.entries({
                ...counts,
                unfinishedPlayerRules: rules.filter((r) => r.placeholder)
                  .length,
                ...(import.meta.env.DEV && notes
                  ? {
                      rulesWithQuestions: rules.filter(
                        (r) => r.notes.questions.length,
                      ).length,
                      viewTasks: registry.flatMap((v) => v.todos).length,
                    }
                  : {}),
              }).map(([key, count]) => (
                <div key={key}>
                  <b>{count}</b>
                  <span>{key.replace(/([A-Z])/g, " $1")}</span>
                </div>
              ))}
            </div>
            {import.meta.env.DEV && notes && (
              <div data-dev-note>
                {registry.map((view) => (
                  <div key={view.id} className="view-readiness">
                    <h3>{view.title}</h3>
                    <ul>
                      {view.todos.map((todo) => (
                        <li key={todo.id}>
                          {todo.id} — {todo.text}
                        </li>
                      ))}
                    </ul>
                    <small>
                      Linked rule questions: {view.questions.join(", ")}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
