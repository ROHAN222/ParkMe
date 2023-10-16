import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AssignSlot from "./pages/AssignSlot";
import AuthPage from "./pages/AuthPage";
import Exit from "./pages/Exit";
import FindSlot from "./pages/FindSlot";
import AuthContext from "./store/auth-context";
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn && <Redirect to="/search" />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/search" exact>
          {isLoggedIn && <FindSlot />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/assign/:slotId/:type" exact>
          {isLoggedIn && <AssignSlot />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/exit" exact>
          {isLoggedIn && <Exit />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
