import React from 'react';
import './css/App.css';
import {Header} from './components/Header';
import {Data} from './components/Data';
import {About} from './components/About';
import {useSelector} from 'react-redux';
import {Modal} from './components/Modal';
import { GlobalProvider } from './context/GlobalState';
import {useDispatch} from 'react-redux';
import {makeInputInactive} from './features/activeSlice';
import { ThankYou } from './components/ThankYou';

function App() {
  const isOn = useSelector(state => state.modal.on);
  const isThankYou = useSelector(state => state.modal.thankYou);

  const dispatch  = useDispatch();
  return (
    <GlobalProvider>
      <div id='container' onClick={() => dispatch(makeInputInactive())}>
        {isOn ? <Modal /> : ""}
        {isThankYou ? <ThankYou /> : ""}
        <div id="wrongValue" className='notification'></div>
      </div>
      <Header />
      <Data />
      <About />
    </ GlobalProvider>
  );
}

export default App;
