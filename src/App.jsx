import { useEffect,useState } from "react"
import "./index.css"
import axios from "axios"
import WetherCard from "./component/WetherCard";
import SerachCountry from "./component/SerachCountry";
const App = () => {
  const [data, setData] = useState({msg:"no data"}); // State to store API response
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for errors
    const [date, setDate] = useState("00")
    const [year, setYear] = useState("00")
    const [month, setMonth] = useState("00")
  const [curState,SetCurState] = useState("India")
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
  };
  const fetchData = async (city) => {
    try {
      const response = await axios.get(  `http://api.weatherapi.com/v1/current.json?key=8cc02e81781c42dcade180911251102&q=${city}&aqi=yes`);
      await console.log("response=", response.data); // Check full response
      setData(response.data); // Only set if 
      setLoading(false);

    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(curState);
    setLoading(false)
  },   [] );

  useEffect(() => {
    // fetchData(curState);

    console.log("Updated data:", data);
    if(data.location){

        setDate( data.location.localtime.split(" ")[0].split("-")[2])
        setYear(data.location.localtime.split(" ")[0].split("-")[0])
        setMonth(months[data.location.localtime.split(" ")[0].split("-")[1]])
    }
  }, [data]);
  useEffect(() => {
    fetchData(curState);
    console.log("Updated data by state:", data);
   
  }, [curState]);
  

  

  if (loading) return <>
        <div className=" bg-zinc-900 text-zinc-100 main md:flex h-screen text-center  w-screen md:justify-center font-bold text-6xl items-center rounded ">
        <p>Loading...</p>
      </div>
  </>
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    {data.location ?
        <div className="main md:flex h-screen  w-screen md:justify-center md:items-center rounded  bg-zinc-900">


    <div className="mobile bg-zinc-200 overflow-auto font-mono scrollbar-hidden  overflow-y-scroll text-2xl flex justify-evenly flex-col px-4 gap-4 rounded-[33px]  lg:h-[680px] lg:w-[400px]  md:h-[100vh] md:w-[100vw] sm:h-[200vh] sm:w-[100vw] ">
        
            <nav className="navbar w-full mb-2  text-center border-b">
              <SerachCountry SetCurState={SetCurState}/>
            </nav>

            <div className="title  w-full px-2 rouded font-medium flex justify-between">
                <p className="capitalize text-sm     flex items-center">{data.location.name}/{data.location.country}</p>

                <span className="flex items-center gap-1">
                <img src={data.current.condition.icon} className="h-[60%]" alt=""  />
                 <p className="text-sm">{data.current.condition.text}</p>
                </span>
             </div>

            <main className="hero px-2" >
                <div className="date  text-zinc-800 w-full capitalize font-medium  text-xl ">{date}  {month}  {year}</div>
                <h1 className="text-[7rem] m-0 p-0 font-bold">{data.current.feelslike_f}&deg;</h1>
                <div className="description flex justify-between  items-center font-medium capitalize"><p className="text-base">clear evenong sky.</p> <p className="text-xl">18&deg; - 24&deg;</p></div>
            </main>


            <div className="fotter  mb-1 bg-zinc-200 h-2/4">

               <WetherCard city={"India"}/>
               <WetherCard city={"Chine"}/>
               <WetherCard city={"Canada"}/>

            </div>
        </div>




    </div>
        : <h1>no data found</h1>}
    </>
  )
}

export default App