import React from "react";
import './FAQ.css'

import PageHeader from "../../layouts/PageHeader";
import { faqs } from "./faqs";
import { FAQAccordion } from "./FAQAccordion";


const FAQ = () => {


    return (
        <div className="mainBody">
            <PageHeader pageName = "Frequently asked questions" />
            <div className="faqTextBlock">

                <p>Everything you need to know ahead of the big day.  <br></br><br></br>

                    If you have any specific questions please feel free to contact us directly via iMessage or WhatsApp: <br></br><br></br>

                Amanda:     +44 7760993893<br></br>
                Cameron:   +44 7495772506
                </p>

            </div>

            <FAQAccordion faqs={faqs} />


        </div>
    );
};

export default FAQ;