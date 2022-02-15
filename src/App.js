import { useState, useCallback, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CurrentUserContext from './Context/CurrentUserContext';
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
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [filterMovies, setFilterMovies] = useState([]);
  const [editIsSuccess, setEditIsSuccess] = useState(false);
  const [editIsFailed, setEditIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  const [query, setQuery] = useState('');

  const tokenCheck = useCallback(() => {
    mainApi
      .getUserInfo()
      .then((res) => {
        if (res.message) {
          throw new Error(res.message);
        } else {
          setLoggedIn(true);
          setCurrentUser(res);
          localStorage.setItem('currentUser', JSON.stringify(res));
          if (location.pathname === '/signin' || location.pathname === '/signup') {
            history.push('/movies');
          } else {
            history.push(location.pathname);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        history.push('/');
      });
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  const signInHandler = (email, password) => {
    mainApi
      .authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
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

  const signOutHandler = () => {
    mainApi
      .signOut()
      .then((res) => {
        if (res.message) {
          throw new Error(res.message);
        } else {
          localStorage.removeItem('currentUser');
          setLoggedIn(false);
          setCurrentUser({});
          localStorage.removeItem('movies');
          localStorage.removeItem('savedMovies');
          setMovies([]);
          setSavedMovies([]);
          setFilterMovies([]);
          setFilterSavedMovies([]);
          history.push('/');
        }
      })
      .catch((e) => console.log(e));
  };
  
  const userUpdateHandler = (data) => {
    const { name, email } = data;
    mainApi
      .editProfile(email, name)
      .then((data) => {
        setCurrentUser(data);
        setEditIsSuccess(true);
        setEditIsFailed(false);
        setTimeout(() => {
          setEditIsSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setEditIsFailed(true);
        setTimeout(() => {
          setEditIsFailed(false);
        }, 3000);
      });
  };

  const getAllMovies = () => {
    api
    .getMovies()
      .then((data) => {
        const allMoviesData = data.map((item) => {
          const imageURL = item.image ? item.image.url : '';
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          };
        });
        localStorage.setItem('movies', JSON.stringify(allMoviesData));
        setMovies(allMoviesData);
      })
      .catch(() => {
        localStorage.removeItem('movies');
        setLoadingError('Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз');
      });
  }

  const getSavedMovies = () => {
    mainApi
      .getMyMovies()
      .then((data) => {
        const savedArray = data.map((item) => ({ ...item, image: item.image, id: item.movieId }));
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
      .catch(() => {
        localStorage.removeItem('savedMovies');
        setLoadingError('Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз');
      });
  }

  useEffect(() => {
    const moviesArr = JSON.parse(localStorage.getItem('movies'));
    if (moviesArr) {
      setFilterMovies(moviesArr);
    } else {
      getAllMovies();
    }

    const saved = JSON.parse(localStorage.getItem('savedMovies'));
    if (saved) {
      setSavedMovies(saved);
    } else {
      getSavedMovies();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getAllMovies();
      getSavedMovies();
    }
  }, [loggedIn]);

  const isMovieAdded = (movie) => savedMovies.some((item) => item.movieId === movie.id);
  
  const searchFilter = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      const filterData = data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      if (filterData.length === 0) {
        setLoadingError('Ничего не найдено');
      } else {
        setLoadingError('');
      }
      return filterData;
    }
    return [];
  };

  const searchHandler = (searchQuery) => {
    setIsLoading(true);
    setTimeout(() => {
      setQuery(searchQuery);
      setFilterMovies(searchFilter(movies, searchQuery));
      setIsLoading(false);
    }, 600);
  };

  const addMovies = (movie) => {
    mainApi
      .saveMovies(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeMovie = (movie) => {
    const movieId = savedMovies.find((item) => item.id === movie.id)._id;
    mainApi
      .deleteMovies(movieId)
      .then((res) => {
        if (res) {
          const newArray = savedMovies.filter((item) => item.movieId !== res.movieId);
          setSavedMovies(newArray);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const actionHandler = (data, isAdded) => (isAdded ? addMovies(data): removeMovie(data));

  useEffect(() => {
    setFilterSavedMovies(searchFilter(savedMovies, query));
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, query]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Route exact path={["/movies", "/saved-movies", "/profile", "/"]}>
        <Header isLoggedIn={loggedIn} />
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
        <ProtectedRoute path="/movies" isLoading={isLoading} loadingError={loadingError} onActionClick={actionHandler} isMovieAdded={isMovieAdded} savedMovies={false} component={Movies} onSubmitSearch={searchHandler} movies={filterMovies} loggedIn={loggedIn} />
        <ProtectedRoute path="/saved-movies" isLoading={isLoading} loadingError={loadingError} savedMovies onActionClick={actionHandler} isMovieAdded={isMovieAdded} component={SavedMovies} loggedIn={loggedIn} movies={savedMovies}/>
        <ProtectedRoute path="/profile" editIsSuccess={editIsSuccess}
              editIsFailed={editIsFailed} loadingError={loadingError} component={Profile} loggedIn={loggedIn} onSignOut={signOutHandler} onUpdate={userUpdateHandler} />
        <Route component={NotFound} />
      </Switch>
      <Route exact path={["/movies", "/saved-movies", "/"]}>
        <Footer />
      </Route>
    </CurrentUserContext.Provider>
  );
}

export default App;
