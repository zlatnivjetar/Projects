let weather = {
  apiKey: "127d797e65c1770b9b22a8233d97dff7",
  fetchWeather: (city) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weather.apiKey
    )
      .then((response) => response.json())
      .then((data) => weather.displayWeather(data))
  },
  displayWeather: (data) => {
    const { name } = data
    const { main, icon, description } = data.weather[0]
    const { humidity, temp } = data.main
    const { speed } = data.wind
    document.querySelector('.city').innerText = "Weather in " + name
    document.querySelector('.temp').innerText = (temp - 273.15).toFixed(1) + "\u02DAC"
    document.querySelector('.type').innerText = `${main} - ${description}`
    document.querySelector('.humidity').innerText = "Humidity: " + humidity + "%"
    document.querySelector('.wind').innerText = "Wind speed: " + speed + " km/h"
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector('.weather').classList.remove('loading')
    document.querySelector('.card').style.backgroundImage = `url(/img/${main}.jpg)`
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`

  },
  search: () => {
    const search = document.querySelector('.search-bar').value
    weather.fetchWeather(search)
  }
}

document.querySelector('.search-button').addEventListener('click', () => {
  weather.search()
})

document.querySelector('.search-bar').addEventListener('keyup', (e) => {
  if (e.key === "Enter") {
    weather.search()
  }
})
