import React, {useState, useEffect, useContext} from 'react';
import { ReactComponent as Mastercraft} from '../images/logo-mastercraft.svg';
import { ReactComponent as Bookmark} from '../images/icon-bookmark.svg';

import { GlobalContext } from '../context/GlobalState';

import {useDispatch} from 'react-redux';
import {onModal} from '../features/modalSlice';

export const Data = () => {
    const dispatch = useDispatch();
    const {stats} = useContext(GlobalContext);
    const {totalBackers, totalAmount, progress} = stats;
    const [isBookmarked, setisBookmarked] = useState(localStorage.getItem('bookmarkStatus') === 'true');

    useEffect(()=> {
        localStorage.setItem('bookmarkStatus', JSON.stringify(isBookmarked));
    }, [isBookmarked])

    function changeBookmarked(status){
        setisBookmarked(status);
    }

    function numberWithCommas(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  return (
  <section id='data'>
    <div className='monitor-riser'>
        <Mastercraft className='mastercraft-logo'/>
        <div className='monitor-riser-info'>    
            <h1>Mastercraft Bamboo Monitor Riser</h1>
            <h2>A beautiful &amp; handcrafted monitor stand to reduce neck and eye strain.</h2>
            <div className='headerButtons'>
                <button className='pledgeButton' onClick={() => dispatch(onModal())}>Back this project</button>
                <button className={isBookmarked ? 'bookmarkButton bookmarked' : 'bookmarkButton'} onClick={() => changeBookmarked(!isBookmarked)}><Bookmark className='bookmarkIcon'/> <span> {isBookmarked ? "Bookmarked" : "Bookmark"}</span></button>
            </div>
        </div>    
    </div>
    <div className="info-container">
        <div className="info">
            <div className="first stats">
                <span className='digit'>${numberWithCommas(+(totalAmount))}</span>
                <span className='label'>of $100,000 backed</span>
            </div>
            <div className="vertical" />
            <div className="stats">
                <span className='digit'>{numberWithCommas(+(totalBackers))}</span>
                <span className='label'>total backers</span>
            </div>
            <div className="vertical" />
            <div className="stats">
                <span className='digit'>56</span>
                <span className='label'>days left</span>
            </div>  
        </div>
        <div className='progress-bar'>
            <div className='progress' style={{width: `${progress}%`}}></div>
        </div>
    </div>
  </section>)
}
