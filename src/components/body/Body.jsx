import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe,faWind, faDroplet,faClock, } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'
import sunriseLogo from '../../assets/img/sunrise-forecast-svgrepo-com.svg'
import sunsetLogo from '../../assets/img/sunset-3-svgrepo-com.svg'
import 'react-toastify/dist/ReactToastify.css'
import './Body.scss'
import { useState } from 'react';
const api = {
        key : '3938ee31df91e94c45808e8d1d6af99b',
        baseUrl : 'https://api.openweathermap.org/data/2.5/'
    }

    
    const Body = () => {
        async function search(e){
            if(e.key === 'Enter'){
                await axios.get(`${api.baseUrl}weather?q=${weatherData.text}&appid=${api.key}&units=metric`)
                .then(function(res){
                    setWeatherData({...weatherData,
                        country:res.data.sys.country,
                        city:res.data.name,
                        degree:res.data.main.temp,
                        setWeahter:res.data.weather[0].main,
                        icon:res.data.weather[0].icon,
                        wind:res.data.wind.speed,
                        humidity:res.data.main.humidity,
                        pressure:res.data.main.pressure,
                        sunrise:res.data.sys.sunrise,
                        sunset:res.data.sys.sunset
                    })
                    toggleVisiblity()
                })
                .catch(function(error){
                    console.log(error)
                    showToastText()
                })
                
            }}
        const [isVisible,setIsVisible] = useState(false)
        const days = ['Monday','tuesday','wednesday','thusday','friday','saturday','sunday']
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const date = new Date();
        const dateInfo = {
            day:days[date.getDay() -1],
            month :months[date.getMonth()]
        }
        const [weatherData,setWeatherData] = useState({
        country:'',
        city:'',
        degree:'',
        weather:'',
        icon:null,
        text:'',
        wind:0,
        humidity:0,
        pressure:0,
        sunrise:0,
        sunset:0
    })
    const toggleVisiblity = ()=>{
        if(isVisible === true) isVisible
        else setIsVisible(!isVisible)
    }
    const showToastText = ()=>{
        toast.error('city does not exist!',{position:toast.POSITION.TOP_CENTER})
    }
    // sunrise and sunset time
        const sunriseDate = new Date(weatherData.sunrise*1000)
        const sunsetDate = new Date(weatherData.sunset*1000)
        return ( 
    <>
        <div className="body">
            <input type='text' className='search' placeholder='Type a city' value={weatherData.text} onChange={(e)=>{setWeatherData({...weatherData,text:e.target.value})}} onKeyDown={search} />
            <header >
                <p style={{display:isVisible ? 'inline-block' : 'none'}} >{weatherData.country}</p>         
                <h2>{weatherData.city}</h2>
                <a href='https://samcd.netlify.app/' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faGlobe } spin/></a>
            </header>
            <div className="main-body">
                {isVisible&&(
                    <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} />
                )}
                <p>{Math.round(weatherData.degree)}<span>&deg;C</span></p>
                <p>{weatherData.weather}</p>
            </div>
            <div className="more-info">
                <p className='day'>{`${dateInfo.day},${date.getDay()} ${dateInfo.month}`}</p>
                <div className="atmosphere">
                    <div className="box speed-wind">
                        <FontAwesomeIcon icon={faWind} />
                        <p>{Math.floor(weatherData.wind*3.6)}</p>
                        <p>km/h</p>
                    </div>
                    <div className="box humidity">
                        <FontAwesomeIcon icon={faDroplet} />
                        <p>{weatherData.humidity}</p>
                        <p>%</p>
                    </div>
                    <div className="box pressure">
                        <FontAwesomeIcon icon={faClock} />
                        <p>{weatherData.pressure}</p>
                        <p>hPa</p>
                    </div>
                </div>
                <div className="riseSet">
                    <div className="box">
                        <p>Sunrise</p>
                        {isVisible&&(
                        <p>{`${sunriseDate.getHours()}:${sunriseDate.getMinutes()} AM`}</p>
                        )}
                        <img src={sunriseLogo} alt='sunriselogo'/>
                    </div>
                    <div className="box">
                        <p style={{fontWeight : 900}}>sunset</p>
                        {isVisible &&(
                        <p>{`${sunsetDate.getHours()}:${sunsetDate.getMinutes()} PM`}</p>
                        )}
                        <img src={sunsetLogo} alt='sunsetlogo' />
                    </div>
                    
                </div>
            </div>
        </div>
            <ToastContainer />
    </> 
    );
}
 
export default Body;