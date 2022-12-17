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

export const Actions = styled.div`

  width: 250px;
  height: 120px;
  border: 1px solid green;
  border-radius: 5px;
  margin: 100px auto 0;
  padding: 20px;

  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  a {
    color: blue;
    border: 1px solid black;
    background: white;
    color: black;
    height: 33px;
    padding: 8px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    transition: all .3s ease-in-out;
  }

  a:hover {
    background: black;
    color: white;
  }
`;