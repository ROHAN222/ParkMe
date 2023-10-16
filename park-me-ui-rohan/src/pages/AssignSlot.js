import { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TransactionInput from "../components/UI/TransactionInput";
import useHttp from "../hooks/use-http";
import { assignParking } from "../lib/api";
import AuthContext from "../store/auth-context";

const AssignSlot = (props) => {
  const params = useParams();
  const { slotId } = params;
  const { type } = params;
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const { sendRequest, status } = useHttp(assignParking);

  useEffect(() => {
    if (status === "completed") {
      history.push("/search");
    }
  }, [status, history]);

  const confirmParkingHandler = (slotId, vehicleNumber) =>
    sendRequest({
      spotId: slotId,
      vehicleNumber: vehicleNumber,
      spotType: type,
      token: authCtx.token,
    });
  return (
    <TransactionInput
      isLoading={status === "pending"}
      slotId={slotId}
      onConfirmParking={confirmParkingHandler}
    />
  );
};
export default AssignSlot;
