document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const locationBtn = document.getElementById('location-btn');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const weatherInfo = document.getElementById('weather-info');
    
    // Éléments d'affichage météo
    const cityName = document.getElementById('city-name');
    const currentDate = document.getElementById('current-date');
    const currentTemp = document.getElementById('current-temp');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDesc = document.getElementById('weather-desc');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    
    // Clé API OpenWeather (remplacer par votre clé)
    const apiKey = 'd4a760771f70680d63dee3e3f55b10b8';
    
    // Initialisation
    checkGeolocation();
    
    // Événements
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherByCity(city);
        }
    });
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeatherByCity(city);
            }
        }
    });
    
    locationBtn.addEventListener('click', () => {
        getLocation();
    });
    
    // Fonctions
    async function fetchWeatherByCity(city) {
        showLoading();
        hideError();
        hideWeatherInfo();
        
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}
                `);
                // https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}
            
            if (!response.ok) {
                console.error('Erreur lors de la récupération des données météo:', response.statusText);
                throw new Error('Ville non trouvée');
            }
            
            const data = await response.json();
            displayWeather(data);
            console.log(data);
        } catch (error) {
            console.error('Erreur:', error);
            showError(error.message);
        }
    }
    
    async function fetchWeatherByCoords(lat, lon) {
        showLoading();
        hideError();
        hideWeatherInfo();
        
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`);
            console.log(`okkkk https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`);
            if (!response.ok) {
                console.error('Erreur lors de la récupération des données météo:', response.statusText);
                throw new Error('Impossible de récupérer les données météo');
            }
            
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        } catch (error) {
            showError(error.message);
            console.error('Erreur:', error);
        }
    }
    
    function displayWeather(data) {
        // Températures min/max
document.getElementById('temp-min').textContent = `${Math.round(data.main.temp_min)}°C`;
document.getElementById('temp-max').textContent = `${Math.round(data.main.temp_max)}°C`;

// Pression atmosphérique
document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

// Visibilité (convertie en km)
document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;

// Couverture nuageuse
document.getElementById('clouds').textContent = `${data.clouds.all}%`;

// Heures de lever/coucher du soleil
const sunriseTime = new Date(data.sys.sunrise * 1000);
const sunsetTime = new Date(data.sys.sunset * 1000);
document.getElementById('sunrise').textContent = sunriseTime.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
document.getElementById('sunset').textContent = sunsetTime.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
        // Mise à jour des données
        cityName.textContent = data.name;
        currentTemp.textContent = Math.round(data.main.temp);
        weatherDesc.textContent = data.weather[0].description;
        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        
        // Mise à jour de la date
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        currentDate.textContent = now.toLocaleDateString('fr-FR', options);
        
        // Mise à jour de l'icône
        updateWeatherIcon(data.weather[0].icon, data.weather[0].main);
        
        // Application du thème
        applyWeatherTheme(data.weather[0].main, data.sys.sunset);
        
        // Affichage
        hideLoading();
        showWeatherInfo();
    }
    
    function updateWeatherIcon(iconCode, weatherMain) {
        const iconElement = weatherIcon.querySelector('i');
        
        // Supprimer toutes les classes précédentes
        iconElement.className = 'fas';
        
        // Déterminer l'icône en fonction du code ou du type de météo
        switch (weatherMain.toLowerCase()) {
            case 'thunderstorm':
                iconElement.classList.add('fa-bolt');
                break;
            case 'drizzle':
                iconElement.classList.add('fa-cloud-rain');
                break;
            case 'rain':
                iconElement.classList.add('fa-cloud-showers-heavy');
                break;
            case 'snow':
                iconElement.classList.add('fa-snowflake');
                break;
            case 'clear':
                iconElement.classList.add('fa-sun');
                break;
            case 'clouds':
                if (iconCode.includes('n')) {
                    iconElement.classList.add('fa-moon');
                } else {
                    iconElement.classList.add('fa-cloud');
                }
                break;
            default:
                iconElement.classList.add('fa-smog');
        }
    }
    
    function applyWeatherTheme(weatherMain, sunsetTimestamp) {
        // Supprimer tous les thèmes précédents
        document.body.classList.remove('sunny', 'rainy', 'cloudy', 'snowy', 'night');
        
        const now = new Date().getTime() / 1000;
        const isNight = sunsetTimestamp && now > sunsetTimestamp;
        
        if (isNight) {
            document.body.classList.add('night');
            return;
        }
        
        switch (weatherMain.toLowerCase()) {
            case 'clear':
                document.body.classList.add('sunny');
                break;
            case 'rain':
            case 'drizzle':
            case 'thunderstorm':
                document.body.classList.add('rainy');
                break;
            case 'clouds':
                document.body.classList.add('cloudy');
                break;
            case 'snow':
                document.body.classList.add('snowy');
                break;
            default:
                // Thème par défaut
                break;
        }
    }
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherByCoords(lat, lon);
                },
                (error) => {
                    showError('Géolocalisation refusée. Veuillez activer la géolocalisation ou rechercher une ville manuellement.');
                }
            );
        } else {
            showError('La géolocalisation n\'est pas supportée par votre navigateur.');
        }
    }
    
    function checkGeolocation() {
        showLoading();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherByCoords(lat, lon);
                },
                () => {
                    // Si la géolocalisation est refusée, afficher Paris par défaut
                    fetchWeatherByCity('Paris');
                }
            );
        } else {
            // Si la géolocalisation n'est pas supportée, afficher Paris par défaut
            fetchWeatherByCity('Paris');
        }
    }
    
    // Fonctions d'affichage/masquage
    function showLoading() {
        loadingElement.style.display = 'flex';
        errorElement.style.display = 'none';
        weatherInfo.style.display = 'none';
    }
    
    function hideLoading() {
        loadingElement.style.display = 'none';
    }
    
    function showError(message) {
        errorText.textContent = message;
        errorElement.style.display = 'flex';
        weatherInfo.style.display = 'none';
        loadingElement.style.display = 'none';
    }
    
    function hideError() {
        errorElement.style.display = 'none';
    }
    
    function showWeatherInfo() {
        weatherInfo.style.display = 'flex';
    }
    
    function hideWeatherInfo() {
        weatherInfo.style.display = 'none';
    }
});