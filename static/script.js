const cityInput = document.getElementById("cityInput");
const cityGrid = document.getElementById("cityGrid");
const errorMsg = document.getElementById("errorMsg");
const suggestionsList = document.getElementById("suggestions");

const addedCities = [];

function saveCities() {
    localStorage.setItem("weatherCities", JSON.stringify(addedCities));
}

function loadSavedCities() {
    const saved = localStorage.getItem("weatherCities");
    if (saved) {
        const cities = JSON.parse(saved);
        cities.forEach(city => fetchWeather(city));
    }
}

const cityList = [
    "Abidjan", "Abuja", "Accra", "Addis Ababa", "Adelaide", "Agra", "Ahmedabad",
    "Ajman", "Albany", "Aleppo", "Alexandria", "Algiers", "Alicante",
    "Almaty", "Amman", "Amsterdam", "Anchorage", "Ankara", "Antananarivo",
    "Antwerp", "Ashgabat", "Asmara", "Asuncion", "Athens", "Atlanta",
    "Auckland", "Austin", "Baguio", "Baku", "Bamako", "Bandar Seri Begawan",
    "Bangkok", "Bangui", "Banjul", "Barcelona", "Barranquilla", "Basra", "Batumi",
    "Beijing", "Beirut", "Belgrade", "Bergen", "Berlin", "Bern",
    "Bishkek", "Bogota", "Brasilia", "Bratislava", "Brazzaville",
    "Brisbane", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Bujumbura",
    "Busan", "Cairo", "Calgary", "Cape Town", "Caracas",
    "Casablanca", "Cebu", "Chennai", "Chengdu", "Chicago", "Chisinau", "Chittagong",
    "Chongqing", "Colombo", "Conakry", "Copenhagen", "Curitiba",
    "Dakar", "Dallas", "Damascus", "Dar es Salaam", "Delhi", "Denver", "Dhaka",
    "Djibouti", "Doha", "Douala", "Dubai", "Dublin", "Durban", "Dushanbe",
    "Edinburgh", "Edmonton", "Frankfurt", "Freetown", "Fukuoka",
    "Gaborone", "Geneva", "Glasgow", "Guangzhou", "Guatemala City", "Guayaquil",
    "Hamburg", "Hanoi", "Harare", "Havana", "Helsinki",
    "Ho Chi Minh City", "Hong Kong", "Honolulu", "Houston", "Hyderabad",
    "Incheon", "Islamabad", "Istanbul", "Jakarta", "Jeddah",
    "Jerusalem", "Johannesburg", "Kabul", "Kampala", "Karachi", "Kathmandu",
    "Khartoum", "Kigali", "Kingston", "Kinshasa", "Kolkata", "Kuala Lumpur",
    "Kuwait City", "Kyoto", "Lagos", "Lahore", "Las Vegas", "La Paz",
    "Libreville", "Lilongwe", "Lima", "Lisbon", "Ljubljana", "Lome", "London",
    "Los Angeles", "Luanda", "Lusaka", "Luxembourg", "Macau", "Madrid",
    "Managua", "Manama", "Manila", "Maputo", "Melbourne", "Mexico City",
    "Miami", "Milan", "Minneapolis", "Minsk", "Mogadishu", "Montevideo",
    "Montreal", "Moscow", "Mumbai", "Munich", "Muscat", "Nairobi", "Naples",
    "Nassau", "Niamey", "Nicosia", "Nouakchott", "Novosibirsk", "Osaka",
    "Oslo", "Ottawa", "Ouagadougou", "Panama City", "Paris", "Perth",
    "Philadelphia", "Phnom Penh", "Phoenix", "Port Moresby", "Port-au-Prince",
    "Port of Spain", "Porto", "Prague", "Pretoria", "Pyongyang", "Quito",
    "Rabat", "Reykjavik", "Riga", "Rio de Janeiro", "Riyadh", "Rome",
    "Saint Petersburg", "San Diego", "San Francisco", "San Jose", "San Salvador",
    "Santiago", "Santo Domingo", "Sao Paulo", "Sarajevo", "Seattle", "Seoul",
    "Shanghai", "Sharjah", "Shenzhen", "Singapore", "Skopje", "Sofia",
    "Stockholm", "Surabaya", "Suva", "Sydney", "Taipei", "Tallinn",
    "Tashkent", "Tbilisi", "Tehran", "Tel Aviv", "Tirana", "Tokyo",
    "Toronto", "Tripoli", "Tunis", "Ulaanbaatar", "Vancouver", "Vienna",
    "Vientiane", "Vilnius", "Warsaw", "Washington", "Wellington", "Windhoek",
    "Winnipeg", "Yangon", "Yaounde", "Yerevan", "Zagreb", "Zurich",
    "Abha", "Aberdeen", "Abu Dhabi", "Acapulco", "Adana", "Agadir",
    "Aguascalientes", "Ahvaz", "Akita", "Akure", "Al Ain", "Albacete",
    "Alice Springs", "Allahabad", "Amarillo", "Amiens", "Amravati", "Amritsar",
    "Antalya", "Aracaju", "Arequipa", "Arusha", "Asahikawa", "Aswan",
    "Bacolod", "Bahir Dar", "Balikpapan", "Ballarat", "Bamenda", "Bandung",
    "Banjarmasin", "Baoding", "Baotou", "Barnaul", "Baton Rouge", "Battambang",
    "Beaumont", "Beira", "Benghazi", "Benin City", "Bhopal", "Bhubaneswar",
    "Bilbao", "Birmingham", "Blantyre", "Bloemfontein", "Bordeaux", "Bradford",
    "Braga", "Bridgetown", "Bristol", "Bruges", "Bulawayo", "Bursa",
    "Cagliari", "Calicut", "Cancun", "Cartagena", "Castries", "Catania",
    "Chandigarh", "Changchun", "Changsha", "Charlotte", "Chiang Mai",
    "Chihuahua", "Ciudad Juarez", "Coimbatore", "Coimbra", "Colorado Springs",
    "Columbus", "Coventry", "Craiova", "Culiacan", "Cusco", "Da Nang",
    "Daegu", "Daejeon", "Dalian", "Dammam", "Davao", "Detroit", "Dire Dawa",
    "Diyarbakir", "Dnipro", "Dodoma", "Dresden", "Duisburg", "Durres",
    "Erfurt", "Erzurum", "Eskisehir", "Fez", "Fukushima", "Ganzhou",
    "Gaziantep", "Gdansk", "Geelong", "Gent", "Goma", "Gorakhpur",
    "Gothenburg", "Graz", "Guadalajara", "Guiyang", "Gujranwala", "Guwahati",
    "Gwangju", "Haifa", "Haikou", "Hamamatsu", "Hamhung", "Handan",
    "Hangzhou", "Harbin", "Hargeysa", "Hartford", "Hefei", "Herat",
    "Hiroshima", "Hobart", "Homs", "Huambo", "Iasi", "Iloilo", "Ilorin",
    "Imphal", "Indore", "Iquique", "Iquitos", "Isfahan", "Jabalpur",
    "Jaipur", "Jammu", "Jamshedpur", "Jinan", "Jodhpur", "Johor Bahru",
    "Jos", "Kagoshima", "Kano", "Kanpur", "Kayseri", "Kazan", "Kediri",
    "Khabarovsk", "Kharkiv", "Kisangani", "Kisumu", "Kitakyushu", "Kobe",
    "Konya", "Kota Kinabalu", "Kumasi", "Kumamoto", "Kunming", "Kyiv",
    "La Serena", "Lanzhou", "Lhasa", "Loja", "Lubumbashi", "Lucknow",
    "Ludhiana", "Luoyang", "Lviv", "Maceio", "Madurai", "Maiduguri",
    "Makassar", "Malang", "Mandalay", "Manizales", "Mannheim", "Maracaibo",
    "Marrakech", "Marseille", "Mashhad", "Mbuji-Mayi", "Medan", "Medina",
    "Meerut", "Mendoza", "Merida", "Metz", "Mombasa", "Mosul", "Multan",
    "Murcia", "Murmansk", "Mysore", "Nagoya", "Nagpur", "Nampula",
    "Nanchang", "Nanjing", "Nanning", "Nantes", "Nantong", "Nay Pyi Taw",
    "Ndola", "Newcastle", "Nizhny Novgorod", "Norfolk", "Odessa", "Omaha",
    "Omsk", "Oran", "Orlando", "Palu", "Patna", "Pekanbaru", "Penang",
    "Pereira", "Perm", "Peshawar", "Pittsburgh", "Plovdiv", "Pontianak",
    "Poznan", "Puebla", "Pune", "Rawalpindi", "Ribeirao Preto",
    "Rostov-on-Don", "Sacramento", "Salalah", "Saltillo", "Samara",
    "Samarkand", "San Luis Potosi", "Sana", "Santa Cruz", "Santander",
    "Sapporo", "Sendai", "Sfax", "Shantou", "Shenyang", "Shijiazhuang",
    "Shimla", "Shiraz", "Sibiu", "Sialkot", "Sivas", "Sochi", "Sokoto",
    "Sorocaba", "Sousse", "Split", "Srinagar", "Stuttgart", "Sucre",
    "Suzhou", "Tabriz", "Taichung", "Tainan", "Taizhou", "Tamale",
    "Tangier", "Tanta", "Taranto", "Tegucigalpa", "Thiruvananthapuram",
    "Tijuana", "Tiruchirappalli", "Toamasina", "Torreon", "Toulon",
    "Toulouse", "Trabzon", "Tucson", "Tulsa", "Turin", "Ufa", "Ujjain",
    "Ulsan", "Vadodara", "Valencia", "Valparaiso", "Varanasi", "Venice",
    "Veracruz", "Visakhapatnam", "Vladivostok", "Volgograd", "Wuhan",
    "Wuxi", "Xiamen", "Xian", "Xuzhou", "Yancheng", "Yekaterinburg",
    "Zhengzhou", "Zibo", "Zaria", "Zarqa"
];

