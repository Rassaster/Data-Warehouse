import styled from 'styled-components';

export const Container = styled.main`
  position: relative;
  width: 100%;
  padding: 25px 20px;
  height: 110vh;
  // max-height: calc(90vh - 110px);

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
export const SelectedContactsActions = styled.div`
  align-self: end;
  width: 30%;
  margin: 0; 
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #9f0000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .contactsCounter {
    font-weight: 700;
  }
  
  button {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid #000;
    border-radius: 5px;
    padding: 8px;
    background: unset;
    transition: all .3s ease-in-out;
  }
  .contacts-Delete:hover {
    font-weight: 700;
    color: #fff;
    border-color: red;
    background: red;
  }
`;

export const SearchCont = styled.div`
border-radius: 5px;
width: 30%;
position: relative;

.searchInputCont {
    border: 2px solid grey;
    border-radius: 5px;
    width: 100%;
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }
  .searchInputCont:hover {
    background: grey;
  }
  
  .searchForm {
    background: white;
    position: absolute;
    z-index: 20;
    overflow-y: hidden;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    width: 100%;
    transition: all .5s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .filterInputLabel {
      padding: 5px 20px;
      display: flex;
      justify-content: start;


      label,
      input,
      select {
        width: 50%;
      }
    } 

    .searchNameCont {
      align-items: center;
      
      input {
        height: 25px;
      }

      button {
        margin-left: 3px;
        height: 25px;
      }
    }

    .filterActionBtns {
      justify-content: space-around;
      button {
        width: 43%;
      } 
    }
    button {
      border: 2px solid black;
      background: white;
      padding: 10px;
      border-radius: 5px;
      color: black;
      font: normal normal 700 normal 12px/12px sans-serif;
      transition: all .3s ease-in-out;
    }
    button:hover {
      background: black;
      color: white;
    }
  }
  .formOpen {
    padding: 20px;
    height: 300px;
    border: 2px solid grey;
    border-top: none;
    box-shadow: 11px 11px 45px -9px rgba(0,0,0,0.75);
  }
  .formClosed {
    border-width: 0;
    height: 0px;

  }
`;

export const ActionBtnsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    width: 12%;
    font-weight: 700;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 2px solid #000;
    border-radius: 5px;
    padding: 10px;
    background: unset;
    transition: all .3s ease-in-out;
  }
  button:hover {
    border-color: royalblue;
    background: royalblue;
    color: white;
  }
`;

