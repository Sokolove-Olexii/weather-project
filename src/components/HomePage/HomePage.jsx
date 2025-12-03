import { useState, useEffect } from "react";
import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { Hero } from "../Hero/Hero.jsx";
import { Interact } from "../Interact/Interact.jsx";
import { WeatherCard } from "../WeatherCard/WeatherCard.jsx";
import { SeeMore } from "../SeeMore/SeeMore.jsx";
import { DailyForecast } from "../DailyForecast/DailyForecast.jsx";

const API_KEY = "352776a7cec67a372aa5f5597af2eab5";

export const HomePage = () => {
  const [cities, setCities] = useState([]);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [seeMoreData, setSeeMoreData] = useState(null);

  // api.open-meteo.com/v1
  const convertWeatherDescription = (code) => {
    if (code === 0) return "Clear sky"; // Clear
    if ([1, 2, 3].includes(code)) return "Partly cloudy"; // Cloudy
    if ([45, 48].includes(code)) return "Fog"; // Fog
    if ([51, 53, 55].includes(code)) return "Drizzle"; // Drizzle
    if ([56, 57].includes(code)) return "Freezing Drizzle"; // Freezing drizzle Drizzle
    if ([61, 63, 65].includes(code)) return "Rain"; // Rain
    if ([66, 67].includes(code)) return "Freezing rain"; // Freezing rain
    if ([71, 73, 75].includes(code)) return "Snow"; // Snow
    if ([77].includes(code)) return "Snow grains"; // Snow grains
    if ([80, 81, 82].includes(code)) return "Rain showers"; // Rain showers
    if ([85, 86].includes(code)) return "Snow showers"; // Snow showers
    if ([95].includes(code)) return "Thundershtorm"; // Thundershtorm
    if ([96, 99].includes(code)) return "Thundershtorm"; // Thundershtorm
    return "Unknown";
  };

  const convertWeatherCode = (code) => {
    if (code === 0) return "01d"; // Clear sky
    if ([1, 2, 3].includes(code)) return "02d"; // Partly cloudy / Cloudy
    if ([45, 48].includes(code)) return "50d"; // Fog
    if ([51, 53, 55].includes(code)) return "09d"; // Drizzle
    if ([56, 57].includes(code)) return "09d"; // Freezing Drizzle
    if ([61, 63, 65].includes(code)) return "10d"; // Rain
    if ([66, 67].includes(code)) return "10d"; // Freezing rain
    if ([71, 73, 75].includes(code)) return "13d"; // Snow
    if ([77].includes(code)) return "13d"; // Snow grains
    if ([80, 81, 82].includes(code)) return "09d"; // Rain showers
    if ([85, 86].includes(code)) return "13d"; // Snow showers
    if ([95].includes(code)) return "11d"; // Thunderstorm
    if ([96, 99].includes(code)) return "11d"; // Thunderstorm with hail
    return "02d"; // Default: partly cloudy
  };

  const getWeather = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("City not found");
    return await res.json();
  };

  const getForecast = async (lat, lon) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    if (!res.ok) throw new Error("Forecast not found");
    const data = await res.json();

    // format for DailyForecast.jsx
    return data.daily.time.map((date, i) => ({
      dt: new Date(date).getTime() / 1000,
      temp: {
        day: data.daily.temperature_2m_max[i],
        night: data.daily.temperature_2m_min[i],
      },
      weather: [
        {
          main: "—",
          description: convertWeatherDescription(data.daily.weathercode[i]),
          icon: convertWeatherCode(data.daily.weathercode[i]),
        },
      ],
    }));
  };

  const addCity = async (city) => {
    try {
      const data = await getWeather(city);

      setCities((prev) =>
        prev.some((c) => c.name === data.name) ? prev : [...prev, data]
      );
    } catch {
      alert("City not found");
    }
  };

  const handleOpenSeeMore = async (city) => {
    setSeeMoreData(city);
    setDailyForecastData(null);

    try {
      const forecast = await getForecast(city.coord.lat, city.coord.lon);
      setDailyForecastData(forecast);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshCity = async (cityName) => {
    const updated = await getWeather(cityName);

    setCities((prev) => prev.map((c) => (c.name === cityName ? updated : c)));
  };

  const deleteCity = (cityName) => {
    setCities((prev) => prev.filter((c) => c.name !== cityName));
  };

  useEffect(() => {
    const saved = localStorage.getItem("cities");
    if (saved) {
      const list = JSON.parse(saved);
      Promise.all(list.map((name) => getWeather(name)))
        .then(setCities)
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities.map((c) => c.name)));
  }, [cities]);

  // const toggleSeeMore = (city) => {
  //   setSeeMoreData((prev) => (prev && prev.id === city.id ? null : city));
  // };

  const handleCloseSeeMore = () => {
    setSeeMoreData(null);
    setDailyForecastData(null);
  };

  return (
    <>
      <Header />
      <main>
        <Hero onSearch={addCity} />
        <section
          style={{
            padding: "40px 0",
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {cities.map((city) => (
            <WeatherCard
              key={city.id}
              data={city}
              onRefresh={() => refreshCity(city.name)}
              onDelete={() => deleteCity(city.name)}
              onOpen={() => console.log(city.name)}
              onOpenSeeMore={() => handleOpenSeeMore(city)}
            />
          ))}
        </section>
        {seeMoreData && (
          <>
            <SeeMore data={seeMoreData} onClose={handleCloseSeeMore} />

            <section style={{ padding: "80px 0" }}>
              {dailyForecastData ? (
                <DailyForecast forecast={dailyForecastData} />
              ) : (
                <p style={{ textAlign: "center" }}>Loading forecast...</p>
              )}
            </section>
          </>
        )}
        <Interact />
      </main>
      <Footer />
    </>
  );
};
