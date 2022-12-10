import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartContext from "../../context/cart";
import logo from "../../assets/rassa-logo.png";
import { Container, HeaderContainer, Cart } from "./styles";

function Header() {
  const { state } = useContext(CartContext);
  console.log(logo);
  const totalQuantity = state.cart.reduce(
    (acc, travel) => acc + travel.quantity,
    0,
  );
  return (
    <Container>
      <HeaderContainer>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Link to="/cart">
          <Cart>
            <div>
              <span>{totalQuantity}</span>
            </div>
            <FaShoppingCart size={36} color="#FFF" />
          </Cart>
        </Link>
      </HeaderContainer>
    </Container>
  );
}

export default Header;
