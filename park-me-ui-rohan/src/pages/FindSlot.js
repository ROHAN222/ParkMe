import { Fragment, useContext, useEffect, useState } from "react";
import SlotTypeContainer from "../components/Slots/SlotType/SlotTypeContainer";
import Slots from "../components/Slots/Slots";
import TransactionInput from "../components/UI/TransactionInput";
import useHttp from "../hooks/use-http";
import { getAllSlotsByType } from "../lib/api";
import NoSlotsFound from "../components/Slots/NoSlotsFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
const FindSlot = (props) => {
  const authCtx = useContext(AuthContext);
  const [transactionInProgresss, setTxnInProgress] = useState(false);
  const [selectedSlotId, setSlotId] = useState();
  const [slots, setAvailableSlots] = useState([]);
  const history = useHistory();

  const {
    sendRequest,
    status,
    data: availableSlots,
    error,
  } = useHttp(getAllSlotsByType);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (
    status === "completed" &&
    (!availableSlots || availableSlots.length === 0)
  ) {
    return <NoSlotsFound />;
  }

  const parkCar = (slotId) => {};
  const cancelHandler = () => {};

  const confirmParkingHandler = (slotId, vehicleNumber) => {};

  const fetchSlotHandler = (type) => {
    sendRequest({ type: type.toUpperCase(), token: authCtx.token });
  };

  return (
    <Fragment>
      <SlotTypeContainer fetchSlot={fetchSlotHandler} />
      {availableSlots && availableSlots.length > 0 && (
        <Slots slots={availableSlots} onSelect={parkCar} />
      )}
    </Fragment>
  );
};

export default FindSlot;
