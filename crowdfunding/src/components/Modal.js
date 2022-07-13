import React, { useContext } from 'react';
import {ReactComponent as Close} from '../images/icon-close-modal.svg';

import {useDispatch} from 'react-redux';
import {offModal} from '../features/modalSlice';

import { GlobalContext } from '../context/GlobalState';
import RewardBoxModal from './RewardBoxModal';

export const Modal = () => {
    const {rewards} = useContext(GlobalContext);
    const dispatch = useDispatch();

  return (
    <div className="back-container" id='modal'>
        <Close className='close-modal' onClick={() => dispatch(offModal())}/>
        <h3>Back this project</h3>
        <p className="subh3">Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>
        
        {rewards.map((reward, id) => <RewardBoxModal key={id} reward={reward} />)}
    </div>
  )
}
