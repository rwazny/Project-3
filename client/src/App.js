import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Meal from "./pages/Meal";
//import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Meal} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

