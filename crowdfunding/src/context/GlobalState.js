import React, { useState, useEffect, createContext } from 'react';

export const GlobalContext = createContext([]);

export const GlobalProvider = ({ children }) => {
    const [rewards, setRewards] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(()=> {
        const rewardURL = 'https://crowdfunding-fake-server.herokuapp.com/rewards';
        const statsURL = 'https://crowdfunding-fake-server.herokuapp.com/stats';

        async function getData(url){
            const response = await fetch(url);
            const data = await response.json();
            if(url === rewardURL){
                setRewards(data);
            }
            else{
                setStats(data);
            }
        }
        getData(rewardURL);
        getData(statsURL);
    }, []);
    
  return (
    <GlobalContext.Provider value={{ rewards: rewards, stats: stats, setRewards: setRewards, setStats: setStats}}>
        {children}
    </GlobalContext.Provider>
    )
}