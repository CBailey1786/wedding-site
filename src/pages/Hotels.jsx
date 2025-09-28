import React from "react";
import './Hotels.css'
import nhmOutside from '../../src/assets/nhm-outside.png';
import HotelCard from "../components/HotelCard/HotelCard";
import LanghamImg from '../../src/assets/Langham_london.jpg';
import TreehouseImg from '../../src/assets/Treehouse_london.png';
import AdditionalHotels from "../components/HotelCard/AdditionalHotels";

const Hotels = () => {


    const HOTELS = [
        {
            name: "The Langham",
            img: LanghamImg,
            info: {
                blurb:
                    "Since opening its doors over 150 years ago, The Langham has established itself as a London icon. Expect elegance and exceptional service at every turn.",
                address: "1C Portland Place, London W1B 1JA",
                displayWebsite: "https://www.langhamhotels.com",
                website: "https://www.langhamhotels.com/en/the-langham/london",
                rate: "TBC",
                details: 'TBC',
            },
        },
        // duplicate for now — swap this out later
        {
            name: "The Treehouse",
            img: TreehouseImg,
            info: {
                blurb:
                    "Perched high above the bustle of London life, The Treehouse offers modern luxury with a playful twist. Spectacular views are guaranteed.",
                address: "14-15 Langham Place, London W1B 2QS",
                displayWebsite: "https://www.treehousehotels.com",
                website: "www.treehousehotels.com/london",
                rate: "TBC",
                details: 'TBC',
            },
        },
    ];

    return (
        <div className="pageBody">
            <div className="namesSection">
                <h1 className="header">Hotels</h1>
            </div>

            <div className="blurb">
                <h3>We are delighted to offer room blocks at two fantastic central London hotels.
                    Located just across the road from one another, The Langham and The Treehouse are both a stone’s throw away from Regent Street,
                    Soho, and Marylebone (a personal favourite of ours).
                </h3>

                <h3>Discounted rooms are on a first-come first-serve, so booking early is encouraged.
                </h3>
            </div>

            <div className="hotelCardSection">
                {HOTELS.map((h, i) => (
                    <HotelCard
                        key={`${h.name}-${i}`}
                        name={h.name}
                        img={h.img}
                        info={h.info}
                        reversed={i % 2 === 1} // flip every second card
                    />
                ))}

            </div>

            <div className="blurb">
                <h3>Beyond the two room blocks, you’ll find a shortlist of other excellent London hotels below. No special discounts apply, but we recommend them wholeheartedly.
                </h3>
            </div>

            <div className="miniCards">
                <AdditionalHotels name="The Royal Horseguards" address="2 Whitehall Ct, London SW1A 2EJ" displayWebsite="https://www.royalhorseguardshotel.com" website = "https://www.royalhorseguardshotel.com/" />
                <AdditionalHotels name="The Corinthia" address="10 Whitehall Pl, London SW1A 2BD" displayWebsite="https://www.corinthia.com" website = "https://www.corinthia.com/en-gb/london/" />

            </div>

            <div className="miniCards">
                <AdditionalHotels name="Grosvenor House" address="86-90 Park Ln, London W1K 7TN" displayWebsite="https://www.marriott.com" website = "https://www.marriott.com/en-us/hotels/longh-jw-marriott-grosvenor-house-london/overview/"/>
                <AdditionalHotels name="The Churchill" address="30 Portman Square, London W1H 7BH" displayWebsite="https://www.hyatt.com" website = "https://www.hyatt.com/hyatt-regency/en-US/lonch-hyatt-regency-london-the-churchill"/>

            </div>







        </div>
    );
};

export default Hotels;