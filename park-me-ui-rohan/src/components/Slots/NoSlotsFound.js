import { Link } from "react-router-dom";
import classes from "./NoSlotsFound.module.css";

const NoSlotsFound = () => {
  return (
    <div className={classes.noslots}>
      <p>No slots found!</p>
      <Link className="btn" to="/park">
        Go Back
      </Link>
    </div>
  );
};

export default NoSlotsFound;
