import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "./Styles/global";
import { Router } from "./Router";
import { blackTheme } from "./Styles/themes/blackTheme";
import { AuthProvider } from "./contexts/auth";
import { NotificationProvider } from "./contexts/notifications";

function App() {

  return (
    <div className="App">
        <ThemeProvider theme={blackTheme}>
          <BrowserRouter>
            <AuthProvider>
              <NotificationProvider>
                <Router />
              </NotificationProvider>
            </AuthProvider>
          </BrowserRouter>          
          <GlobalStyle/>
        </ThemeProvider>
    </div>
  );
}

export default App;
