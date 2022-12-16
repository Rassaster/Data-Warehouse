import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  padding: 25px 0;
  height: 100vh;
  max-height: calc(90vh - 110px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = styled.div`
  width: 350px;
  height: 350px;
  border: 2px solid #78866b;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(120, 134, 107, 0.6);
  
  h2 {
    margin-bottom: 8px;
  }
  h5 {
    margin-bottom: 3px;
  }
  h6 {
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #000;
    margin-bottom: 25px;
    padding-bottom: 8px;
  }
  label {
    font: normal normal 700 normal 14px/120% sans-serif;
  }

  input {
    width: 65%;
    height: 30px;
    margin: 5px 0 20px;
    padding: 0 5px;
    border-radius: 5px;
    border: none;
    transition: all .3s ease-in-out;
  }
  input:focus {
    border: 2px solid #78866b;
  }

  button {
    margin-top: 25px;
    width: 65%;
    height: 30px;
    border-radius: 5px;
    border: none;
    background: #fff;
    border: 2px solid #000;
    color: #000;
    transition: all 0.3s ease-in-out;
    font: normal normal 700 normal 14px/120% sans-serif;
  }
  button:hover,
  button:focus {
    background: #000;
    color: #fff;
  }
`;

export const LoadingAnimationContainer = styled.div `
  width: 0;
  height: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(120, 134, 107, 0.8);
  transition: all .3s ease-in-out;
  transform: translate(-50%, -50%);
  overflow: hidden;
  z-index: 100;
`
export const IconContainer = styled.div `
  animation: sunRotation 2s linear infinite;
`