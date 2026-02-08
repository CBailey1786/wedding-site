import React from "react";
import './Hotels.css'
import HotelCard from "./HotelCard/HotelCard";
import GrosvenorImg from '../../../src/assets/grosvenor-bus.jpg';
import TreehouseImg from '../../../src/assets/treehouse-lobby.webp';
import HorseguardsImg from '../../../src/assets/the-royal-horseguards.jpg';
import CorinthiaImg from '../../../src/assets/corinthia-london.jpg';
import ChurchillImg from '../../../src/assets/the-churchill-outside.webp';
import LanghamImg from '../../../src/assets/langham-outside.jpg';
import AdditionalHotels from "./HotelCard/AdditionalHotels";
import PageHeader from "../../layouts/PageHeader";


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
        <div className="mainBody">
            <PageHeader pageName = "Hotels" />

            <h3>Recommended Hotels</h3>

            <div className="hotelCardSection">
                {HOTELS.map((h, i) => (
                    <HotelCard
                        name={h.name}
                        img={h.img}
                        info = {h.info}                  
                          />
                ))}

            </div>

            <h3>Other Hotels</h3>

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