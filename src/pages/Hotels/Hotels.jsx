import React from "react";
import './Hotels.css'
import HotelCard from "./HotelCard/HotelCard";
import GrosvenorImg from '../../../src/assets/hotels/grosvenor-bus.webp';
import TreehouseImg from '../../../src/assets/hotels/treehouse-lobby.webp';
import HorseguardsImg from '../../../src/assets/hotels/the-royal-horseguards.webp';
import CorinthiaImg from '../../../src/assets/hotels/corinthia-london.webp';
import ChurchillImg from '../../../src/assets/hotels/the-churchill-outside.webp';
import LanghamImg from '../../../src/assets/hotels/langham-outside.webp';
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
            discount_subheader: "Room block",
            link: "https://app.marriott.com/reslink?id=1764688867015&key=GRP&app=resvlink",
            discount_text: "We currently have a small number of Superior King Rooms on hold at a discounted rate of £520 plus 5% service. If you find that the reservation link has sold out, you'd like a different room type or you'd like your room for a longer period please email our wedding planner on caroline@carolinesianweddings.co.uk ."
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
            discount_subheader: null,
            link: null,
            discount_text: null
            },
        },
    ];


    return (
        <div className="mainBody">
            
            <PageHeader pageName = "Hotels" />

<div className="hotels-wrapper">
<div className="hotels">
            <h3>Recommended Hotels</h3>
            
            
            <div className="hotelCardSection">
                {HOTELS.map((h, i) => (
                    <HotelCard
                        name={h.name}
                        img={h.img}
                        info = {h.info} 
                        discount_subheader = {h.discount_subheader}
                        link = {h.link}
                        discount_text={h.discount_text}              
                          />
                ))}

            </div>

            <h3>Other Hotels</h3>

            <div className="additionalHotelCards">
                <AdditionalHotels name="The Royal Horseguards" address="2 Whitehall Ct, London SW1A 2EJ" image = {HorseguardsImg} website = "https://www.royalhorseguardshotel.com/" />
                <AdditionalHotels name="The Corinthia" address="10 Whitehall Pl, London SW1A 2BD" image = {CorinthiaImg} website = "https://www.corinthia.com/en-gb/london/" />
                <AdditionalHotels name="The Churchill" address="30 Portman Square, London, W1H 7BH" image = {ChurchillImg} website = "https://www.hyatt.com/hyatt-regency/en-US/lonch-hyatt-regency-london-the-churchill"/>
                <AdditionalHotels name="The Langham" address="1C Portland Pl, London, W1H 7BH" image = {LanghamImg} website = "https://www.langhamhotels.com/en/the-langham/london"/>

            </div>




</div>
</div>

        </div>
    );
};

export default Hotels;