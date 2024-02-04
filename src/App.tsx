import React from 'react';
import StepperComponent from './components/stepper/stepper';
import MainScreen from './components/mainScreen/main-screen';
import styles from './App.module.css';


function App () {

  return (
    <main className={styles.content}>
      <StepperComponent />
      <MainScreen />
    </main>
  )
}

export default App
