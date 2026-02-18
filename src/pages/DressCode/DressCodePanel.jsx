import React from "react";
import styles from "./DressCodePanel.module.css";

function Paragraphs({ text }) {
  if (!text) return null;
  const arr = Array.isArray(text) ? text : [text];
  return (
    <div className={styles.copy}>
      {arr.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function Links({ links }) {
  if (!links?.length) return null;
  return (
    <div className={styles.links}>
      {links.map((l, i) => (
        <a key={i} href={l.href} target="_blank" >
          {l.label}
        </a>
      ))}
    </div>
  );
}

/**
 * props:
 *  title: string
 *  text: string | string[]
 *  links?: {label, href}[]
 *  photos: { src, alt?, shape?: "round" | "soft" }[]
 *  variant?: "mens" | "womens"  (controls the collage layout)
 */
export function DressCodePanel({
  title,
  text,
  links = [],
  photos = [],
  variant = "mens",
}) {
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <h3>{title}</h3>
        <Paragraphs text={text} />
        <Links links={links} />
      </header>

      <div className={`${styles.collage} ${styles[variant]}`}>
        {photos.map((img, idx) => (
          <figure
            key={`${img.src}-${idx}`}
            className={`${styles.photo} ${styles[`slot${idx + 1}`]} ${
              img.shape === "round" ? styles.round : styles.soft
            }`}
          >
            <img className= {styles.panelImg} src={img.src} alt={img.alt || ""} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}
