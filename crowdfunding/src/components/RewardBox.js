import React from 'react';
import {useDispatch} from 'react-redux';
import { activateModal } from '../features/modalSlice';

const RewardBox = ({ reward }) => {
  const {name, price, description, remaining} = reward;
  const dispatch = useDispatch();

  return ( 
  <div className={ name.toLowerCase().includes("mahogany") ? 'last reward-box' : 'reward-box'}>
    <div className="item-unavailable" style={remaining !== 0 ? {display: "none"} : {display: "block"}}></div>
    <div className='reward-heading'>
      <h4>{name}</h4>
      <span className='pledge'>Pledge ${price} or more</span>
    </div>
    <p>{description}</p>
    <div className="reward-footer">
      <div className="amount-left">
          <span className="amount">{remaining}</span>
          <span className="left">left</span>
      </div>
      <button onClick={() => dispatch(activateModal({id: name, fromModal: true,}))} className={remaining === 0 ? "unavailable" : ""}>{remaining === 0 ? "Out of stock" :"Select Reward"}</button>
    </div>
  </div>)
}

export default RewardBox;

