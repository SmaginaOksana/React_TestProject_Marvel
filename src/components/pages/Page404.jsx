import ErrorMessage from "../errorMessage/ErrorMessage";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  console.log("error");
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <NavLink
        to="/"
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
        }}
      >
        Back to main page
      </NavLink>
    </div>
  );
};

export default Page404;
