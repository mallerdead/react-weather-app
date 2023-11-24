const API_KEY = "130dea73474b2d91b201c8cc6f90020f"
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const getWeatherByCity = async (city) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {

            if (response.status === 200) {
                return response.json()
            }
            else {
                throw new Error();
            }
        }).then(data => {
            const dt = new Date(data.dt * 1000)
            const weather = data.weather[0]
            return ({
                city: data.name,
                country: data.sys.country,
                temperature: data.main.temp,
                icon: weather.icon,
                state: weather.description[0].toUpperCase() + weather.description.slice(1),
                day: days[dt.getDay()],
                hours: dt.getHours(),
                minutes: dt.getMinutes(),
                windSpeed: data.wind.speed,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                cloudiness: data.clouds.all,
            })
        })
}
export const getForecastsByCity = async (city) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`).then(response => {
        if (response.status === 200) {
            return response.json()
        }
        else {
            throw new Error();
        }
    }).then(data => {
        const result = []
        let currentDay = new Date().getDay()

        data.list.forEach(forecast => {
            let dayOfWeek = days[new Date(forecast.dt * 1000).getDay()]

            if (days[currentDay] !== dayOfWeek) {
                result.push({
                    day: days[new Date(forecast.dt * 1000).getDay()],
                    icon: forecast.weather[0].icon,
                    temperature: forecast.main.temp,
                    state: forecast.weather[0].description[0].toUpperCase() + forecast.weather[0].description.slice(1),
                })
                currentDay = currentDay + 1 > 6 ? 0 : currentDay + 1;
            }
        });

        return result.slice(0, 4)
    })
}