import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

  body {
    background-position: center;
    background-size: cover;
    color: #3e363f;
    font-family: "Roboto", sans-serif;
    height: 100vh;
  }
  .App {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
export default GlobalStyle;
