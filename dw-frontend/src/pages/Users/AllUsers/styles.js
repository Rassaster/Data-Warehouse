import styled from 'styled-components';

export const Container = styled.main`
  position: relative;
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
export const Head = styled.div`
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


export const UsersTable = styled.div`
position: relative;
border: 2px solid #78866b;
border-radius: 5px;
width: 100%;
margin: 0; 

overflow-y: scroll;
display: grid;
`;
export const TableHeadRow = styled.div`
position: sticky;
top: 0;
display: grid;
grid-template-columns: 1fr 1fr 1fr 0.5fr 0.5fr;
background: #78866b;
padding: 20px 20px;
// border: 1px solid black;
justify-content: center;


h5 {
  font: normal normal 700 normal 16px/120% sans-serif;
  color: #fff;
}
}
`;
export const TableUserRow = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 0.5fr 0.5fr;
border-top: 1px solid #000;
height: 35px;
padding: 0 20px;
align-items: center;
background: #9aab8a;

:nth-child(2n) {
  background: unset;
}

.users-ActionBtns {
  display: flex;
  gap: 8px;
}
button {
  border: 2px solid #000;
  border-radius: 5px;
  padding: 2px;
  background: unset;
  transition: all .3s ease-in-out;
}
.users-Delete:hover {
  color: #fff;
  border-color: red;
  background: red;
}
.users-Update:hover {
  color: #fff;
  border-color: royalblue;
  background: royalblue;
}
}
`;


export const OverlayUpdate = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(120, 134, 107, 0.5);
  transition: all .3s ease-in-out;
  transform: translate(-50%, -50%);
  overflow: hidden;
  z-index: 100;
`;
export const FormContainer = styled.div`
  position: relative;
  border: 3px solid royalblue;
  margin: 30px auto 0;
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  padding: 20px 20px;
  display: grid;
  gap: 10px 0;
  grid-template-columns: 1fr 1fr;
  background: rgba(120, 134, 107, 1);

  .isAdminInput {
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }

  .closeEdit {
    position: absolute;
    top: 5px;
    left: unset;
    right: 5px;
    width: fit-content;
    height: fit-content;
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