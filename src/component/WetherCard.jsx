
import { useEffect, useState } from "react"
import axios from "axios";
// eslint-disable-next-line react/prop-types
function WetherCard({city}) {
    const [data,setData] = useState()
     const [houre, setHoure] = useState("00")
    const [minit, setminit] = useState("00")
    const [AMPM , setAMPM] = useState("pm")

 
    const fetchData = async (city) => {   
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=8cc02e81781c42dcade180911251102&q=${city}&aqi=yes`);
          await console.log("response=", response.data); // Check full response
        setData(response.data)
      };
    
      useEffect(() => {    
        fetchData(city);
    
      },   [city] );
    
      useEffect(() => {
        console.log("Updated data from wether:", data);
        if(data){     
        setHoure(parseInt(data.current.last_updated.split(" ")[1].split(":")[0]))
        houre>12?setAMPM("pm"):setAMPM("am")
        if(houre > 12){ setHoure(houre-12) }
        setminit( data.current.last_updated.split(" ")[1].split(":")[1])
        }   
      }, [data]);


      if(!data){
        return (
            <h1>no data...</h1>
        )
      }
      return (
        
    <div className="item py-3 border-b  flex justify-between flex-col gap-[6px] ">
    <span className="flex justify-between text-gray-400 text-base">
        <p className="country capitalize ">{data.location.country}</p>
        <p className="time "> {houre}:{minit} {AMPM} </p>
    </span>
    <span className="flex justify-between  ">
        <p className="city capitalize text-3xl font-medium">{data.location.name}</p>
        <p className="temperature text-2xl"> {data.current.temp_c}&deg;</p>
    </span>

</div>
// : <h1>no data...</h1>

  )
}

export default WetherCard