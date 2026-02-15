import React from "react";
import { DressCodeChooser } from "./DressCodeChooser";

import gentsCover from "../../assets/19099.webp";
import ladiesCover from "../../assets/Edmund_Blair_Leighton_-_The_Golden_Train.jpg";

import g1 from "../../assets/dressCode/mens_1.webp";
import g2 from "../../assets/dressCode/mens_2.webp";
import g3 from "../../assets/dressCode/mens_3.webp";
import g4 from "../../assets/dressCode/mens_4.webp";
import g5 from "../../assets/dressCode/mens_5.webp";

import w1 from "../../assets/dressCode/womens_1.webp";
import w2 from "../../assets/dressCode/womens_2.webp";
import w3 from "../../assets/dressCode/womens_3.webp";
import w4 from "../../assets/dressCode/womens_4.webp";
import w5 from "../../assets/dressCode/womens_5.webp";
import PageHeader from "../../layouts/PageHeader";

export default function DressCode() {
  const options = [
    {
      key: "gents",
      label: "Gentlemen",
      coverSrc: gentsCover,
      panelProps: {
        title: "Wedding Ceremony & Reception",
        text: [
          "Black tie encouraged. Please wear a formal suit or tuxedo with a tie or bowtie. If you are looking to rent a suit we recommend the below:",
        ],
        links: [
          { label: "Oliver Brown", href: "https://hire.oliverbrownlondon.com/collections/black-tie-hire" },
          { label: "Rathbones", href: "https://rathbonestailor.com/collections/black-tie-tuxedo" },
          { label: "Moss Bros", href: "https://www.mossbroshire.co.uk/occasion/black-tie" },
        ],
        variant: "mens",
        photos: [
          { src: g1 }, { src: g2 }, { src: g3 }, { src: g4 }, { src: g5 }
        ],
      },
    },
    {
      key: "ladies",
      label: "Ladies",
      coverSrc: ladiesCover,
      panelProps: {
        title: "Wedding Ceremony & Reception",
        text:
          "Black tie encouraged. Please wear ankle or floor length dresses. Bright summer colours are encouraged but ultimately we want you to feel comfortable.",
        variant: "womens",
        photos: [{ src: w1 }, { src: w2 }, { src: w3 }, { src: w4 }, { src: w5 }],
      },
    },
  ];

  return (
  <div className="mainBody">
              <PageHeader pageName = "Dress Code" />
  <DressCodeChooser options={options} />

  </div>
  )
}
