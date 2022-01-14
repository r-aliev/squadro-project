import React from "react";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import squadro_title from "../../assets/images/squadro_title.png";

import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" variant="light" className="header">
      <LinkContainer exact={true} to="/">
        <Navbar.Brand className="col-3 my-4 mr-5 p-5" href="/">
          <img src={logo} height={100} alt="Logo of DigiTop"></img>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Brand className="col-9">
        <img src={squadro_title} width={700} alt="title"></img>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
