"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { Icon } from "@/components/ui/icon";

const AUTOPLAY_MS = 6000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Whether the reader has asked for less motion — read as a subscription, so
 * flipping the OS setting stops a running carousel rather than waiting for
 * a reload.
 */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * False during server rendering and the first client render, true after
 * hydration. This is what gates the controls, so the markup the server sends
 * never contains a button that has nothing behind it yet.
 */
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * A carousel that is a scroller first and a carousel second.
 *
 * The slides live in a native horizontally-scrolling list with CSS scroll
 * snapping, so before a line of JavaScript runs they are already reachable
 * by touch, trackpad, keyboard, and screen reader — and every item is
 * reachable, not just the visible one. That matters more here than usual:
 * this is a list of the services residents come to the site to do, and a
 * widget that hides ten of twelve tasks behind an animation would be a
 * worse directory than the plain grid it replaced.
 *
 * The buttons and the auto-advance are the enhancement layer, added after
 * mount so nobody is ever shown a control that cannot work.
 *
 * Accessibility notes, since carousels are usually where this goes wrong:
 *
 * - **WCAG 2.2.2 (Pause, Stop, Hide).** Anything that moves on its own for
 *   more than five seconds needs a pause control. That is the one thing the
 *   pattern this was modelled on gets right, and it is not optional.
 * - Auto-advance stops on hover, on focus anywhere inside, when the tab is
 *   hidden, and permanently once the reader presses pause.
 * - `prefers-reduced-motion` disables auto-advance entirely and switches
 *   the button scrolling from smooth to instant.
 * - The live region is `off` while rotating and `polite` once stopped, so a
 *   screen reader is not interrupted every six seconds but does get told
 *   where it landed after pressing a button.
 * - Real `<button>` elements, not `<span role="button">` — spans need
 *   hand-written Enter/Space handling and a tabindex to work at all, and
 *   the hand-written version is usually missing one of them.
 */
export function Carousel({
  label,
  children,
  itemCount,
}: {
  /** Names the carousel for assistive technology. */
  label: string;
  children: React.ReactNode;
  itemCount: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const enhanced = useHydrated();
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState(1);
  const interactionRef = useRef(false);
  const statusId = useId();

  // `null` means the reader has not expressed a preference, so the default
  // follows the motion setting: on normally, off for reduced motion. An
  // explicit press wins either way — asking for less motion should not take
  // the control away from someone who then wants it moving.
  const [chosen, setChosen] = useState<boolean | null>(null);
  const playing = chosen ?? !reducedMotion;

  const scrollByPage = useCallback(
    (direction: 1 | -1) => {
    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
    const viewport = viewportRef.current;
    if (!viewport) return;

    const slide = viewport.querySelector<HTMLElement>("[data-carousel-slide]");
    const step = slide ? slide.offsetWidth + 12 : viewport.clientWidth;
    const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1;

    // Wrap, so auto-advance does not simply stall at the far end.
    if (direction === 1 && atEnd) {
      viewport.scrollTo({ left: 0, behavior });
      return;
    }
    if (direction === -1 && viewport.scrollLeft <= 0) {
      viewport.scrollTo({ left: viewport.scrollWidth, behavior });
      return;
    }

    viewport.scrollBy({ left: step * direction, behavior });
    },
    [reducedMotion],
  );

  // Report which item is at the left edge, for the status line.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScroll = () => {
      const slide = viewport.querySelector<HTMLElement>("[data-carousel-slide]");
      const step = slide ? slide.offsetWidth + 12 : 1;
      setPosition(Math.min(itemCount, Math.round(viewport.scrollLeft / step) + 1));
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [itemCount]);

  useEffect(() => {
    if (!playing || !enhanced) return;

    const tick = () => {
      // Never advance under someone's cursor, keyboard focus, or on a tab
      // they are not looking at.
      if (interactionRef.current || document.hidden) return;
      scrollByPage(1);
    };

    const timer = window.setInterval(tick, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [playing, enhanced, scrollByPage]);

  const hold = () => {
    interactionRef.current = true;
  };
  const release = () => {
    interactionRef.current = false;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="carousel"
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocusCapture={hold}
      onBlurCapture={release}
    >
      <div
        ref={viewportRef}
        className="carousel-viewport"
        // Scroll containers must be keyboard-operable. Without a tabindex a
        // sighted keyboard user can tab to the links inside but cannot
        // arrow-scroll the container itself.
        tabIndex={0}
        role="group"
        aria-label={`${label}, scrollable`}
        aria-live={playing ? "off" : "polite"}
      >
        {children}
      </div>

      {enhanced && (
        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous services"
          >
            <Icon name="arrow-left" size="sm" />
          </button>
          <button
            type="button"
            className="carousel-button"
            onClick={() => scrollByPage(1)}
            aria-label="Next services"
          >
            <Icon name="arrow-right" size="sm" />
          </button>
          <button
            type="button"
            className="carousel-button"
            onClick={() => setChosen(!playing)}
            aria-label={playing ? "Pause automatic scrolling" : "Start automatic scrolling"}
          >
            <Icon name={playing ? "pause" : "play"} size="sm" />
          </button>

          <p id={statusId} className="carousel-status body-xs text-ink-muted" aria-live="polite">
            Showing item {position} of {itemCount}
          </p>
        </div>
      )}
    </section>
  );
}
