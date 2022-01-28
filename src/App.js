import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Movies from "./components/Movies/Movies";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import SavedMovies from "./components/SavedMovies/SavedMovies";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <>
      <Route exact path={["/movies", "/saved-movies", "/profile", "/"]}>
        <Header />
      </Route>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signup">
          <Login />
        </Route>
        <Route path="/signin">
          <Register />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Route exact path={["/movies", "/saved-movies", "/"]}>
        <Footer />
      </Route>
    </>
  );
}

export default App;
