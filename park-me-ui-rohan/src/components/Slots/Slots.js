import React, { Fragment } from "react";
import Slot from "./Slot/Slot";
import classes from "./Slots.module.css";

const Slots = (props) => {
  const onSelectHandler = (slotId) => {
    props.onSelect(slotId);
  };

  const slots = props.slots.map((slot) => (
    <li className={classes.liItem} key={slot.spotId}>
      <Slot onClick={onSelectHandler} slot={slot} />
    </li>
  ));
  return <ul className={classes.ulWithout}>{slots}</ul>;
};
export default Slots;
