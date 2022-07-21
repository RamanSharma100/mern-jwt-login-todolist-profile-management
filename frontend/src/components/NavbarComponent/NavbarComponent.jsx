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

const NavbarComponent = () => {
  const [showBasic, setShowBasic] = useState(false);

  const navigate = useNavigate();

  return (
    <MDBNavbar expand="lg" light bgColor="white">
      <MDBContainer fluid className="px-5">
        <Link to="/" className="navbar-brand ms-5">
          MERN Todo List
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
            <MDBNavbarItem className="mx-2">
              <MDBBtn
                size="sm"
                color="primary"
                type="button"
                onClick={() => navigate("/login")}
              >
                Login
              </MDBBtn>
            </MDBNavbarItem>
            <MDBNavbarItem className="mx-2">
              <MDBBtn
                size="sm"
                color="success"
                type="button"
                onClick={() => navigate("/register")}
              >
                Register
              </MDBBtn>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavbarComponent;
