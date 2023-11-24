import styles from "./Layout.module.css"
import { useEffect, useState } from "react"
import { Search, CurrentForecast, FutureForecast, Mask } from ".."
import { getWeatherByCity, getForecastsByCity } from "../../api/api"

export const Layout = () => {
    const [searchValue, setSearchValue] = useState("")
    const [currentForecast, setCurrentForecast] = useState({})
    const [futureForecasts, setFutureForecasts] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const changeForecast = (city) => {
        setIsLoading(true)
        localStorage.setItem("searchValue", city)

        getWeatherByCity(city).then(forecast => {
            setCurrentForecast(forecast)
            setIsLoading(false)
        }).catch(() => {
            setIsError(true)

            setTimeout(() => {
                setIsError(false)
            }, 4000);
        })
    }
    const changeFutureForecasts = (city) => {
        getForecastsByCity(city).then(forecasts => {
            setFutureForecasts(forecasts)
            setIsLoading(false)
        }).catch(console.log)
    }

    useEffect(() => {
        const searchValue = localStorage.getItem("searchValue")

        if (searchValue) {
            changeForecast(searchValue)
        }
        else {
            changeForecast("London")
        }
    }, [])

    useEffect(() => {
        const searchValue = localStorage.getItem("searchValue")

        if (searchValue) {
            changeFutureForecasts(searchValue)
        }
        else {
            changeFutureForecasts("London")
        }
    }, [currentForecast])

    return (<div className={styles.layout}>
        <div className={`${styles.errorAlert} ${isError ? styles.active : ""}`}>Something went wrong</div>
        <Search value={searchValue} changeValue={setSearchValue} changeForecast={changeForecast} />
        {isLoading ? <Mask /> : <CurrentForecast forecast={currentForecast} />}
        <div className={styles.futureForecasts}>
            {isLoading ? "" : futureForecasts.map(futureForecast => <FutureForecast forecast={futureForecast} />)}
        </div>
    </div>)
}