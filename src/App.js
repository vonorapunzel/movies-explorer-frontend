import { useState, useCallback, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Movies from "./components/Movies/Movies";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import SavedMovies from "./components/SavedMovies/SavedMovies";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import "./App.css";
import api from './utils/MoviesApi';
import mainApi from './utils/MainApi';

function App() {
  const history = useHistory();
  const location = useLocation()
  const [movies, setMovies] = useState([]);
  const [savedMovie, setSavedMovie] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  const tokenCheck = useCallback(() => {
    mainApi
      .getUserInfo()
      .then((res) => {
        if (res.message) {
          throw new Error(res.message);
        } else {
          setLoggedIn(true);
          setCurrentUser(res);
          if (location.pathname === '/signin' || location.pathname === '/signup') {
            history.push('/movies');
          } else {
            history.push(location.pathname);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        history.push('/signin');
      });
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck, history]);



  const getCurrentUser = () => {
    mainApi
      .getUserInfo()
      .then((userData) => {
          setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signInHandler = (email, password) => {
    mainApi
      .authorize(email, password)
      .then(() => {
          history.push('/movies')
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signUpHandler = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        signInHandler(email, password);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getSavedMovies = () => {
    mainApi
      .getMyMovies()
      .then((data) => {
        const savedArray = data.map((item) => ({ ...item, id: item.movieId }));
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovie(savedArray);
      })
      .catch((err) => console.error(err));
  };

  const getMovies = () => {
    api
    .getMovies()
      .then((data) => {
        localStorage.setItem('allMovies', JSON.stringify(data));
        setMovies(data);
      })
      .catch((err) => console.error(err));
  }

useEffect(() => {
    getMovies();
}, [])

  return (
    <>
      <Route exact path={["/movies", "/saved-movies", "/profile", "/"]}>
        <Header />
      </Route>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signin">
          <Login signInHandler={signInHandler} />
        </Route>
        <Route path="/signup">
          <Register signUpHandler={signUpHandler} />
        </Route>
        <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} />
        <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} />
        <ProtectedRoute path="/profile" component={Profile} loggedIn={loggedIn} />
        <Route component={NotFound} />
      </Switch>
      <Route exact path={["/movies", "/saved-movies", "/"]}>
        <Footer />
      </Route>
    </>
  );
}

export default App;
