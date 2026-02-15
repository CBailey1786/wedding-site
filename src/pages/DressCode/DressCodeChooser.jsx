import React, { useState } from "react";
import styles from "./DressCodeChooser.module.css";
import { DressCodePanel } from "./DressCodePanel"; // from earlier

/**
 * props:
 *  options: [
 *    { key: "gents", label: "Gentlemen", coverSrc, coverAlt?, panelProps }
 *    { key: "ladies", label: "Ladies", coverSrc, coverAlt?, panelProps }
 *  ]
 */
export function DressCodeChooser({ options, defaultKey = null }) {
  const [selectedKey, setSelectedKey] = useState(defaultKey);

  const selected = options.find((o) => o.key === selectedKey) || null;

  if (!selected) {
    return (
      <div className={styles.pickerWrap}>
        <div className={styles.picker}>
          {options.map((o) => (
            <button
              key={o.key}
              type="button"
              className= {styles.cardBtn}
              
              onClick={() => setSelectedKey(o.key)}
              aria-label={`View ${o.label} dress code`}
            >
              <div className={`${styles.cardImage} ${styles[`picker_${o.key}`]}`}>
                <img src={o.coverSrc} alt={o.coverAlt || o.label} />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardTitle}>{o.label}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.selectedWrap}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => setSelectedKey(null)}
        >
          ← Back
        </button>

      <DressCodePanel {...selected.panelProps} />
    </div>
  );
}