export const ContactsTable = styled.div`
position: relative;
border: 2px solid #78866b;
border-radius: 5px;
width: 100%;
margin: 0; 

overflow-y: scroll;
display: grid;
`;
export const TableHeadRow = styled.div`
z-index: 10;
position: sticky;
top: 0;
display: grid;
grid-template-columns: 0.2fr 0.7fr 0.8fr 0.6fr 0.4fr 0.5fr 0.4fr;
background: #78866b;
padding: 20px 20px;
justify-content: center;

.addRemoveContact {
  cursor: pointer;
}

h5 {
  display: flex;
  align-items: center;
  font: normal normal 700 normal 16px/120% sans-serif;
  color: #fff;
  transition: all .2s ease-in-out;
}
h5:hover {
  cursor: pointer;
  color: green;
  text-decoration: underline;
}
`;
export const TableContactRow = styled.div`
:hover,
:nth-child(2n):hover {
  background: pink;
}

:nth-child(2n) {
  background: unset;
}

display: grid;
grid-template-columns: 0.2fr 0.7fr 0.8fr 0.6fr 0.4fr 0.5fr 0.4fr;
border-top: 1px solid #000;
height: 70px;
padding: 0 20px;
align-items: center;
background: #9aab8a;
transition: all .3s ease-in-out;

.addRemoveContact {
  cursor: pointer;
}
.emailChart {
  font-size: 12px;
  opacity: 0.8;
}

.contacts-ActionBtns {
  position: relative;
  display: flex;
  gap: 8px;

  .dots {
    font-weight: 700;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity .3s ease-in-out;
    left: 15%;
    
  }
  button {
    opacity: 0;
    transition: opacity .3s ease-in-out;
  }
}
:hover .dots,
:nth-child(2n):hover .dots {
  opacity: 0;
  z-index: -10;
}
:hover button,
:nth-child(2n):hover button {
  opacity: 1;
}

button {
  border: 2px solid #000;
  border-radius: 5px;
  padding: 2px;
  background: unset;
  transition: all .3s ease-in-out;
}
.contacts-Delete:hover {
  color: #fff;
  border-color: red;
  background: red;
}
.contacts-Update:hover {
  color: #fff;
  border-color: royalblue;
  background: royalblue;
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
  min-width: 95vw;
  min-height: 92vh;
  padding: 20px 20px;
  display: grid;
  gap: 10px 0;
  grid-template-columns: 1fr 1fr;
  background: rgba(120, 134, 107, 1);
  align-items: center;

  h2 {
    grid-column: 1 / -1;
  }

  .closeEdit {
    position: absolute;
    top: 5px;
    left: unset;
    right: 5px;
    width: fit-content;
    height: fit-content;
  }

  .confirmDeletion {
    position: absolute;
    left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
    width: 40%;
    heigth: 50%;
    border: 2px solid red;
    border-radius: 5px;
    padding: 30px;
    margin: 0 auto;

    h3 {
      margin: 0 auto;
      text-align: center;
      margin-bottom: 10px;
    }

    button {
      font-wight: 700;
      width: 50%;
      transition: all .3s ease-in-out;
      height: 33px;
      border-radius: 5px;
    }
    .yesDelete:hover {
      background: red;
      border-color: red;
      color: white;
    }
    .noCancel:hover {
      background: royalblue;
      border-color: royalblue;
      color: white;
    }
  }


`;
export const PrimaryContactInformation = styled.div`
flex-wrap: wrap;
  border: 2px solid green;
  background: #00800078;
  border-radius: 5px;
  padding: 10px;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 18px;

  .primayLabelInputContact {
    display: flex;
    flex-direction: column;
  }

  .locationContainer {
    display: flex;
    gap: 5px;
    align-items: end;

    div {
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid grey;
      border-radius: 5px;
      height: 36px;


      h4 {
        color: green;
      }
    }
  }  
`;
export const SecundaryContactInformation = styled.div`
  border: 2px solid orange;
  background: #ffa50057;
  border-radius: 5px;
  padding: 10px;
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  
  .interestContactCont {
    display: flex;
    flex-direction: column;
    width: 100%;
    
    select {
      width: 20%;
    }
  }
  `;
  
export const ContactChannels = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 18px;
  
  .channelContactCont {
    display: flex;
    flex-direction: column;

    button {
      width: 80%;
      height: 32px;
    }
  }
  .channelAdded {
    color: green;
    text-align: center;
    width: 100%;
  }
  .channelContactContEditBtns {
    display: flex;
    gap: 10px;
    button {
      width: 35%;
    }
  }
`;
export const InputLabelContainer = styled.div`
  width: 45%;

  label {
    font: normal normal 700 normal 14px/120% sans-serif;
  }

  
  select,
  input {
    border: 2px solid transparent;
    height: 30px;
    padding: 2px 5px;
    border-radius: 5px;

    transition: all .3s ease-in-out;
  }
  select:focus,
  input:focus {
    border: 2px solid #78866b;
  }

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

  button:hover,
  button:focus {
    background: #000;
    color: #fff;
  }
  button[disabled] {
    opacity: 0.4
  }
  button[disabled]:hover {
    cursor: not-allowed;
    background: #fff;
    color: #000;
  }

  div {
    margin-top: 10px;
    width: 180%;
    font: normal normal 700 normal 14px/120% sans-serif;
  }

  .typeContactChannel {
    font: normal normal 700 normal 18px/120% sans-serif;
    color: royalblue;
  }

`;
export const deleteConfirmPopup = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border: 1px solid red;
  background: red;
`;