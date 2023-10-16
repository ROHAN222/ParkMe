import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Prompt, useHistory, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import useHttpExit from "../hooks/use-http-exit";
import { calculateBill, exitParking } from "../lib/api";
import AuthContext from "../store/auth-context";
import classes from "./ExitForm.module.css";
import Card from "./UI/Card";
import Input from "./UI/Input";
import LoadingSpinner from "./UI/LoadingSpinner";

const ExitForm = (props) => {
  const authCtx = useContext(AuthContext);
  const transactionIdRef = useRef();
  const [isEntering, setEntering] = useState();
  const history = useHistory();
  const [errorData, setErrorData] = useState();
  const {
    sendRequest,
    status,
    data: total,
    error,
  } = useHttp(calculateBill, true);

  const { sendRequestExit, statusExit } = useHttpExit(exitParking, true);

  useEffect(() => {
    if (status === "completed") {
      history.push("/search");
    }
  }, [statusExit, history]);

  useEffect(() => {
    if (status === "completed" && error) {
      setErrorData(error);
    }
  }, [status, history]);

  const formFocusHandler = (event) => {
    setEntering(true);
  };

  const finishFormHandler = () => {
    setEntering(false);
  };

  const calculateBillhandler = () => {
    const transactionIdRefValue = transactionIdRef.current.value;
    sendRequest({ transactionId: transactionIdRefValue, token: authCtx.token });
  };

  const exitParkingHandler = () => {
    const transactionIdRefValue = transactionIdRef.current.value;
    sendRequestExit({
      transactionId: transactionIdRefValue,
      token: authCtx.token,
    });
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
            <h2>Enter Transaction Id</h2>
          </span>
        </div>
        <form onFocus={formFocusHandler} className={classes.form}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <Input
              ref={transactionIdRef}
              label="Transaction Id : "
              input={{
                id: "vehicleNumber",
                type: "text",
                className: `${classes.control}`,
              }}
            />
          </div>
          {errorData && <p>{errorData}</p>}
          {!total && (
            <div className={classes.actions}>
              <button
                onClick={calculateBillhandler}
                className="btn"
                type="button"
              >
                Calculate Bill
              </button>
            </div>
          )}
          {total && (
            <Fragment>
              <div className="centered">
                <h2>Total: $ {total}</h2>
              </div>
              <div className={classes.actions}>
                <button
                  onClick={exitParkingHandler}
                  className="btn"
                  type="button"
                >
                  Exit Parking
                </button>
              </div>
            </Fragment>
          )}
        </form>
      </Card>
    </Fragment>
  );
};
export default ExitForm;
