import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "./Styles/global";
import { Router } from "./Router";
import { blackTheme } from "./Styles/themes/blackTheme";

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
