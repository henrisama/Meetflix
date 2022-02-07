import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-template-rows: auto;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    justify-items: center;
    align-items: center;
    
    //tablet
    @media(max-width: 1100px){
      grid-template-columns: auto auto auto;
    }

    //mobile
    @media(max-width: 700px){
      grid-template-columns: auto auto;
    }
`;