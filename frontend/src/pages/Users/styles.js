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