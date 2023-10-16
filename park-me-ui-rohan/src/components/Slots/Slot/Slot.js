import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../UI/Button";
import classes from "./Slot.module.css";
const Slot = (props) => {
  const history = useHistory();
  const selectHandler = () => {
    history.push(`/assign/${props.slot.spotId}/${props.slot.type}`);
  };
  return (
    <Button onClick={selectHandler} className={classes.slot}>
      <span>
        L : {props.slot.level} - Parking No : {props.slot.spotId}
      </span>
      <span className={classes.smallText}> @ ${props.slot.rate} / hr</span>
    </Button>
  );
};
export default Slot;
