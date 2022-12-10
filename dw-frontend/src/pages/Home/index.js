import React, { useEffect, useState, useContext } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import CartContext from '../../context/cart';
import { Container, List, Unit } from './styles';
import api from '../../services/api';

function Home() {
  const [travelList, setTravelList] = useState([]);
  const { state, setState } = useContext(CartContext);

  useEffect(() => {
    async function getTravelList() {
      const { data } = await api.get('/travels');
      setTravelList(data);
    }
    getTravelList();
  }, []);

  function handleAddToCart(travel) {
    const copyCart = [...state.cart];
    let copytTotalCost = state.totalCost;
    const travelIndex = copyCart.findIndex((el) => el.id === travel.id);
    if (travelIndex >= 0) {
      copyCart[travelIndex].quantity += 1;
      copyCart.map((el) => {
        copytTotalCost += Number(el.quantity * el.price);
        return copytTotalCost;
      });
    } else {
      copyCart.push({ ...travel, quantity: 1 });
      copytTotalCost = Number(travel.price);
    }

    setState({
      cart: copyCart,
      totalCost: copytTotalCost,
    });
  }
  return (
    <Container>
      <List>
        {travelList.map((el) => (
          <Unit key={el.id}>
            <img src={el.photo} alt="travel" />
            <p>{el.title}</p>
            <strong>{el.price}</strong>

            <button type="button" onClick={() => handleAddToCart(el)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
              </div>
              <span>Agregar al carrito YA</span>
            </button>
          </Unit>
        ))}
      </List>
    </Container>
  );
}

export default Home;
