import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./PhotoCarousel.module.css";

export function PhotoCarousel({ photos, initialIndex = 0 }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    startIndex: initialIndex,
  });

  const slideRefs = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setSlideRef = useCallback((el, index) => {
    slideRefs.current[index] = el;
  }, []);

  const scrollTo = useCallback(
    (idx) => emblaApi && emblaApi.scrollTo(idx),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const applyTweenScale = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const snaps = emblaApi.scrollSnapList();
    const slidesInView = emblaApi.slidesInView(true);

    const MIN_SCALE = 0.82;
    const MAX_SCALE = 1.0;

    snaps.forEach((snap, snapIdx) => {
      let diffToTarget = snap - scrollProgress;

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

      if (!slidesInView.includes(snapIdx)) return;

      const distance = Math.abs(diffToTarget);
      const t = Math.max(0, 1 - distance * 2.2);
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * t;

      const node = slideRefs.current[snapIdx];
      if (node) node.style.transform = `scale(${scale})`;
    });
  }, [emblaApi]);

  const onSlideClick = useCallback(
    (idx) => {
      if (!emblaApi) return;
      // If you're mid-drag, Embla might block clicks – this avoids accidental jumps
      if (emblaApi.clickAllowed && !emblaApi.clickAllowed()) return;

      if (idx !== emblaApi.selectedScrollSnap()) {
        emblaApi.scrollTo(idx);
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    applyTweenScale();
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      applyTweenScale();
      onSelect();
    });
    emblaApi.on("scroll", applyTweenScale);

    return () => {
      emblaApi.off("scroll", applyTweenScale);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, applyTweenScale, onSelect]);

  

  return (
    <div className={styles.wrap}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {photos.map((p, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <div className={styles.slide} key={`${p.src}-${idx}`}>
                <button
                  type="button"
                  className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
                  ref={(el) => setSlideRef(el, idx)}
                  onClick={() => onSlideClick(idx)}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    className={styles.img}
                    src={p.src}
                    alt={p.alt || ""}
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.dots}>
        {photos.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === selectedIndex ? styles.dotActive : ""}`}
            onClick={() => scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
