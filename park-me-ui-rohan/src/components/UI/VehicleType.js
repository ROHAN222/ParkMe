import React from "react";
import "./VehicleType.css";

const VehicleType = (props) => {
  return (
    <button
      className={`vehicle-type ${props.className}`}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default VehicleType;
