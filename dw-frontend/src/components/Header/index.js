import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/cart";
import logo from "../../assets/rassa-logo.png";
import { Container, HeaderContainer } from "./styles";
import "./styles.css";

function Header() {
  const { state } = useContext(CartContext);

  return (
    <Container>
      <HeaderContainer>
      <div className="logo_container">
        <Link className="logo_link" to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="nav_container">
        <Link className="nav_contacts, nav_element" to="/contacts">Contacts</Link>
        <Link className="nav_companies, nav_element" to="/companies">Companies</Link>
        <Link className="nav_users, nav_element" to="/users">Users</Link>
        <Link className="nav_locations, nav_element" to="/locations">Locations</Link>
      </div>
      </HeaderContainer>
    </Container>
  );
}

export default Header;
