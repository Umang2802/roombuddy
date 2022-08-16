import React, { useState } from "react";
import SearchBox from "../Components/Map/SearchBox";
import Maps from "../Components/Map/Map";

function Map(props) {
  const { position, setPosition } = props;
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div>
      <div>
        <div style={{ width: "25vw" }}>
          <SearchBox setSelectPosition={setSelectPosition} />
        </div>
        <div style={{ width: "50vw", height: "50vh" }}>
          <Maps
            position={position}
            setPosition={setPosition}
            selectPosition={selectPosition}
          />
        </div>
      </div>
    </div>
  );
}

export default Map;
