import React, {useState, useContext} from 'react';
import {useDispatch} from 'react-redux';
import { activateModal, thankYouModal } from '../features/modalSlice';
import {makeInputActive, showNotification} from '../features/activeSlice';

import { GlobalContext } from '../context/GlobalState';

const RewardBoxModal = ({reward}) => {
    const {id, name, price, description, remaining} = reward;
    const {stats, setRewards, setStats} = useContext(GlobalContext);
    const {totalBackers, totalAmount} = stats;
    const dispatch = useDispatch();

    const onHover = (event) => {
        if(event.target.parentElement.parentElement.className !== 'reward-box active'){
            event.target.parentElement.classList.add('hover');
        }
    }
    const offHover = (event) => event.target.parentElement.classList.remove('hover');
    
    const [donation, setDonation] = useState(price !== null ? price : 1);
    function changeDonation(value){
        setDonation(value);
    }

    const pledgeButtonId = "input" + reward.id.toString();
    const inputId = "inputId" + reward.id.toString();
    const toMakeInputActive = (event) => {
        event.stopPropagation();
        dispatch(makeInputActive({id: pledgeButtonId, inputId: inputId}));
    }

    function executeSelection(){
        const value = price === null ? 1 : price;
        if(donation < value){
            dispatch(showNotification({price: value}));
        }
        else{
            updateData(remaining, "https://crowdfunding-fake-server.herokuapp.com/rewards/", totalAmount, totalBackers, "https://crowdfunding-fake-server.herokuapp.com/stats/");
            dispatch(thankYouModal());
        }
    }

    async function updateData(remaining, remainingLink, totalAmount, totalBackers, statsLink){ 
        const setRemainingResponse = await fetch(remainingLink + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"remaining": remaining === null ? null : remaining - 1}),
        });
        await setRemainingResponse.json();

        const scale = (num, in_min, in_max, out_min, out_max) => {
            return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
        }

        const setStatsResponse = await fetch(statsLink, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"totalAmount": totalAmount + +(donation), "totalBackers": totalBackers + 1, "progress": scale(totalAmount + +(donation), 0, 100000, 0, 100)}),
        });
        await setStatsResponse.json();

        const getRemainingResponse = await fetch(remainingLink);
        const getStatsResponse = await fetch(statsLink);

        const remainingData = await getRemainingResponse.json();
        const statsData =  await getStatsResponse.json();   
    
        setRewards(remainingData);
        setStats(statsData);
    }

  return (
    <div className={ name.toLowerCase().includes("mahogany") ? 'last reward-box' : 'reward-box'} id={name}>
        <div className="item-unavailable" style={remaining !== 0 ? {display: "none"} : {display: "block"}} />
        <div className="box-content">
            <div className={(!(name.toLowerCase().includes("pledge"))) ? 'not-first circle' : 'circle'} onMouseOver={(event)=>onHover(event)} onMouseOut={(event)=>offHover(event)} 
            onClick={() => dispatch(activateModal({id: name, fromModal: false,}))}
            >
                <div className='active-circle' />
            </div>
            <div className='main-heading'>
                <span className="product-name">{name}</span>
                {price === null ? "" : <span className="product-pledge">Pledge ${price} or more</span>}
            </div>
            {remaining === null ? "" : <div className="amount-left"><span className="amount">{remaining}</span> <span className="left">left</span></div>}
            <div className="description-container"><p>{description}</p></div>
        </div>
        <div className="enter-pledge" id="enter-pledge">
            <span>Enter your pledge</span>
            <div className="buttons-container">
                <div className="enter-pledge-buttons" id={pledgeButtonId} onClick={(event) => toMakeInputActive(event)}>
                    <span className="dollar-sign">$</span>
                    <input type="number" id={inputId} value={donation} min={price !== null ? price : 1} onKeyDown={(event) => event.key==='.' ? event.preventDefault() : null} onChange={(event) => changeDonation(event.target.value)}></input>
                </div>
                <button className="enter-pledge-buttons" onClick={() => executeSelection()}>Continue</button>
            </div>
        </div>
    </div>   
  )
}

export default RewardBoxModal;