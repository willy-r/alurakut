/* 
  Esse arquivo normalmente guarda estilos genéricos.
  Por exemplo padrões ou resets utilizados no projeto.
*/

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Rubik, sans-serif;;
    background-color: #D9E6F6;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  ul { list-style-type: none; }

  button,
  input { font-family: inherit; }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <title>Alurakut</title>
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
