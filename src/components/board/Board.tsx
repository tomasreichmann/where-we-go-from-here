// Static-only adaptation of mighty-decks-ai-storyteller's Board / StaticBoardFigure.
// Retains canonical item rendering, center rotation and viewport fitting; omits interaction.
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  combineBounds,
  fitBoundsToFrame,
  getItemBounds,
  type BoardItemRecord,
} from "../../lib/board/boardController";
export function Board({
  items,
  renderItem,
  label,
  className = "",
}: {
  items: BoardItemRecord[];
  renderItem: (item: BoardItemRecord) => ReactNode;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const bounds = combineBounds(items.map(getItemBounds)) ?? {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };
  const view = fitBoundsToFrame({
    bounds,
    frameSize: size,
    padding: 8,
    minZoom: 0.01,
    maxZoom: 2,
  });
  return (
    <div
      ref={ref}
      className={`board-frame ${className}`}
      role="region"
      aria-label={label}
    >
      <div
        className="board-canvas"
        style={{
          transform: `translate(${-view.x * view.zoom}px,${-view.y * view.zoom}px) scale(${view.zoom})`,
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            data-board-item={item.id}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              width: item.width,
              height: item.height,
              zIndex: item.zIndex,
              transform: `rotate(${item.rotation ?? 0}deg)`,
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
export const StaticBoardFigure = Board;
