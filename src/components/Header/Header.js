import React from "react";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import squadro_title from "../../assets/images/squadro_title.png";

import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <Navbar expand="lg" variant="light" className="header">
      <Container>
        <LinkContainer className="col-3" exact={true} to="/">
          <Navbar.Brand className="d-none d-lg-block my-4 mr-5 p-5" href="/">
            <img src={logo} height={100} alt="Logo of DigiTop"></img>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Brand className="col-9">
          <img src={squadro_title} width={550} alt="title"></img>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
