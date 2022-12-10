import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import { CartContextProvider } from './context/cart';

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
      <GlobalStyle />
    </CartContextProvider>
  );
}

export default App;
