import { useMemo } from "react";
import { AccordionItem } from "./AccordionItem";
import styles from "./FAQAccordion.module.css";


function Answer({ answer }) {
  if (Array.isArray(answer)) {
    return (
      <>
        {answer.map((p, i) => (
          <p key={i} className = {styles.faq_answer}>{p}</p>
        ))}
      </>
    );
  }
  return <p>{answer}</p>;
}

export function FAQAccordion({ faqs, defaultOpenFirstInEachCategory = false }) {
  const grouped = useMemo(() => {
    const map = new Map();
    for (const item of faqs) {
      const cat = item.category || "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(item);
    }
    return Array.from(map.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }, [faqs]);

  return (
    <div className={styles.wrap}>
      {grouped.map(({ category, items }) => (
        <section key={category} className={styles.category}>

          <div className={styles.list}>
            {items.map((f, idx) => (
              <AccordionItem
                key={`${f.category}-${f.question}-${idx}`}
                question={f.question}
                defaultOpen={defaultOpenFirstInEachCategory && idx === 0}
              >
                <Answer answer={f.answer} />
              </AccordionItem>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
