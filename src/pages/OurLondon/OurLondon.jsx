import React, { useMemo, useRef, useState } from "react";
import "./OurLondon.css";
import PageHeader from "../../layouts/PageHeader";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import mapPoints from "../../data/map_points.with_images.json";
import { Icon, PinCircleBorder2  } from "leaflet-extra-markers";

function RecenterForCard({ selectedPoint, cardOpen }) {
  const map = useMap();

  React.useEffect(() => {
    if (!selectedPoint || !cardOpen) return;

    map.setView(
      [selectedPoint.lat-0.2/(map.getZoom()*2), selectedPoint.lng],
      map.getZoom(),
      { animate: true }
    );
  }, [selectedPoint, cardOpen, map]);

  return null;
}

const OurLondon = () => {
  const points = mapPoints;

  // chip filter state (from your previous requirement)
  const allTypes = useMemo(() => {
    const s = new Set(points.map((p) => p.type).filter(Boolean));
    return Array.from(s).sort();
  }, [points]);

  const [activeType, setActiveType] = useState(null); // null = ALL
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handleChipClick = (t) => {
    setSelectedPoint(null); // close card when changing filter (optional)
    setActiveType((prev) => (prev === t ? null : t));
  };

  const filteredPoints = useMemo(() => {
    if (!activeType) return points;
    return points.filter((p) => p.type === activeType);
  }, [points, activeType]);

  // If the selected point gets filtered out, close the card
  React.useEffect(() => {
    if (!selectedPoint) return;
    const stillVisible = !activeType || selectedPoint.type === activeType;
    if (!stillVisible) setSelectedPoint(null);
  }, [activeType, selectedPoint]);

  const cardOpen = Boolean(selectedPoint);

  const marker = new Icon({
  icon: "fa-exclamation",
  color: "#2D5341",
  svg: PinCircleBorder2,
});

  return (
    <div className="mapPageBody">
      <PageHeader pageName="Our London" />

      <div className="mapWrap">
        {/* Chips overlay */}
        <div className="mapChips">
          <button
            type="button"
            className={`chip ${activeType === null ? "chipActive" : ""}`}
            onClick={() => {
              setActiveType(null);
              setSelectedPoint(null);
            }}
          >
            All
          </button>

          {allTypes.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip ${activeType === t ? "chipActive" : ""}`}
              onClick={() => handleChipClick(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <MapContainer
          className="mapContainer"
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution=""
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <RecenterForCard selectedPoint={selectedPoint} cardOpen={cardOpen} />

          {filteredPoints.map((p) => (
            <Marker
              key={p.id ?? `${p.lat}-${p.lng}`}
              position={[p.lat, p.lng]}
              icon = {marker}
              eventHandlers={{
                click: () => setSelectedPoint(p),
              }}
            />
          ))}
        

        {/* Bottom details card */}
        {selectedPoint && (
          <div className="mapBottomCard" role="dialog" aria-label="Location details">


                        {selectedPoint.image && (
                          <div className = "cardImageWrapper">
              <img
                src={selectedPoint.image}
                alt={selectedPoint.title || selectedPoint.name || "Place image"}
                className="cardImage"
              />
                          <button
              type="button"
              className="cardClose"
              onClick={() => setSelectedPoint(null)}
              aria-label="Close"
            >
              ×
            </button>
              <div className="cardPillWrapper">
              <div className="cardPill">{selectedPoint.type}</div>
              {selectedPoint.price_text && (
              <div className="cardPill">{selectedPoint.price_text}</div>
              )}
              </div>
              </div>
            )}

<div className = "cardText">
            <div className="cardTitleRow">
              <h1 className="cardTitle">{selectedPoint.name ?? "Unknown"}</h1>
              
            </div>

            {selectedPoint.comment && (
              <div className="cardBody">{selectedPoint.comment}</div>
            )}
            <span className = "cardSubtitle">{selectedPoint.Address ?? ""}</span>


          </div>
          </div>
        )}

        </MapContainer>
      </div>
    </div>
  );
};

export default OurLondon;
