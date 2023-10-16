import React, { Fragment, useRef, useState } from "react";
import Input from "./Input";
import classes from "./TransactionInput.module.css";
import Card from "./Card";
import { Prompt } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const TransactionInput = (props) => {
  const vehicleNumberRef = useRef();
  const [isEntering, setEntering] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    const vehicleNumber = vehicleNumberRef.current.value;
    props.onConfirmParking(props.slotId, vehicleNumber);
    setEntering(false);
  };

  const formFocusHandler = (event) => {
    setEntering(true);
  };

  const finishFormHandler = () => {
    setEntering(false);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) => "Are you sure you want to leave?"}
      />
      <Card className={classes.assignParkingForm}>
        <div>
          <span>
            <h2>Parking No: {props.slotId}</h2>
          </span>
        </div>
        <form
          onSubmit={submitHandler}
          onFocus={formFocusHandler}
          className={classes.form}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <Input
              ref={vehicleNumberRef}
              label="Vehicle Number : "
              input={{
                id: "vehicleNumber",
                type: "text",
                className: `${classes.control}`,
              }}
            />
          </div>
          <div className={classes.actions}>
            <button onClick={finishFormHandler} type="submit" className="btn">
              Assign Parking
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};
export default TransactionInput;
