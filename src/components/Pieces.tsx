import type { CSSProperties, ReactNode } from "react";
import type { CardDisplay, ScaleDisplay } from "../content/models";
import type { Row } from "../content/loader";
export function StatusBadge({ children }: { children: ReactNode }) {
  return <span className="status">{children}</span>;
}
export function Prompt({ children }: { children: ReactNode }) {
  return (
    <p className="prompt">
      <span>WRITING PROMPT</span>
      {children}
    </p>
  );
}
export function Aspect({
  aspect: a,
  quantity = "1",
}: {
  aspect: Row;
  quantity?: string;
}) {
  return (
    <span className={`aspect ${a?.color}`}>
      <b>{a?.icon}</b> {a.label} ×{quantity}
    </span>
  );
}
export function EffectRow({ effect }: { effect: Row }) {
  return (
    <div className="effect">
      <span>{effect.timing === "ongoing" ? "↻" : "↗"}</span>
      <span>{effect.text || effect.prompt}</span>
    </div>
  );
}
export function RequirementRow({ requirement: r }: { requirement: Row }) {
  return (
    <div className="requirement">
      ◇ Proposed prerequisite: {r.quantity} {r.aspect}. {r.text}
      <small>{r.prompt}</small>
    </div>
  );
}
export function IllustrationFrame({ card }: { card: CardDisplay }) {
  const art = card.illustrationData;
  return art?.asset ? (
    <img className="illustration" src={art.asset} alt={art.prompt} />
  ) : (
    <div className={`illustration ${card.subject}`}>
      <span className="art-symbol" aria-hidden="true">
        {card.subjectData?.icon ?? "◇"}
      </span>
      <span>ILLUSTRATION PROMPT</span>
      <p>{art?.prompt ?? `Illustrate: ${card.prompt}`}</p>
    </div>
  );
}
export function Card({
  card,
  selected,
  compact = false,
  preview = false,
}: {
  card: CardDisplay;
  selected?: string;
  compact?: boolean;
  preview?: boolean;
}) {
  const outcomes = card.resolutions.filter(
    (r) => !selected || r.key === selected,
  );
  if (preview)
    return (
      <article
        className={`game-card card-preview ${card.subject}`}
        data-card={card.id}
      >
        <small>
          {card.kind} · T{card.tier}
        </small>
        <h3>{card.title || "Unwritten possibility"}</h3>
        <span>
          {card.mode === "A/B" ? "A ↶ / ↷ B" : "Single enacted effect"}
        </span>
      </article>
    );
  return (
    <article
      className={`game-card ${compact ? "compact" : ""} ${!compact && card.mode === "A/B" && !selected ? "landscape" : ""} ${card.subject} ${card.kind === "Crisis" ? "crisis" : ""}`}
      data-card={card.id}
      data-selected={selected}
      data-rotation={selected === "A" ? -90 : selected === "B" ? 90 : 0}
    >
      <div className="card-kicker">
        <span>
          {card.scope || "Scope prompt"} · {card.kind}
        </span>
        <span>{card.tier ? `T${card.tier}` : "Tier ?"}</span>
      </div>
      <h3>{card.title || "An unwritten possibility"}</h3>
      {!compact && (
        <>
          <IllustrationFrame card={card} />
          {card.statement ? (
            <p className="statement">{card.statement}</p>
          ) : (
            <Prompt>{card.prompt} Write the statement.</Prompt>
          )}
        </>
      )}
      {card.activation === "reveal" && (
        <div className="crisis-label">! Activates immediately on reveal</div>
      )}
      {outcomes.length ? (
        outcomes.map((r) => (
          <section className="outcome" key={r.id}>
            <strong>
              {r.key === "enact" ? "→" : r.key === "A" ? "A ↶" : "B ↷"} ·{" "}
              {r.label || "Outcome prompt"}
            </strong>
            {!compact &&
              (r.text ? <p>{r.text}</p> : <Prompt>{r.prompt}</Prompt>)}
            <div className="aspects">
              {r.aspects.map((a) => (
                <Aspect
                  key={a.id}
                  aspect={a.definition}
                  quantity={a.quantity}
                />
              ))}
            </div>
            {r.effects.map((e) => (
              <EffectRow key={e.id} effect={e} />
            ))}
          </section>
        ))
      ) : (
        <Prompt>{card.prompt} Write the outcomes and effects.</Prompt>
      )}
      {card.requirements.map((r) => (
        <RequirementRow key={r.id} requirement={r} />
      ))}
      <div className="card-footer">
        <span>{expiryLabel(card.expiry)}</span>
        <span>
          {card.id} · {card.status}
        </span>
      </div>
      {!compact && (
        <>
          <div className="eligible">
            Voting:{" "}
            {card.voting.map((v) => v.aspect).join(" + ") ||
              "National decision / not yet specified"}
          </div>
          <small className="provenance">
            {card.provenance || "Provisional content"}
          </small>
        </>
      )}
    </article>
  );
}
export function expiryLabel(rows: Row[]) {
  return rows.some((e) => e.permanent === "true")
    ? "∞ Does not expire"
    : rows.length
      ? `Expires ${rows.map((e) => `${e.subject} T${e.tier}`).join(" / ")}${rows.length > 1 ? " · any/all open" : ""}`
      : "Expiry prompt: define duration";
}
// Canonical unresolved A/B card is landscape. Counter-rotate the active strip so
// rotating the whole card left for A / right for B yields upright selected text.
export function OrientedCard({
  card,
  selected,
}: {
  card: CardDisplay;
  selected: "A" | "B";
}) {
  return (
    <div
      className="oriented-shell"
      data-orientation={selected === "A" ? -90 : 90}
      style={{ transform: `rotate(${selected === "A" ? -90 : 90}deg)` }}
    >
      <div
        className="orientation-content"
        style={{ transform: `rotate(${selected === "A" ? 90 : -90}deg)` }}
      >
        <Card card={card} selected={selected} compact />
      </div>
    </div>
  );
}
export function BoardRegion({
  title,
  detail,
  children,
  className = "",
}: {
  title: string;
  detail?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`region ${className}`}>
      <div className="region-heading">
        <h2>{title}</h2>
        {detail && <span>{detail}</span>}
      </div>
      {children}
    </section>
  );
}
export function Scale({ scale }: { scale: ScaleDisplay }) {
  const limits = scale.limits;
  return (
    <div className="scale">
      <div className="scale-title">
        <b>{scale.label}</b>
        <span>
          {scale.value}
          <small> / {scale.max}</small>
        </span>
      </div>
      <div className="track">
        <div
          className="track-fill"
          style={{
            width: `${(Number(scale.value) / Number(scale.max)) * 100}%`,
          }}
        />
        <i
          className="world-value"
          style={{ left: `${(Number(scale.value) / 12) * 100}%` }}
        >
          ◆
        </i>
        {Array.from({ length: 13 }, (_, i) => (
          <span className="tick" style={{ left: `${(i / 12) * 100}%` }} key={i}>
            {i}
          </span>
        ))}
      </div>
      <div className="limit-lanes">
        {scale.nations.map((n) => (
          <div key={n.id} className="limit-lane">
            {limits
              .filter((l) => l.nation === n.id)
              .map((l) => (
                <span
                  key={l.id}
                  title={`${n.label}: ${l.side} limit ${l.value} — ${l.provenance}`}
                  className={`limit-marker ${n.color}`}
                  style={{ left: `${(Number(l.value) / 12) * 100}%` }}
                >
                  {n.symbol}
                  {n.id}
                  {l.side === "upper" ? "↓" : "↑"}
                </span>
              ))}
          </div>
        ))}
      </div>
      <small>
        {scale.id === "climate"
          ? "Cold ← safe middle → heat · two sides provisional"
          : "Low values dangerous · limits A–E above"}
      </small>
    </div>
  );
}
export function VoteStrength({
  cards,
  eligible,
}: {
  cards: CardDisplay[];
  eligible: string[];
}) {
  const matching = cards
    .flatMap((c) =>
      c.resolutions
        .filter((r) => r.key === "A" || r.key === "enact")
        .flatMap((r) => r.aspects),
    )
    .filter((a) => eligible.includes(a.aspect));
  const votes = Math.max(
    1,
    matching.reduce((sum, a) => sum + Number(a.quantity), 0),
  );
  return (
    <div className="vote-strength">
      <b>{votes}</b> reusable votes{" "}
      <small>
        Eligible: {eligible.join(" + ")} · minimum 1 · illustrative A/enacted
        fixture
      </small>
    </div>
  );
}
export function NationCard({ nation }: { nation: Row }) {
  return (
    <div className={`nation-card ${nation.color}`}>
      <b>
        {nation.symbol} {nation.label}
      </b>
      <Prompt>{nation.prompt}</Prompt>
    </div>
  );
}
export function GoalCard({
  goal,
  compact = false,
}: {
  goal: Row;
  compact?: boolean;
}) {
  return (
    <div className="goal-card">
      <span>◈ SECRET GOAL · shown for inspection</span>
      <b>{goal.title}</b>
      {!compact && <Prompt>{goal.prompt}</Prompt>}
    </div>
  );
}
export function Ballot({ ballot }: { ballot: Row }) {
  return (
    <div className="ballot">
      <span>▤ BALLOT · inspection only</span>
      <b>{ballot.label}</b>
      <small>{ballot.prompt}</small>
    </div>
  );
}
export function DesignQuestion({ children }: { children: ReactNode }) {
  return (
    <aside className="design-note">
      <b>Open design question</b>
      <p>{children}</p>
    </aside>
  );
}
export const nationStyle = (nation: Row) =>
  ({ "--nation-color": `var(--${nation.color})` }) as CSSProperties;
