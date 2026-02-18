import React from "react";
import flowers from '../assets/heart-flower.svg';
import "./header.css"


export default function PageHeader ({pageName}) {
    return (
                <header className="header">
                    <img className = "flowers" src={flowers} alt="flower-motif" />
                    <div className = "headerText">
                        <h2>{pageName}</h2>
                    </div>
                       
                </header>
           
    );
};
