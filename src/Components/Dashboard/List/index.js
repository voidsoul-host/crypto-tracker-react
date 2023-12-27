import React, { useState } from 'react';
import './style.css';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { IconButton, Tooltip } from '@mui/material';
import { convertNumbers } from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';
import { removeFromWatchlist } from '../../../functions/removeFromWatchlist';
import { addToWatchlist } from '../../../functions/addToWatchlist';
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { hasBeenAdded } from '../../../functions/hasBeenAdded';


function List( { coin, isWatchlistPage }) {
    const [added, setAdded] = useState(hasBeenAdded(coin.id));
  return (
    <Link to={`/coin/${coin.id}`} >
    <tr className='list-row' style={{ display: isWatchlistPage && !added && "none" }} >
        <Tooltip placement="bottom-start" title="Coin Logo">
            <td className="td-image">
                <img src={coin.image} className='coin-logo' alt="" />
            </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Coin Info">
            <td>
                <div className='name-col'>
                    <p className='coin-symbol'>{coin.symbol}</p>
                    <p className='coin-name'>{coin.name}</p>
                </div>
            </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Price Change in 24Hrs">
            {coin.price_change_percentage_24h>0?(
                <td className="chip-flex">
                    <div className="price-chip">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className='icon-chip td-icon'>
                        <TrendingUpRoundedIcon />
                    </div>
                </td>
            ):(
                <td className="chip-flex">
                    <div className="price-chip chip-red">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className='icon-chip chip-red'>
                        <TrendingDownRoundedIcon />
                    </div>
                </td>
            )}
        </Tooltip>
        <Tooltip placement="bottom-start" title="Current Price">
            <td>
            <h3 className='coin-price td-center-align' 
                style={{
                    color:coin.price_change_percentage_24h<0
                    ?"var(--red)"
                    :"var(--green)"
                }}
            >
                ${coin.current_price.toLocaleString()}
            </h3>
            </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Total Volume">
            <td>
                <p className="total_volume td-right-align td-total-volume">
                    { coin.total_volume.toLocaleString() }
                </p>
            </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Market Cap">
            <td className="desktop-td-mkt">
                <p className="total_volume td-right-align">
                    { coin.market_cap.toLocaleString() }
                </p>
            </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Market Cap">
            <td className='mobile-td-mkt'>
                <p className="total_volume td-right-align">
                    ${ convertNumbers(coin.market_cap) }
                </p>
            </td>
        </Tooltip>
        <td style={{ width: "fit-content" }}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              if (added) {
                removeFromWatchlist(coin.id);
                setAdded(false);
              } else {
                addToWatchlist(coin.id);
                setAdded(true);
              }
            }}
          >
            {added ? (
              <StarRoundedIcon
                className={`watchlist-icon ${
                  coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                } `}
              />
            ) : (
              <StarBorderRoundedIcon
                className={`watchlist-icon ${
                  coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                } `}
              />
            )}
          </IconButton>
        </td>
    </tr>
    </Link>
  )
}

export default List
