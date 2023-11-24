import styles from "./CurrentForecast.module.css"

export const CurrentForecast = ({ forecast }) => {
    return (<div className={styles.currentForecast}>
        <span className={styles.townName}>{forecast.city},{forecast.country}</span>
        <span className={styles.temperature}>{forecast.temperature}°</span>
        <div className={styles.weatherState}>
            <img className={styles.icon} src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} alt="Forecast Icon" />
            <div className={styles.state}>{forecast.state}</div>
        </div>
        <span className={styles.datetime}>{forecast.day} {forecast.hours}:{forecast.minutes}</span>
        <div className={styles.moreInformation}>
            <div className={styles.row}>
                <span className={styles.wind}>Wind {forecast.windSpeed} m/s</span>
                <span className={styles.pressure}>Pressure {forecast.pressure} hPa</span>
            </div>
            <div className={styles.row}>
                <span className={styles.humidity}>Humidity {forecast.humidity} %</span>
                <span className={styles.cloudiness}>Cloudiness {forecast.cloudiness}%</span>
            </div>
        </div>
    </div >)
}