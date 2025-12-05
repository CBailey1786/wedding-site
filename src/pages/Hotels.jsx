import React from "react";
import './Hotels.css'
import nhmOutside from '../../src/assets/nhm-outside.png';
import HotelCard from "../components/HotelCard/HotelCard";
import GrosvenorImg from '../../src/assets/grosvenor-bus.jpg';
import TreehouseImg from '../../src/assets/treehouse-lobby.webp';
import HorseguardsImg from '../../src/assets/the-royal-horseguards.jpg';
import CorinthiaImg from '../../src/assets/corinthia-london.jpg';
import ChurchillImg from '../../src/assets/the-churchill-outside.webp';
import LanghamImg from '../../src/assets/langham-outside.jpg';
import AdditionalHotels from "../components/HotelCard/AdditionalHotels";

const Hotels = () => {


    const HOTELS = [
        {
            name: "Grosvenor House",
            img: GrosvenorImg,
            info: {
                blurb:
                    "Located on Park Lane with views over Hyde Park, Grosvenor House combines classic London style with modern comfort. Its central location makes it an ideal base for the weekend.",
                address: "86-90 Park Ln, London W1K 7TN",
                displayWebsite: "www.marriott.com",
                website: "https://www.marriott.com/en-us/hotels/longh-jw-marriott-grosvenor-house-london/overview/",
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
            },
        },
    ];

    return (
        <div className="pageBody">
            <div className="namesSection">
                <h1 className="header">Hotels</h1>
            </div>

            {/* <div className="blurb">
                <h3>We are delighted to be working with two fantastic central London hotels. Located in the heart of the city, Grosvenor House and The Treehouse are both just a stone’s throw from Regent Street, Soho, and Marylebone (a personal favourite of ours).
                </h3>

                <h3>While we are unable to provide discounted rates, we will be providing transport to and from the wedding from both hotels. We recommend booking early as possible to secure the best rates.
                </h3>
            </div> */}

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

            <div className="addtionalHotelCards">
                <AdditionalHotels name="The Royal Horseguards" address="2 Whitehall Ct, London SW1A 2EJ" image = {HorseguardsImg} website = "https://www.royalhorseguardshotel.com/" />
                <AdditionalHotels name="The Corinthia" address="10 Whitehall Pl, London SW1A 2BD" image = {CorinthiaImg} website = "https://www.corinthia.com/en-gb/london/" />
                <AdditionalHotels name="The Churchill" address="30 Portman Square, London, W1H 7BH" image = {ChurchillImg} website = "https://www.hyatt.com/hyatt-regency/en-US/lonch-hyatt-regency-london-the-churchill"/>
                <AdditionalHotels name="The Langham" address="1C Portland Pl, London, W1H 7BH" image = {LanghamImg} website = "https://www.langhamhotels.com/en/the-langham/london"/>

            </div>







        </div>
    );
};

export default Hotels;