cityInput.addEventListener("input", () => {
    const query = cityInput.value.trim().toLowerCase();
    suggestionsList.innerHTML = "";

    if (query.length < 1) {
        suggestionsList.style.display = "none";
        return;
    }

    const matches = cityList.filter(city =>
        city.toLowerCase().startsWith(query)
    ).slice(0, 6);

    if (matches.length === 0) {
        suggestionsList.style.display = "none";
        return;
    }

    matches.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            cityInput.value = city;
            suggestionsList.style.display = "none";
            addCity(city);
        });
        suggestionsList.appendChild(li);
    });

    suggestionsList.style.display = "block";
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
        suggestionsList.style.display = "none";
    }
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        const isValidCity = cityList.some(c => c.toLowerCase() === city.toLowerCase());
        if (!isValidCity) {
            errorMsg.textContent = "Please select a city from the suggestions list.";
            return;
        }
        addCity(city);
    }
});

function addCity(city) {
    if (!city) return;

    if (addedCities.includes(city.toLowerCase())) {
        errorMsg.textContent = "This city is already added!";
        return;
    }

    errorMsg.textContent = "";
    suggestionsList.style.display = "none";
    fetchWeather(city);
}

async function fetchWeather(city) {
    try {
        const response = await fetch(`/weather/${city}`);
        const data = await response.json();

        if (data.error) {
            errorMsg.textContent = "City not found. Please check the spelling!";
            return;
        }

        addedCities.push(city.toLowerCase());
        saveCities();
        createCityCard(data);
        cityInput.value = "";

    } catch (error) {
        errorMsg.textContent = "Something went wrong. Is your server running?";
    }
}

