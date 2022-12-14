import styled from 'styled-components';

export const Container = styled.main`
  position: relative;
  width: 100%;
  padding: 25px 20px;
  height: 100vh;
  max-height: calc(90vh - 60px);

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
export const RegionsList = styled.div`
  
  border: 2px solid #78866b;
  border-radius: 5px;
  margin: 0 auto;
  padding: 15px;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: scroll;
  `
  export const RegionItem = styled.div`
  display: flex;
  border: 2px solid royalblue;
  border-radius: 5px;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 20px;
  
  >h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background: royalblue;
    padding: 10px 15px 10px 10px;
  }

`
  export const CountryItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid orange;
  gap: 15px;
  margin: 0 auto;
  width: 95%;
  padding-bottom: 20px;
  
  >h4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background: orange;
    padding: 10px 5px 10px 10px;
  }
`
export const CityItem = styled.div`
  margin: 0 auto;
  width: 95%;

  >h5 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 1px solid black;

    .cityBtns {
      width: 15%;
      justify-content: space-evenly;
    }
  }
`

export const ActionBtnsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 25%;

  button {
    border: 2px solid #000;
    border-radius: 5px;
    padding: 2px;
    background: unset;
    transition: all .3s ease-in-out;
  }

  .region-Delete:hover,
  .country-Delete:hover,
  .city-Delete:hover {
    color: #fff;
    border-color: red;
    background: red;
  }
  .region-Edit:hover,
  .country-Edit:hover,
  .city-Edit:hover  {
    color: #fff;
    border-color: blue;
    background: blue;
  }
  
  .region-Add-Country:hover,
  .country-Add-City:hover {
    color: #fff;
    border-color: green;
    background: green;
  }

  .region-Add-Region {
    border-color: royalblue;
    font-weight: 700;
    width: 90%;
    height: 30px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .region-Add-Region:hover {
    color: white;
    background-color: royalblue;
  }
`



// CREATE REGION POPUP
export const OverlayForm = styled.div`
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

export const RegionForm = styled.div`
  position: relative;
  border: 3px solid green;
  margin: 30px auto 0;
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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
    margin-top: 8px;
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


  button {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130%;
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