import React from "react";
import './Travel.css'

import PageHeader from "../../layouts/PageHeader";




const Travel = () => {
    return (
        <div className="mainBody">
            <PageHeader pageName = "Travel" />
            <div className="travel-wrapper">
            <div className="travel">
            <div className="travelTextBlock">
                <h3>Passport Information </h3>

                <p>If you are visiting the United Kingdom from overseas you must have a valid passport and visa. <br></br><br></br>

                    Your passport must be valid for at least 6 months after your intended travel date, so make sure your passport is valid until December 2026. <br></br><br></br>

                    If you are not a UK citizen you are now required to have a valid ETA (Electronic Travel Authorization) to visit the country. You can apply for this here:
                </p>

                <a className="travelButton travelPrimary" href={"https://www.gov.uk/eta/apply"} target="_blank">Apply for an ETA</a>

            </div>

             <div className="travelTextBlock">
                <h3>Getting to London</h3>

                <p>OPTION 1: Fly into London Heathrow <br></br><br></br>

                    PLANE:<br></br>
                    Heathrow is London’s biggest airport with flights to and from the North America and Europe. <br></br><br></br>

                    TRAIN:<br></br> Take either the Heathrow Express (20 mins) or the Elizabeth Line (35 mins) into Paddington Station. <br></br><br></br>

                    AUTOMOBILE:<br></br> Ubers or traditional black cabs will get you to central London in 45 - 60 mins. Ubers will cost approx. £45 off-peak but black cabs will be more. <br></br><br></br>

                </p>

                <p>OPTION 2: Fly into London Gatwick <br></br><br></br>

                    PLANE:<br></br> London’s second airport, mainly servicing Europe but with some flights to North America. <br></br><br></br>

                    TRAIN:<br></br> Take either the Gatwick Express (30 mins) or the Southern Rail Mainline (40 mins) into Victoria Station. <br></br><br></br>

                    AUTOMOBILE:<br></br> Ubers or traditional black cabs will get you to central London in 90 - 120 mins. Ubers will cost approx. £75 off-peak but black cabs will be more. <br></br><br></br>

                </p>

</div>
            </div>
</div>
        </div>
    );
};

export default Travel;