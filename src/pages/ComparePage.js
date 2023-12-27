import React, { useEffect, useState } from 'react'
import Header from '../Components/Common/Header'
import SelectCoins from '../Components/Compare/SelectCoins'
import SelectDays from '../Components/Coin/SelectDays';
import { getCoinData } from '../functions/getCoinData';
import { coinObject } from '../functions/convertObject';
import { getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartData';
import Loader from '../Components/Common/Loader';
import List from '../Components/Dashboard/List';
import CoinInfo from '../Components/Coin/CoinInfo';
import LineChart from '../Components/Coin/LIneChart';
import TogglePriceType from '../Components/Coin/PriceType';

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({})
  const [crypto2Data, setCrypto2Data] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(30)
  const [priceTypes, setPriceTypes] = useState("prices");
  const [chartData, setChartData] = useState({});

  async function handleDaysChange (event) {
    setIsLoading(true)
    setDays(event.target.value)
    const prices1 = await getCoinPrices(crypto1, event.target.value, priceTypes);
    const prices2 = await getCoinPrices(crypto2, event.target.value, priceTypes);
    settingChartData(setChartData, prices1, prices2)
    setIsLoading(false)
  }
  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true)
    setPriceTypes(newType);
    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType);
    settingChartData(setChartData, prices1, prices2)
    setIsLoading(false)
  };

  useEffect(()=>{
    getData()
  },[])

  async function getData(){
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    if(data1){
      const data2 = await getCoinData(crypto2);
      coinObject(setCrypto1Data, data1) 
      if(data2){
        coinObject(setCrypto2Data, data2)
        const prices1 = await getCoinPrices(crypto1, days, priceTypes);
        const prices2 = await getCoinPrices(crypto2, days, priceTypes);
        settingChartData(setChartData, prices1, prices2)
        setIsLoading(false);
      }
    }
  }

  const handleCoinChange= async (event, isCoin2)=>{
    setIsLoading(true)
    if(isCoin2){
        console.log("target>>>",event.target.value) 
        setCrypto2(event.target.value)
        const data = await getCoinData(event.target.value);
        console.log("data>>>>", data);
        coinObject(setCrypto2Data, data)
        const prices1 = await getCoinPrices(crypto1, days, priceTypes)
        const prices2 = await getCoinPrices(crypto2, days, priceTypes);
        if(prices1.length > 0 && prices2.length > 0){

          setIsLoading(false)
        }
    } 
    else{
      setCrypto1(event.target.value)
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto1Data, data)
      setIsLoading(false)
    }
    
}

  return (
    <div>
      <Header />
      {isLoading? ( 
                <Loader /> 
            ) : ( 
        <>
          <div className="coins-days-flex">
          <SelectCoins 
            crypto1={crypto1} 
            crypto2={crypto2}
            handleCoinChange={handleCoinChange}
          />
          <SelectDays 
            days={days} 
            handleDaysChange={handleDaysChange} 
            noPTag ={true} 
          />
          </div>
          <div className="grey-wrapper" style={{padding: "0rem 1rem"}} >
            <List coin={crypto1Data} />
          </div>
          <div className="grey-wrapper" style={{padding: "0rem 1rem"}} >
            <List coin={crypto2Data} />
          </div>
          <div className="grey-wrapper">
            <TogglePriceType 
              priceType={priceTypes} 
              handlePriceTypeChange={handlePriceTypeChange} 
            />
            <LineChart chartData={chartData} priceType={priceTypes} multiAxis={true} />
          </div>

          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
    </div>
  )
}

export default ComparePage
