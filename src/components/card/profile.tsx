import styled from 'styled-components';

const Card = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 50px;
  /* background-image: url('/img/default-user-image.png');
  background-position: center;
  background-size: cover; */
  background-color: #a53030;

  :hover{
    cursor: pointer;
  }

  //tablet
  @media(max-width: 1400px){
    height: 200px;
    width: 200px;
  }

  //mobile
  @media(max-width: 600px){
    height: 150px;
    width: 150px;
  }
`;

const CardName = styled.h1`
  color: white;
  text-align: center;

`;

export {Card, CardName};