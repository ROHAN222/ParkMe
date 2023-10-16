import React from "react";
import VehicleType from "../../UI/VehicleType";
import classes from "./SlotTypeContainer.module.css";
const SlotTypeContainer = (props) => {
  const fetchSmallSlotsHandler = () => {
    props.fetchSlot("small");
  };

  const fetchMediumSlotsHandler = () => {
    props.fetchSlot("medium");
  };

  const fetchLargeSlotsHandler = () => {
    props.fetchSlot("large");
  };

  return (
    <div className={classes.xcontainer}>
      <VehicleType onClick={fetchSmallSlotsHandler} className="small">
        Small
      </VehicleType>
      <VehicleType onClick={fetchMediumSlotsHandler} className="medium">
        Medium
      </VehicleType>
      <VehicleType onClick={fetchLargeSlotsHandler} className="large">
        Large
      </VehicleType>
    </div>
  );
};
export default SlotTypeContainer;
