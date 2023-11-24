import styles from "./FutureForecast.module.css"

export const FutureForecast = ({ forecast }) => {
    return (<div className={styles.futureForecast}>
        <span className={styles.day}>{forecast.day}</span>
        <div className={styles.icon}>
            <img className={styles.icon} src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} alt="Forecast icon" />
        </div>
        <span className={styles.temperature}>{forecast.temperature}°</span>
        <span className={styles.state}>{forecast.state}</span>
    </div >)
}