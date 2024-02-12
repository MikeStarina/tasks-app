import React from 'react';
import StepperComponent from './components/stepper/stepper';
import MainScreen from './components/mainScreen/main-screen';
import styles from './App.module.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Pdfrenderer from './components/pdf-render/pdf-render';



function App () {

  return (
    <BrowserRouter>
      <main className={styles.content}>
        <Routes>
          <Route 
            path='/'
            element={
              <>
                <StepperComponent />
                <MainScreen />
              </>
            }          
          />
          <Route
            path='/render'
            element={<Pdfrenderer />} 
          />        
          
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
