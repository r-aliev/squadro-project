import React from "react";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../../assets/images/logo.jpg";

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="light"
      className="header"
    >
      <LinkContainer exact={true} to="/">
        <Navbar.Brand className="col-3 mr-0" href="#home">
          <img src={logo} height={100} alt="Logo of DigiTop"></img>
        </Navbar.Brand>
      </LinkContainer>
      
        <Navbar.Text className="col-6">
          <h1 id="squadro-title">Squadro ...</h1>
        </Navbar.Text>
        <Navbar.Toggle className="mr-3 position-absolute d-md-none" />
        <LinkContainer exact={true} to="/sign-in">
          <Nav.Link href="#" className="ml-auto mr-3 d-none d-md-block">
            SignIn
            <span className="ml-2">
              <FontAwesomeIcon icon={faSignInAlt} />
            </span>
          </Nav.Link>
        </LinkContainer>
        {/*
        <NavDropdown
          // 	title={user.firstname + " " + user.lastname}
          id="collasible-nav-dropdown"
          className="ml-auto mr-3 d-none d-md-block"
        >
          <NavDropdown.Item className="pt-0 pb-0">
            <div className="pt-0 pb-0 p-0">
              Exit
              <span className="ml-2">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
            </div>
          </NavDropdown.Item>
        </NavDropdown>
         */}
     
    </Navbar>
  );
};

export default Header;
