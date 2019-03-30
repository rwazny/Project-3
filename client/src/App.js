import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Meal from "./pages/Meal";
import Dashboard from "./pages/Dashboard";
//import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/meal" component={Meal} />
          <Route exact path="/dashboard" component={Dashboard} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;