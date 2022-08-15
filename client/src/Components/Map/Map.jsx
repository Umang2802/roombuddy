import React, { useEffect, useMemo, useRef} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [30, 30],
});

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition,map]);

  return null;
}

export default function Maps(props) {
  const { selectPosition, position,setPosition } = props;
  const markerRef = useRef(null);

  useEffect(() => {
    if (selectPosition) {
      setPosition({ lat: selectPosition?.lat, lng: selectPosition?.lon });
    }
  }, [selectPosition,setPosition]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='<a href="https://www.https://roombuddyindia.herokuapp.com/">Roombuddy</a>'
        url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=5U24euf7DXZaEdPph9Ho"
      />
      <Marker
        position={position}
        icon={icon}
        draggable={true}
        ref={markerRef}
        eventHandlers={eventHandlers}
      >
        {selectPosition && <Popup>{selectPosition.display_name}</Popup>}
      </Marker>
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
