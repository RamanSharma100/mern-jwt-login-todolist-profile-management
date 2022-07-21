import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import DashboardNavbarComponent from "../../components/NavbarComponent/DashboardNavbarComponent";
import TodoList from "../../components/TodoList/TodoList";
import {
  loginUserWithToken,
  signOutUser,
} from "../../redux/actionCreators/authActionCreator";

const Dashboard = () => {
  const { token, isAuthenticated } = useSelector(
    (state) => ({
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
    }),
    shallowEqual
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = localStorage.getItem("mjtlpmtoken");
    if (!getUser) {
      dispatch(signOutUser());
      navigate("/login");
      return;
    }

    const decodedToken = jwt_decode(JSON.parse(getUser).token);

    if (decodedToken.exp <= Date.now() / 1000) {
      toast.error("Login session expired! please login again!");
      navigate("/login");
      dispatch(signOutUser());
      return;
    }

    if (!isAuthenticated) {
      dispatch(loginUserWithToken(JSON.parse(getUser)));
    }
  }, [window.location.pathname]);

  return (
    <MDBRow>
      <DashboardNavbarComponent />
      <MDBCol md="12">
        <Routes>
          <Route index path="" element={<TodoList />} />
        </Routes>
      </MDBCol>
    </MDBRow>
  );
};

export default Dashboard;
