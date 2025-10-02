// Get references to the HTML elements
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const weatherInfo = document.querySelector('.weather-info');
const errorMessage = document.querySelector('.error-message');

// --- IMPORTANT: Paste your API Key here! ---
const apiKey = "50bef2d009f8cca8891fc520b10334cf"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Function to get weather data
async function getWeather(city) {
    // Hide previous results and errors
    weatherInfo.style.display = "none";
    errorMessage.style.display = "none";
    
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // If city not found, API returns a 404
        if (response.status == 404) {
            errorMessage.style.display = "block";
            return;
        }
        
        const data = await response.json();
        
        // Update the HTML with the new weather data
        document.querySelector('.city').textContent = data.name;
        document.querySelector('.temp').textContent = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').textContent = data.main.humidity + "%";
        document.querySelector('.wind').textContent = data.wind.speed + " km/h";
        
        // Show the weather info card
        weatherInfo.style.display = "block";
        
    } catch (error) {
        // Handle general errors (like network issues)
        console.error("Error fetching weather data:", error);
        errorMessage.textContent = "Could not fetch weather data. Please check your connection.";
        errorMessage.style.display = "block";
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    if (searchBox.value) {
        getWeather(searchBox.value);
    }
});

// Event listener for pressing "Enter" in the search box
searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && searchBox.value) {
        getWeather(searchBox.value);
    }
});