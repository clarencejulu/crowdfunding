import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo} from '../images/logo.svg';
import { ReactComponent as Menubar} from '../images/icon-hamburger.svg';
import { ReactComponent as CloseMenu} from '../images/icon-close-menu.svg';
import {useDispatch} from 'react-redux';
import {menuModal, offModal, onModal} from '../features/modalSlice';

import {Menu} from './Menu';
import { useSelector } from 'react-redux';

export const Header = () => {
  const dispatch = useDispatch();
  const isMenu = useSelector(state => state.modal.menu);
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 596px)").matches);

  useEffect(()=>{
    const mediaWatcher = window.matchMedia("(max-width: 596px)");   
    function updateIsSmallScreen(event){
      setIsSmallScreen(event.matches); 
    }
    mediaWatcher.addEventListener('change',   updateIsSmallScreen);

    return function cleanup(){
      mediaWatcher.removeEventListener('change', updateIsSmallScreen);
    }
  })

  return (
    <header className='header'>
      <div className='headerFlexBox'>
        <Logo className="logo"/>
        <nav style={isSmallScreen || isMenu ? {display: "none"} : {display: "flex"}}>
          <a href="#data">About</a>
          <a href="#about">Discover</a>
          <a href="#modal" onClick={() => dispatch(onModal())}>Get Started</a>
        </nav>
        <div className='menu-container' style={isSmallScreen  || isMenu ? {display: "block"} : {display: "none"}}>
          <Menubar style={isMenu ? {display: "none"} : {display: "block"}} onClick={() => dispatch(menuModal())}/>
          <CloseMenu className="closeMenu" style={isMenu ? {display: "block"} : {display: "none"}} onClick={() => dispatch(offModal())}/>
        </div>  
      </div>

      {isMenu ? <Menu /> : ""}
    </header>
  )
}
