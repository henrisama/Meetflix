import styled from 'styled-components';

const Card = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 50px;
  background-image: url('/img/default-user-image.png');
  background-position: center;
  background-size: cover;

  :hover{
    cursor: pointer;
  }
`;

const CardName = styled.h1`
  color: black;

`;

export {Card, CardName};