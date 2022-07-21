import {
  MDBCollapse,
  MDBContainer,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

const DashboardNavbarComponent = () => {
  const [showBasic, setShowBasic] = useState(false);

  const { isAuthenticted, user } = useSelector(
    (state) => ({
      isAuthenticted: state.auth.isAuthenticated,
      user: state.auth.user,
    }),
    shallowEqual
  );

  const navigate = useNavigate();

  return (
    <MDBNavbar expand="lg" dark bgColor="black">
      <MDBContainer fluid className="px-5">
        <Link to="/dashboard" className="navbar-brand ms-5">
          Dashboard
        </Link>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <FontAwesomeIcon icon={faBars} />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav
            right
            fullWidth={false}
            className="mb-2 d-flex align-items-center me-5 mb-lg-0"
          >
            {isAuthenticted && (
              <MDBNavbarItem>
                <p className="text-white mx-2 my-0 fw-bold">
                  Welcome,{" "}
                  <Link to="/dashboard/profile" className="text-warning ">
                    {user.name}
                  </Link>
                </p>
              </MDBNavbarItem>
            )}
            <MDBNavbarItem className="mx-2">
              <MDBBtn
                size="sm"
                color="primary"
                type="button"
                onClick={() => navigate("/")}
              >
                Home
              </MDBBtn>
            </MDBNavbarItem>
            <MDBNavbarItem className="mx-2">
              <MDBBtn size="sm" color="success" type="button">
                Logout
              </MDBBtn>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default DashboardNavbarComponent;
