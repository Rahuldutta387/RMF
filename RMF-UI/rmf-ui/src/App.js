import "./App.css";
import { MainPage } from "./components/MainPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SigninPage from "./components/SigninPage";
import AdminPage from "./components/adminPage";
import RMFPage from "./components/RMFPage";

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
          <Route exact path="/admin">
            <AdminPage></AdminPage>
          </Route>
          <Route exact path="/rmf">
            <RMFPage></RMFPage>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
