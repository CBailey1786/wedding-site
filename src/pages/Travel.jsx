import React from "react";
import './Travel.css'


const Travel = () => {
    return (
        <div className="pageBody">
            <div className="header">Travel</div>

            <header className="sectionHeader">Getting To London</header>
            <h3>With six airports, London is tied with New York for having the most of any city in the world, so you’re spoilt for choice when it comes to travel. Flights from Europe can land at any airport, however North America is primarily served by Heathrow and Gatwick. We recommend avoiding Southend airport due to its distance from the city centre.  </h3>

            <h3>While all the airports are well connected via public transport, as you can see below, if you do decide to take a car we recommend using ride apps such as Uber or Bolt. Traditional black cabs are metered and often end up being much more expensive, particularly in rush hour traffic. You should expect to pay about £50 for a car into central London.</h3>

            <h2>Heathrow (LHR)</h2>
            <div>Heathrow Express: 15 minutes to Paddington (Fastest but most expensive)</div>
            <div>Elizabeth Line: 30 minutes to central London (Recommended route)</div>
            <div>Tube: 50 minutes to central London on the Piccadily Line (Cheapest but slow)</div>

            <h2>Gatwick (LGW)</h2>
            <div>Gatwick Express: 30 minutes to Victoria (Recommended route)</div>
            <div>Southern / Thameslink Trains: 35-45 minutes to central London (cheaper but varying destinations)</div>

            <h2>Stansted (STN)</h2>
            <div>Stansted Express: 45 minutes to Liverpool Street</div>

            <h2>Luton (LTN)</h2>
            <div>Luton Express: 40 minutes to St Pancras from Luton Airport Parkway (a short bus ride from the airport)</div>

            <h2>City (LCY)</h2>
            <div>Docklands Light Railway (DLR): 30 minutes to Bank</div>

        </div>
    );
};

export default Travel;