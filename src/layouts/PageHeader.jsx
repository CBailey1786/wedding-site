import React from "react";
import flowers from '../assets/heart-flower.svg';


export default function PageHeader ({pageName}) {
    return (
                <header className="header">
                    <img src={flowers} alt="flower-motif" />
                    <div className = "headerText">
                        <h1>{pageName}</h1>
                    </div>
                       
                </header>
           
    );
};
