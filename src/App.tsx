import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "./Styles/global";
import { Router } from "./Router";
import { blackTheme } from "./Styles/themes/blackTheme";
import { AuthProvider } from "./contexts/auth";
import { NotificationProvider } from "./contexts/notifications";
import { AdminPresenceTracker } from "./features/robot/components/AdminPresenceTracker";
import { SiteVisitorTracker } from "./features/robot/components/SiteVisitorTracker";

function App() {

  return (
    <div className="App">
        <ThemeProvider theme={blackTheme}>
          <BrowserRouter>
            <AuthProvider>
              <NotificationProvider>
                <AdminPresenceTracker />
                <SiteVisitorTracker />
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
