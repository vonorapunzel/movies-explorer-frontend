import { useState, useEffect } from "react";
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
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [setFilterMovies] = useState([]);
  const [editIsSuccess, setEditIsSuccess] = useState(false);
  const [editIsFailed, setEditIsFailed] = useState(false);
  const [isLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [setFilterSavedMovies] = useState([]);
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedSave, setCheckedSave] = useState(false);

  const getUser = () => {
    mainApi
      .getUserInfo()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        if (location.pathname === '/signin' || location.pathname === '/signup') {
          history.push('/movies');
        } else {
          history.push(location.pathname);
        }
      })
      .catch((e) => {
        console.log(e);
        history.push('/');
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const signInHandler = (email, password) => {
    mainApi
      .authorize(email, password)
      .then(() => {
        getAllMovies();
        getSavedMovies();
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
        setIsSignUpError(true)
        console.error(err);
      });
  }

  const signOutHandler = () => {
    mainApi
      .signOut()
      .then(() => {
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
      .catch(() => {
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
    const checkboxMovie = JSON.parse(localStorage.getItem('checkboxMovie'))
    const moviesArr = JSON.parse(localStorage.getItem('filterData'));
    if (moviesArr) {
      setMovies(moviesArr);
    } 
    if (checkboxMovie) {
      setChecked(true);
      setMovies(checkboxMovie)
    } else {
      getAllMovies()
    }

    const checkboxMovieSave = JSON.parse(localStorage.getItem('checkboxMovieSave'))
    const saved = JSON.parse(localStorage.getItem('filterDataSave'));
    if (saved) {
      setSavedMovies(saved);
    } 
    if (checkboxMovieSave) {
      setCheckedSave(true)
      setSavedMovies(checkboxMovieSave);
    } else {
      getSavedMovies();
    }
  }, [history]);

  const filterCheckBox = (e) => {
    if(!checked) {
      const filterShortFilm = movies.filter((item) => item.duration < 40);
      setChecked(true);
      localStorage.setItem('checkboxMovie', JSON.stringify(filterShortFilm));
      setMovies(filterShortFilm);
    } else {
      setChecked(false);
      localStorage.removeItem('checkboxMovie')
      const moviesArr = JSON.parse(localStorage.getItem('filterData'));
      const movieArrAll = JSON.parse(localStorage.getItem('movies'));
      if (moviesArr === null) {
        setMovies(movieArrAll)
      } else {
        setMovies(moviesArr)
      }
    }
  };

  const filterCheckBoxSave = (e) => {
    if(!checkedSave) {
      const filterShortFilm = savedMovies.filter((item) => item.duration < 40);
      setCheckedSave(true);
      localStorage.setItem('checkboxMovieSave', JSON.stringify(filterShortFilm));
      setSavedMovies(filterShortFilm);
    } else {
      setCheckedSave(false);
      localStorage.removeItem('checkboxMovieSave')
      const moviesArr = JSON.parse(localStorage.getItem('filterDataSave'));
      const movieArrAll = JSON.parse(localStorage.getItem('savedMovies'));
      if (moviesArr === null) {
        setSavedMovies(movieArrAll)
      } else {
        setSavedMovies(moviesArr)
      } 
    }
  };
  
  
  const isMovieAdded = (movie) => savedMovies.some((item) => item.id === movie.id);

  const searchFilter = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      const filterData = data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      if (filterData.length === 0) {
        setLoadingError('Ничего не найдено');
      } else {
        setLoadingError('');
      }
      localStorage.setItem('filterData', JSON.stringify(filterData));
      setMovies(filterData);
    } else {
      const movieArrAll = JSON.parse(localStorage.getItem('movies'));
      setMovies(movieArrAll)
    }
  };

  const searchFilterSave = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      const filterData = data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      if (filterData.length === 0) {
        setLoadingError('Ничего не найдено');
      } else {
        setLoadingError('');
      }
      localStorage.setItem('filterDataSave', JSON.stringify(filterData));
      setSavedMovies(filterData);
    } else {
      const movieArrAll = JSON.parse(localStorage.getItem('savedMovies'));
      setSavedMovies(movieArrAll)
    }
  };

  const searchHandlerSave = (searchQuery) => {
    if (searchQuery === '') {
      localStorage.removeItem('filterDataSave');
      const moviesArr = JSON.parse(localStorage.getItem('savedMovies'));
      setSavedMovies(moviesArr);
    } else {
      searchFilterSave(savedMovies, searchQuery);
    }
  };

  const searchHandler = (searchQuery) => {
    if (searchQuery === '') {
      localStorage.removeItem('filterData')
      const moviesArr = JSON.parse(localStorage.getItem('movies'));
      setMovies(moviesArr);
    } else {
      searchFilter(movies, searchQuery);
    }
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
    console.log(movie)
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
          <Register signUpHandler={signUpHandler} isSignUpError={isSignUpError} />
        </Route>
        <ProtectedRoute path="/movies" checked={checked} filterBox={filterCheckBox} isLoading={isLoading} loadingError={loadingError} onActionClick={actionHandler} isMovieAdded={isMovieAdded} savedMovies={false} component={Movies} onSubmitSearch={searchHandler} movies={movies} loggedIn={loggedIn} />
        <ProtectedRoute path="/saved-movies" checked={checkedSave} filterBox={filterCheckBoxSave} onSubmitSearch={searchHandlerSave} isLoading={isLoading} loadingError={loadingError} savedMovies onActionClick={actionHandler} isMovieAdded={isMovieAdded} component={SavedMovies} loggedIn={loggedIn} movies={savedMovies}/>
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