function createCityCard(data) {
    const card = document.createElement("div");
    card.classList.add("city-card");
    card.id = `card-${data.city.toLowerCase()}`;

    card.innerHTML = `
        <button class="remove-btn" onclick="removeCity('${data.city.toLowerCase()}')">✕</button>
        <div class="city-name">${data.city}</div>
        <div class="city-country">${data.country}</div>
        <div class="city-time" id="time-${data.city.toLowerCase()}">--:--:--</div>
        <div class="city-date" id="date-${data.city.toLowerCase()}">---</div>
        <div class="weather-row">
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="icon"/>
            <div>
                <div class="weather-temp">${Math.round(data.temperature)}°C</div>
                <div class="weather-condition">${data.condition}</div>
            </div>
        </div>
        <div class="weather-humidity">💧 Humidity: ${data.humidity}%</div>
    `;

    cityGrid.appendChild(card);
    startClock(data.city, data.timezone);
}

function startClock(city, timezoneOffset) {
    function updateTime() {
        const timeEl = document.getElementById(`time-${city.toLowerCase()}`);
        const dateEl = document.getElementById(`date-${city.toLowerCase()}`);
        if (!timeEl) return;

        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const cityTime = new Date(utc + timezoneOffset * 1000);

        timeEl.textContent = cityTime.toLocaleTimeString();
        dateEl.textContent = cityTime.toLocaleDateString(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }
    updateTime();
    setInterval(updateTime, 1000);
}

function removeCity(cityLower) {
    const card = document.getElementById(`card-${cityLower}`);
    if (card) card.remove();
    const index = addedCities.indexOf(cityLower);
    if (index > -1) addedCities.splice(index, 1);
    saveCities();
}

loadSavedCities();