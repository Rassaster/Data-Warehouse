import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  padding: 25px 20px;
  height: 100vh;
  max-height: calc(90vh - 110px);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  > a {
    color: green;
    font: normal normal 700 normal 12px/12px sans-serif;
    transition: all .3s ease-in-out;
  }
  > a:hover {
    text-decoration: underline;
  } 
`;
export const Head = styled.main`
  border-bottom: 2px solid #78866b;
  width: 100%;
  margin: 0 
  padding: 10px 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;
export const FormContainer = styled.div`
  border: 2px solid #78866b;
  margin: 30px auto 0;
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  padding: 20px 20px;
  display: grid;
  gap: 10px 0;
  grid-template-columns: 1fr 1fr;
  background: rgba(120, 134, 107, 0.6);

  .isAdminInput {
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }
`;
export const InputLabelContainer = styled.div`
  width: 45%;

  label {
    font: normal normal 700 normal 14px/120% sans-serif;
  }

  input {
    border: 2px solid transparent;
    height: 30px;
    padding: 2px 5px;
    border-radius: 5px;

    transition: all .3s ease-in-out;
  }
  input:focus {
    border: 2px solid #78866b;
  }
  label[for="isAdmin"],
  input[type="checkbox"] {
    cursor: pointer;
  }

  .linkBtn,
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110%;
    height: 30px;
    border-radius: 5px;
    border: none;
    background: #fff;
    border: 2px solid #000;
    color: #000;
    transition: all 0.3s ease-in-out;
    font: normal normal 700 normal 14px/120% sans-serif;
  }
  .linkBtn {
    margin-top: 10px;
    color: green;
  }
  .linkBtn:hover,
  .linkBtn:focus,
  button:hover,
  button:focus {
    background: #000;
    color: #fff;
  }
  .disabledBtn {
    pointer-events: none;
    background-color: gray;
    border-color: gray;
    color: #CCC;
  }
  .linkBtn:hover,
  .linkBtn:focus {
    color: #fff;
    background: green;
    border-color: green;
  }
  div {
    margin-top: 10px;
    width: 180%;
    font: normal normal 700 normal 14px/120% sans-serif;
  }
`;