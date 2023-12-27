import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { get100Coins } from '../../../functions/get100Coins';
import './style.css'

function SelectCoins({crypto1, crypto2, handleCoinChange}) {
    
    const [allCoins, setAllCoins] = useState([])
    
    const styles ={
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline":{
            borderColor: "var(--white)",
        },
        "& .MuiSvgIcon-root":{
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset":{
                borderColor:"#3a80e9",
            },
        },
    }

    

    useEffect (()=>{
        getData()
    },[])

    async function getData(){
        // console.log(allCoins)
        const myCoins = await get100Coins();
        setAllCoins(myCoins)
        console.log("all coins is there>>> ",allCoins)
    }

  return (
    <div className='coins-flex'>
        <p>Crypto 1</p>
       <Select
            sx={styles}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={crypto1}
            label="Crypto 1"
            onChange={(event)=>handleCoinChange(event, false)}
            >
            {allCoins.filter((item)=>item.id!=crypto2).map((coin, i)=>(
                <MenuItem value={coin.id} key={i}>{coin.name}</MenuItem>    
            ))}
            </Select>
        <p>Crypto 2</p>
       <Select
            sx={styles}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={crypto2}
            label="Crypto 2"
            onChange={(event)=>handleCoinChange(event, true)}
            >
            {allCoins.filter((item)=>item.id!=crypto1).map((coin, i)=>(
                <MenuItem value={coin.id} key={i}>{coin.name}</MenuItem>    
            ))}
            </Select>
    </div>
  )
}

export default SelectCoins
