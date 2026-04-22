import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "./Styles/global";
import { Router } from "./Router";
import { blackTheme } from "./Styles/themes/blackTheme";
import { AuthProvider } from "./contexts/auth";
import { NotificationProvider } from "./contexts/notifications";
import { SiteVisitorTracker } from "./features/robot/components/SiteVisitorTracker";
import { RobotNavigationTracker } from "./features/robotConversation/components/RobotNavigationTracker";

function App() {

  return (
    <div className="App">
        <ThemeProvider theme={blackTheme}>
          <BrowserRouter>
            <AuthProvider>
              <NotificationProvider>
                <RobotNavigationTracker />
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
