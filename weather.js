document.addEventListener('DOMContentLoaded', () => {
    const weatherDiv = document.getElementById('weatherData');
    const locationForm = document.getElementById('locationForm');

    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const locationInput = document.getElementById('locationInput').value.trim();
        if (locationInput) {
            fetchWeather(locationInput);
        } else {
            weatherDiv.innerHTML = `<p>Please enter a location.</p>`;
        }
    });

    function fetchWeather(location) {
        const apiKey =`api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=93254cd627a55124e04f742d54e7a679`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherDiv.innerHTML = `<p>${data.message}</p>`;
                }
            })
            .catch(error => {
                weatherDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
            });
    }

    function displayWeather(data) {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherDiv.innerHTML = `
            <p>Temperature: ${temp}°C</p>
            <p>Conditions: ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
    }
});
