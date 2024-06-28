import "./App.css";
import { MainPage } from "./components/MainPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SigninPage from "./components/SigninPage";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <MainPage></MainPage>
          </Route>
          <Route exact path="/Signin">
            <SigninPage></SigninPage>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
