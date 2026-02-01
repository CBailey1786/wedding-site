import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./PhotoCarousel.module.css";

export function PhotoCarousel({ photos, initialIndex = 0 }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    startIndex: initialIndex,
  });

  const slideRefs = useRef([]); // holds card DOM nodes
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setSlideRef = useCallback((el, index) => {
    slideRefs.current[index] = el;
  }, []);

  const applyTweenScale = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const snaps = emblaApi.scrollSnapList();
    const slidesInView = emblaApi.slidesInView(true);

    // Tweak these two numbers to taste:
    const MIN_SCALE = 0.85; // side cards
    const MAX_SCALE = 1.0;  // center card

    // For each snap point, find distance from current scroll
    snaps.forEach((snap, snapIdx) => {
      let diffToTarget = snap - scrollProgress;

      // Loop handling: adjust diff based on loop points so scaling stays correct
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopPoint) => {
          const target = loopPoint.target();
          if (loopPoint.index === snapIdx && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = snap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = snap + (1 - scrollProgress);
          }
        });
      }

      // Only bother scaling slides that are near view (performance)
      if (!slidesInView.includes(snapIdx)) return;

      // Convert distance into a scale value
      // closer to 0 distance => closer to MAX_SCALE
      const distance = Math.abs(diffToTarget);
      const t = Math.max(0, 1 - distance * 2.2); // 2.2 controls falloff
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * t;

      const node = slideRefs.current[snapIdx];
      if (node) node.style.transform = `scale(${scale})`;
    });
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Init scale once
    applyTweenScale();
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      applyTweenScale();
      onSelect();
    });

    // Update scaling continuously while scrolling/dragging
    emblaApi.on("scroll", applyTweenScale);

    return () => {
      emblaApi.off("scroll", applyTweenScale);
    };
  }, [emblaApi, applyTweenScale, onSelect]);

  const scrollTo = useCallback(
    (idx) => emblaApi && emblaApi.scrollTo(idx),
    [emblaApi]
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {photos.map((p, idx) => (
            <div className={styles.slide} key={`${p.src}-${idx}`}>
              <div
                className={styles.card}
                ref={(el) => setSlideRef(el, idx)}
              >
                <img className={styles.img} src={p.src} alt={p.alt || ""} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {photos.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${
              idx === selectedIndex ? styles.dotActive : ""
            }`}
            onClick={() => scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
