import React from "react";
import './WeddingParty.css'

import silverstone from "../../assets/silverstone-bw.png";
import WeddingPartyPicture from "./WeddingPartyPicture";
import PageHeader from "../../layouts/PageHeader";

const WeddingParty = () => {

        const ushers = [
            {
                name: "Ross",
                img: silverstone,
            },
    
            {
                name: "Duncan",
                img: silverstone,
            },
                        {
                name: "Richard",
                img: silverstone,
            },

                        {
                name: "Matthew",
                img: silverstone,
            },
                        {
                name: "Alex",
                img: silverstone,
            },
                                    {
                name: "Tom",
                img: silverstone,
            },

                        {
                name: "Charlie",
                img: silverstone,
            },

        ];

        const bridesmaids = [
            {
                name: "Ava",
                img: silverstone,
            },
    
            {
                name: "Kerry",
                img: silverstone,
            },
                        {
                name: "Emily",
                img: silverstone,
            },

                        {
                name: "Alison",
                img: silverstone,
            },
                        {
                name: "Christina",
                img: silverstone,
            },
                                    {
                name: "Colleen",
                img: silverstone,
            },

                        {
                name: "Keri",
                img: silverstone,
            },
                        {
                name: "Alicia",
                img: silverstone,
            },
    
            {
                name: "Liberty",
                img: silverstone,
            },
                        {
                name: "Ana",
                img: silverstone,
            },

                        {
                name: "Maria",
                img: silverstone,
            },
                        {
                name: "Kelly",
                img: silverstone,
            },
                                    {
                name: "Lilia",
                img: silverstone,
            },

                        {
                name: "Analiese",
                img: silverstone,
            },


        ];

    
    return (
        <div className="mainBody">
            <PageHeader pageName = "Wedding Party" />
            <div className="travelTextBlock">
                <h3>Ushers</h3>

            <div className="picturesSection">
                {ushers.map((h, i) => (
                    <WeddingPartyPicture
                        name={h.name}
                        img={h.img}               
                          />
                ))}

            </div>

            <h3>Bridesmaids</h3>

            <div className="picturesSection">
                {bridesmaids.map((h, i) => (
                    <WeddingPartyPicture
                        name={h.name}
                        img={h.img}               
                          />
                ))}

            </div>



            </div>

        </div>
    );
};

export default WeddingParty;