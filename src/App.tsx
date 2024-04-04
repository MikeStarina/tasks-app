import { useEffect } from 'react';
import StepperComponent from './components/stepper/stepper';
import MainScreen from './components/mainScreen/main-screen';
import styles from './App.module.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import LoginPage from './pages/login-page/login-page';
import { useAppSelector } from './store/hooks';
import Header from './components/header/header';
import { useGetMyUserDataMutation } from './api/api';
import { useAppDispatch } from './store/hooks';
import { actions as authActions } from './store/auth/auth.slice';
import ProfilePage from './pages/profile-page/profile-page';
import { useNavigate } from 'react-router-dom';


function App () {
  const { isAuthenticated, user } = useAppSelector(store => store.auth);
  const [ getMyUserData, { data: myUserData } ] = useGetMyUserDataMutation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
      if (!isAuthenticated && !user) {
        if (savedToken) {
          dispatch(authActions.setUserToken(savedToken))
          getMyUserData(savedToken);

        } else {
          //@ts-ignore
          //window.location.href('/login');
          navigate('/login')
        }      
    }
  }, [])

  useEffect(() => {
    if (myUserData && !isAuthenticated && !user) {
        dispatch(authActions.setUserData(myUserData));
    }
  }, [myUserData])

  return (
      <main className={styles.content}>
        <Routes>
          <Route 
            path='/'
            element={
              <section className={styles.screen}>
                <Header />
                <StepperComponent />
                <MainScreen />
              </section>
            }          
          />       
          <Route
            path='/login'
            element={<LoginPage />} 
          />        
          <Route
            path='/profile'
            element={
              <>
                <Header />
                <ProfilePage />
              </>
            } 
          />        
          
        </Routes>
      </main>
  )
}

export default App
