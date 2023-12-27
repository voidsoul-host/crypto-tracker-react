import React, { useEffect, useState } from 'react';
import { get100Coins } from '../functions/get100Coins';
import Loader from '../Components/Common/Loader';
import Button from '../Components/Common/Button';
import { Link } from 'react-router-dom';
import Header from '../Components/Common/Header';
import TabsComponent from '../Components/Dashboard/Tabs';

function WatchlistPage() {
    const coins = JSON.parse(localStorage.getItem('watchlist'));
    const [myWatchlist, setMyWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        const allCoins = await get100Coins();
        if (coins) {
          setMyWatchlist(allCoins.filter((item) => coins.includes(item.id)));
        }
        setIsLoading(false);
    };
  return (
    <div>
        <Header />
      { isLoading || !coins ? (
        <Loader />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {myWatchlist?.length == 0 || !coins ? (
            <div>
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                No Items in the Watchlist
              </h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/dashboard">
                  <Button text={"Dashboard"} />
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ height: "95vh" }}>
              <TabsComponent coins={myWatchlist} isWatchlistPage={true} />
            </div>
          )}
        </div>
      )

      }
    </div>
  )
}

export default WatchlistPage
