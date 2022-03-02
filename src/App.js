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
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [filterMovies, setFilterMovies] = useState([]);
  const [editIsSuccess, setEditIsSuccess] = useState(false);
  const [editIsFailed, setEditIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  const [isSignError, setIsSignError] = useState(false);
  const [isSignErrorLogin, setIsSignErrorLogin] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedSave, setCheckedSave] = useState(false);
  
  const getUser = () => {
    mainApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true)
        history.push('/movies');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      const filterData = JSON.parse(localStorage.getItem('filterData'));
      const filterDataCheck = JSON.parse(localStorage.getItem('filterDataCheck'));
      if (filterDataCheck) {
        setChecked(true);
        setMovies(filterDataCheck);
      } else if (filterData) {
        setMovies(filterData);
        } else {
          getAllMovies();
        }
    
      const filterDataSave = JSON.parse(localStorage.getItem('filterDataSave'));
      const filterDataCheckSave = JSON.parse(localStorage.getItem('filterDataCheckSave'));
      if (filterDataCheckSave) {
        setCheckedSave(true);
        setSavedMovies(filterDataCheckSave);
      } else if (filterDataSave) {
        setSavedMovies(filterDataSave);
        } else {
          getSavedMovies();
        }
    }
  }, [loggedIn])

  const signInHandler = (email, password) => {
    mainApi
      .authorize(email, password)
      .then(() => {
        getUser();
        getAllMovies();
        getSavedMovies();
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        setIsSignErrorLogin(true)
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
        setIsSignError(true)
        console.error(err);
      });
  }

  const signOutHandler = () => {
    mainApi
      .signOut()
      .then(() => {
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('moviesCheck');
        localStorage.removeItem('moviesCheckSave');
        setLoggedIn(false);
        setCurrentUser({});
        setMovies([]);
        setSavedMovies([]);
        setFilterMovies([]);
        setFilterSavedMovies([]);
        setChecked(false);
        setCheckedSave(false);
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
      .catch((e) => {
        console.log(e);
      });
  }

  const getSavedMovies = () => {
    mainApi
      .getMyMovies()
      .then((res) => {
        const savedArray = res.map((item) => ({ ...item, image: item.image, id: item.movieId }));
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const filterCheckBox = () => {
    if(!checked) {
      setChecked(true);
    } else {
      setChecked(false);
      }
    }
  

  const filterCheckBoxSave = () => {
    if(!checkedSave) {
      setCheckedSave(true);
    } else {
      setCheckedSave(false);
    }
  };
  
  
  const isMovieAdded = (movie) => savedMovies.some((item) => item.id === movie.id);

  const searchHandler = (searchQuery) => {
    if (searchQuery === '') {
      if (checked) {
        const moviesArr = JSON.parse(localStorage.getItem('movies')).filter((item) => item.duration < 40);
        localStorage.setItem('filterDataCheck', JSON.stringify(moviesArr));
        setMovies(moviesArr);
      } else {
        localStorage.removeItem('filterData');
        localStorage.removeItem('filterDataCheck');
        setMovies(JSON.parse(localStorage.getItem('movies')));
      }
    } else {
      setIsLoading(true);
      getAllMovies();
      const newMovies = JSON.parse(localStorage.getItem('movies'))
      setTimeout(() => {
        searchFilter(newMovies, searchQuery);
        setIsLoading(false);
      }, 1000);
    }
  };

  const searchFilter = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      const filterData = data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      localStorage.setItem('filterData', JSON.stringify(filterData));
      if (filterData.length === 0) {
        setLoadingError('Ничего не найдено');
      } else {
        setLoadingError('')
        if(checked) {
          const moviesArr = JSON.parse(localStorage.getItem('filterData')).filter((item) => item.duration < 40);
          if (moviesArr.length === 0) {
            setLoadingError('Ничего не найдено');
          } else {
            setLoadingError('');
            localStorage.setItem('filterDataCheck', JSON.stringify(moviesArr));
            setMovies(moviesArr);
          }
        } else {
          localStorage.removeItem('filterDataCheck')
          const moviesArr = JSON.parse(localStorage.getItem('filterData'));
          setMovies(moviesArr);
        }
      }
    }
  };

  const searchHandlerSave = (searchQuery) => {
    if (searchQuery === '') {
      if (checkedSave) {
        const moviesArr = JSON.parse(localStorage.getItem('savedMovies')).filter((item) => item.duration < 40);
        localStorage.setItem('filterDataCheckSave', JSON.stringify(moviesArr));
        setSavedMovies(moviesArr);
      } else {
        localStorage.removeItem('filterDataSave');
        localStorage.removeItem('filterDataCheckSave');
        setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
      }
    } else {
      setIsLoading(true);
      getSavedMovies();
      const newMovies = JSON.parse(localStorage.getItem('savedMovies'))
      setTimeout(() => {
        searchFilterSave(newMovies, searchQuery);
        setIsLoading(false);
      }, 1000);
    }
  };

  const searchFilterSave = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      const filterData = data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      localStorage.setItem('filterDataSave', JSON.stringify(filterData));
      if (filterData.length === 0) {
        setLoadingError('Ничего не найдено');
      } else {
        setLoadingError('')
        if(checkedSave) {
          const moviesArr = JSON.parse(localStorage.getItem('filterDataSave')).filter((item) => item.duration < 40);
          if (moviesArr.length === 0) {
            setLoadingError('Ничего не найдено');
          } else {
            setLoadingError('');
            localStorage.setItem('filterDataCheckSave', JSON.stringify(moviesArr));
            setSavedMovies(moviesArr);
          }
        } else {
          localStorage.removeItem('filterDataCheckSave')
          const moviesArr = JSON.parse(localStorage.getItem('filterDataSave'));
          setSavedMovies(moviesArr);
        }
      }
    }
  };

  const addMovies = (movie) => {
    mainApi
      .saveMovies(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, {  ...res, id: res.movieId }]);
        getSavedMovies();
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
          <Login signInHandler={signInHandler} isSignErrorLogin={isSignErrorLogin} />
        </Route>
        <Route path="/signup">
          <Register signUpHandler={signUpHandler} isSignError={isSignError} />
        </Route>
        <ProtectedRoute path="/movies" checked={checked} filterBox={filterCheckBox} isLoading={isLoading} loadingError={loadingError} onActionClick={actionHandler} isMovieAdded={isMovieAdded} savedMovies={false} component={Movies} onSubmitSearch={searchHandler} movies={movies} loggedIn={loggedIn} />
        <ProtectedRoute path="/saved-movies" checked={checkedSave} filterBox={filterCheckBoxSave} onSubmitSearch={searchHandlerSave} isLoading={isLoading} loadingError={loadingError} savedMovies onActionClick={actionHandler} isMovieAdded={isMovieAdded} component={SavedMovies} loggedIn={loggedIn} movies={savedMovies}/>
        <ProtectedRoute path="/profile" editIsSuccess={editIsSuccess}
              editIsFailed={editIsFailed} loadingError={loadingError} component={Profile} loggedIn={loggedIn} onSignOut={signOutHandler} onUpdate={userUpdateHandler} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Route exact path={["/movies", "/saved-movies", "/"]}>
        <Footer />
      </Route>
    </CurrentUserContext.Provider>
  );
}

export default App;
