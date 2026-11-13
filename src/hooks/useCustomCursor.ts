import { RefObject, useEffect } from 'react';

interface CursorElements {
  rootRef: RefObject<HTMLDivElement | null>;
  dotRef: RefObject<HTMLDivElement | null>;
  ringRef: RefObject<HTMLDivElement | null>;
  trailRef: RefObject<HTMLDivElement | null>;
}

const HOVER_SELECTORS = {
  button: 'button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"], [data-cursor-magnetic="true"]',
  link: 'a[href], [role="link"]',
  card: '[data-cursor-hover="card"], .premium-card',
  textEntry: 'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]',
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function useCustomCursor({
  rootRef,
  dotRef,
  ringRef,
  trailRef,
}: CursorElements): void {
  useEffect(() => {
    const pointerCapability = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = false;
    let frameId = 0;
    let scrollTimer = 0;
    let isScrolling = false;
    let targetX = 0;
    let targetY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let movementX = 0;
    let movementY = 0;
    let previousMoveTime = 0;
    let trailOpacity = 0;
    let trailAngle = 0;
    let trailScale = 1;
    let scrollScale = 1;
    let lastFrameTime = 0;
    let magneticElement: HTMLElement | null = null;
    let currentHoverMode = '';
    let currentTextEntry = false;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!root || !dot || !ring || !trail) return undefined;

    const resetMagneticElement = () => {
      if (!magneticElement) return;
      magneticElement.style.setProperty('--magnetic-x', '0px');
      magneticElement.style.setProperty('--magnetic-y', '0px');
      magneticElement = null;
    };

    const setTargetElement = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const isTextEntry = !!element?.closest(HOVER_SELECTORS.textEntry);
      const hoverMode = isTextEntry
        ? ''
        : element?.closest(HOVER_SELECTORS.button)
          ? 'button'
          : element?.closest(HOVER_SELECTORS.link)
            ? 'link'
            : element?.closest(HOVER_SELECTORS.card)
              ? 'card'
              : '';

      if (hoverMode !== currentHoverMode) {
        root.dataset.hover = hoverMode || 'default';
        currentHoverMode = hoverMode;
      }

      if (isTextEntry !== currentTextEntry) {
        root.classList.toggle('custom-cursor--over-text-entry', isTextEntry);
        currentTextEntry = isTextEntry;
      }

      const nextMagneticElement = !reducedMotionQuery.matches && element
        ? element.closest<HTMLElement>('[data-cursor-magnetic="true"]')
        : null;
      if (nextMagneticElement !== magneticElement) {
        resetMagneticElement();
        magneticElement = nextMagneticElement;
      }
    };

    const updateMagneticElement = () => {
      if (!magneticElement) return;
      const bounds = magneticElement.getBoundingClientRect();
      const x = clamp((targetX - (bounds.left + bounds.width / 2)) / (bounds.width / 2), -1, 1);
      const y = clamp((targetY - (bounds.top + bounds.height / 2)) / (bounds.height / 2), -1, 1);
      magneticElement.style.setProperty('--magnetic-x', `${x * 4}px`);
      magneticElement.style.setProperty('--magnetic-y', `${y * 4}px`);
    };

    const scheduleFrame = () => {
      if (!frameId) frameId = window.requestAnimationFrame(renderFrame);
    };

    const renderFrame = (time: number) => {
      frameId = 0;
      const reducedMotion = reducedMotionQuery.matches;
      const delta = lastFrameTime ? Math.min(time - lastFrameTime, 32) : 16;
      lastFrameTime = time;
      const follow = (current: number, target: number, amount: number) =>
        current + (target - current) * amount;

      dotX = reducedMotion ? targetX : follow(dotX, targetX, 0.48);
      dotY = reducedMotion ? targetY : follow(dotY, targetY, 0.48);
      ringX = reducedMotion ? targetX : follow(ringX, targetX, 0.2);
      ringY = reducedMotion ? targetY : follow(ringY, targetY, 0.2);
      scrollScale = reducedMotion
        ? (isScrolling ? 1.1 : 1)
        : follow(scrollScale, isScrolling ? 1.1 : 1, 0.22);

      root.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      dot.style.transform = `translate3d(${dotX - targetX}px, ${dotY - targetY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX - targetX}px, ${ringY - targetY}px, 0) translate(-50%, -50%) scale(${scrollScale})`;

      if (!reducedMotion && trailOpacity > 0.01) {
        trailOpacity = Math.max(0, trailOpacity - delta * 0.0025);
        const offset = trailScale * 5;
        trail.style.transform = `translate3d(${-movementX * offset}px, ${-movementY * offset}px, 0) translate(-50%, -50%) rotate(${trailAngle}rad) scaleX(${trailScale})`;
        trail.style.opacity = `${trailOpacity}`;
      } else {
        trailOpacity = 0;
        trail.style.opacity = '0';
      }

      updateMagneticElement();

      const cursorSettled =
        Math.abs(targetX - dotX) < 0.25 &&
        Math.abs(targetY - dotY) < 0.25 &&
        Math.abs(targetX - ringX) < 0.35 &&
        Math.abs(targetY - ringY) < 0.35 &&
        Math.abs(scrollScale - (isScrolling ? 1.1 : 1)) < 0.002;
      if (!cursorSettled || trailOpacity > 0.01) scheduleFrame();
      else lastFrameTime = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const now = performance.now();
      const deltaTime = Math.max(1, now - (previousMoveTime || now));
      const deltaX = event.clientX - previousPointerX;
      const deltaY = event.clientY - previousPointerY;
      const distance = Math.hypot(deltaX, deltaY);
      const speed = distance / deltaTime;
      movementX = distance ? deltaX / distance : 0;
      movementY = distance ? deltaY / distance : 0;

      targetX = event.clientX;
      targetY = event.clientY;
      if (!root.classList.contains('custom-cursor--visible')) {
        root.classList.add('custom-cursor--visible');
        dotX = targetX;
        dotY = targetY;
        ringX = targetX;
        ringY = targetY;
      }
      if (distance > 0) {
        trailAngle = Math.atan2(deltaY, deltaX);
        trailScale = 1 + clamp(speed * 0.045, 0, 0.7);
        if (!reducedMotionQuery.matches) {
          trailOpacity = Math.max(trailOpacity, clamp((speed - 0.18) * 0.38, 0, 0.32));
        }
      }
      previousPointerX = event.clientX;
      previousPointerY = event.clientY;
      previousMoveTime = now;
      setTargetElement(document.elementFromPoint(event.clientX, event.clientY));
      scheduleFrame();
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') setTargetElement(event.target);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        root.classList.remove('custom-cursor--visible');
        root.classList.remove('custom-cursor--over-text-entry');
        currentTextEntry = false;
        root.dataset.hover = 'default';
        currentHoverMode = '';
        resetMagneticElement();
      } else {
        setTargetElement(event.relatedTarget);
      }
    };

    const handleScroll = () => {
      isScrolling = true;
      ring.classList.add('custom-cursor-ring--scrolling');
      scheduleFrame();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        isScrolling = false;
        ring.classList.remove('custom-cursor-ring--scrolling');
        scheduleFrame();
      }, 140);
    };

    const handleWindowBlur = () => {
      root.classList.remove('custom-cursor--visible');
      resetMagneticElement();
    };

    const activate = () => {
      if (active || !pointerCapability.matches) return;
      active = true;
      document.body.classList.add('custom-cursor-enabled');
      document.addEventListener('pointermove', handlePointerMove, { passive: true });
      document.addEventListener('pointerover', handlePointerOver, { passive: true });
      document.addEventListener('pointerout', handlePointerOut, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('blur', handleWindowBlur);
    };

    const deactivate = () => {
      if (!active) return;
      active = false;
      document.body.classList.remove('custom-cursor-enabled');
      root.classList.remove('custom-cursor--visible', 'custom-cursor--over-text-entry');
      root.dataset.hover = 'default';
      ring.classList.remove('custom-cursor-ring--scrolling');
      resetMagneticElement();
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('blur', handleWindowBlur);
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const syncPointerCapability = () => {
      if (pointerCapability.matches) activate();
      else deactivate();
    };

    syncPointerCapability();
    pointerCapability.addEventListener('change', syncPointerCapability);

    return () => {
      pointerCapability.removeEventListener('change', syncPointerCapability);
      deactivate();
      window.clearTimeout(scrollTimer);
    };
  }, [rootRef, dotRef, ringRef, trailRef]);
}
