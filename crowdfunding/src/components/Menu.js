import React from 'react'
import {onModal, offModal} from '../features/modalSlice';
import {useDispatch} from 'react-redux';

export const Menu = () => {
    const dispatch = useDispatch();

  return (
    <nav className='smallScreen-nav'>
        <a href="#data" onClick={() => dispatch(offModal())}>About</a>
        <a href="#about" onClick={() => dispatch(offModal())}>Discover</a>
        <a href="#modal" onClick={() => dispatch(onModal())}>Get Started</a>
    </nav>
  )
}
