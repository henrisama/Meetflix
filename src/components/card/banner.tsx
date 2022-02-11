import styled from 'styled-components';

interface CardInterface{
  image_path?: string
}

const Card = styled.div<CardInterface>`
  margin: 10px;
  width: 200px;
  height: 300px;
  background-image: url(${(props) => 	props.image_path ? 'https://image.tmdb.org/t/p/w500/' + props.image_path : '' }); 
  background-position: center;
  background-size: cover;
  border-radius: 20px;

  transition: all 0.4s linear;
  -webkit-transition: all 0.4s linear;

  :hover{
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
  }
`;

const CardTitle = styled.h3`
  text-align: start;
  padding: 10px 0px;
`;

const CardDescribe = styled.div`
  padding: 5px 0px;
  display: flex;
  font-size: 10pt;
  text-align: start;
  justify-content: start;
  font-size: 8pt;
`;

const CardOverview = styled.p`
  padding: 5px 0px 0px 0px;
  text-align: start;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10pt;
`;

export {Card, CardTitle, CardDescribe, CardOverview};
