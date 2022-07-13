import React from 'react';
import { ReactComponent as Check} from '../images/icon-check.svg';
import {useDispatch} from 'react-redux';
import { offModal } from '../features/modalSlice';

export const ThankYou = () => {
    const dispatch = useDispatch();
    
  return (
    <div className='thankYouBox'>
        <Check className="check"/>
        <h5>Thanks for your support!</h5>
        <p>Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.</p>
        <button onClick={() => dispatch(offModal())}>Got it!</button>
    </div>
  )
}
