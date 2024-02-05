import axios from "axios";

export const getCoinPrices = (id, days, priceType) =>{
    console.log("getCoinPrices Started")
    const prices = axios
        .get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        ).then((response)=>{
            console.log("getCoinPrices response", response.data[priceType])
            return response.data[priceType];
        })
        .catch((error)=>{
            console.log("getCoinPrices ERROR>>>", error);
        })
    return prices
}