import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import { UserAuth_ContextProvider } from './context/auth';

function App() {
  return (
    <UserAuth_ContextProvider>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
      <GlobalStyle />
    </UserAuth_ContextProvider>
  );
}

export default App;
