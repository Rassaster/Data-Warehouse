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