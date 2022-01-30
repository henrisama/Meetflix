import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    outline: 0;
    box-sizing: border-box;
    font-family: 'roboto', Arial, Helvetica, sans-serif;
  }

  html, body, #__next, :root{
    width: 100%;
    height: 100%;
  }

  body{
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.text}
  }
`;