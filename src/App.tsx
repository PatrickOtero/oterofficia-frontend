import { ThemeProvider } from "styled-components"
import { BrowserRouter, useNavigate } from "react-router-dom"
import { GlobalStyle } from "./Styles/global";
import { Router } from "./Router";
import { blackTheme } from "./Styles/themes/blackTheme";
import { useEffect } from "react";

function App() {

  return (
    <div className="App">
        <ThemeProvider theme={blackTheme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>          
          <GlobalStyle/>
        </ThemeProvider>
    </div>
  );
}

export default App;
