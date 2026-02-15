import { useId, useRef, useState, useLayoutEffect } from "react";
import styles from "./FAQAccordion.module.css";
import PlusIcon from "../../assets/icons/plus_white.svg?react";
import MinusIcon from "../../assets/icons/minus_white.svg?react";

export function AccordionItem({ question, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    setHeight(innerRef.current.scrollHeight);
  }, [children]);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    if (open) setHeight(innerRef.current.scrollHeight);
  }, [open]);

  return (
    <div className={styles.item}>
      <button
        className={styles.header}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        type="button"
      >
        <span className={styles.question}>{question}</span>
        <span className={styles.icon} aria-hidden="true">
          {open ? <MinusIcon className = "faq_icon" />: <PlusIcon className = "faq_icon"/>}
        </span>
      </button>

      <div
        id={contentId}
        className={styles.panel}
        style={{ maxHeight: open ? `${height}px` : "0px" }}
      >
        <div ref={innerRef} className={styles.panelInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
