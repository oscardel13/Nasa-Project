import {
  BrowserRouter as Router, Route,
} from "react-router-dom";
import {
  Arwes,
  SoundsProvider,
  ThemeProvider,
  createSounds,
  createTheme,
} from "arwes";

import AppLayout from "./pages/AppLayout";

import { theme, resources, sounds } from "./settings";
import Auth from "./pages/Auth";

const App = () => {
  return <ThemeProvider theme={createTheme(theme)}>
    <SoundsProvider sounds={createSounds(sounds)}>
      <Arwes animate background={resources.background.large} pattern={resources.pattern}>
        {anim => (
          <Router>
            <Route exact path="/">
              <Auth/>
            </Route>
            <Route path="/dashboard">
              <AppLayout show={anim.entered} />
            </Route>
            
          </Router>
        )}
      </Arwes>
    </SoundsProvider>
  </ThemeProvider>;
};

export default App;
