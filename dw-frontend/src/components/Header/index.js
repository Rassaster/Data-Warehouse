import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/rassa-logo.png";

import UserAuthContext from '../../context/auth';

import { Container, HeaderContainer } from "./styles";
import "./styles.css";

function Header() {
  const { authState } = useContext(UserAuthContext);

  return (
    <Container>
      <HeaderContainer>
        <div className="logo_container">
          <Link className="logo_link" to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      {
        authState.isLoggedIn 
        ? 
          <div className="nav_container">
            <Link className="nav_contacts, nav_element" to="/contacts">Contacts</Link>
            <Link className="nav_companies, nav_element" to="/companies">Companies</Link>
            {authState.isAdmin === "T" ? <Link className="nav_users, nav_element" to="/users">Users</Link> : <></>}
            <Link className="nav_locations, nav_element" to="/locations">Locations</Link>
          </div>
        
        : 
        <></>}
      </HeaderContainer>
    </Container>
  );
}

export default Header;
