import React from "react";
import './Hotels.css'
import nhmOutside from '../../src/assets/nhm-outside.png';
import HotelCard from "../components/HotelCard/HotelCard";
import ChurchillImg from '../../src/assets/the-churchill-outside.webp';
import TreehouseImg from '../../src/assets/Treehouse_london.png';
import AdditionalHotels from "../components/HotelCard/AdditionalHotels";

const Hotels = () => {


    const HOTELS = [
        {
            name: "The Churchill",
            img: ChurchillImg,
            info: {
                blurb:
                    "Tucked between Hyde Park and Baker Street in the heart of London’s West End, The Churchill is steeped in authentic British charm.",
                address: "30 Portman Square, London, W1H 7BH",
                displayWebsite: "www.hyatt.com",
                website: "https://www.hyatt.com/hyatt-regency/en-US/lonch-hyatt-regency-london-the-churchill",
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
                address: "14-15 Langham Place, London, W1B 2QS",
                displayWebsite: "www.treehousehotels.com",
                website: "https://www.treehousehotels.com/london",
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
                <h3>We are delighted to be working with two fantastic central London hotels to offer rooms at a discounted rate. Located in the heart of the city, The Churchill and The Treehouse are both just a stone’s throw from Regent Street, Soho, and Marylebone (a personal favourite of ours).
                </h3>

                <h3>Please check back here regularly for further information about room blocks. Discounted rooms will be available on a first-come, first-served basis, so early booking is encouraged.
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
                <AdditionalHotels name="The Royal Horseguards" address="2 Whitehall Ct, London SW1A 2EJ" displayWebsite="www.royalhorseguardshotel.com" website = "https://www.royalhorseguardshotel.com/" />
                <AdditionalHotels name="The Corinthia" address="10 Whitehall Pl, London SW1A 2BD" displayWebsite="www.corinthia.com" website = "https://www.corinthia.com/en-gb/london/" />

            </div>

            <div className="miniCards">
                <AdditionalHotels name="Grosvenor House" address="86-90 Park Ln, London W1K 7TN" displayWebsite="www.marriott.com" website = "https://www.marriott.com/en-us/hotels/longh-jw-marriott-grosvenor-house-london/overview/"/>
                <AdditionalHotels name="The Langham" address="1C Portland Pl, London, W1H 7BH" displayWebsite="www.langhamhotels.com" website = "https://www.langhamhotels.com/en/the-langham/london"/>

            </div>







        </div>
    );
};

export default Hotels;