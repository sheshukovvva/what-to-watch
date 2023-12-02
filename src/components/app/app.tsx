import { AppProps } from './app-props';
import { AppRoute } from '../../const';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

export default function App({promoFilmCard, filmCards}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);

  if (isFilmsDataLoading) {
    return <Spinner/>;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen promoFilmCard={promoFilmCard}/>}
          />
          <Route
            path={AppRoute.SignIn}
            element={<SignInScreen/>}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListScreen filmCards={filmCards}/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film}>
            <Route index element={<NotFoundScreen/>}/>
            <Route path=':id'>
              <Route index element={<FilmScreen/>}/>
              <Route path={AppRoute.AddReview} element={<AddReviewScreen/>}/>
            </Route>
          </Route>
          <Route path={AppRoute.Player}>
            <Route index element={<NotFoundScreen/>}/>
            <Route path=':id' element={<PlayerScreen filmCards={filmCards}/>}/>
          </Route>
          <Route
            path={AppRoute.NotFound}
            element={<NotFoundScreen/>}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
