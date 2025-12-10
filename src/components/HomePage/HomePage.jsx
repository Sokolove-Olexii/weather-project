import { useState, useEffect } from "react";
import { Slide, toast } from "react-toastify";
import { Header } from "../Header/Header.jsx";
import { Hero } from "../Hero/Hero.jsx";
import { WeatherCard } from "../WeatherCard/WeatherCard.jsx";
import { SeeMore } from "../SeeMore/SeeMore.jsx";
import { DailyForecast } from "../DailyForecast/DailyForecast.jsx";
import { Interact } from "../Interact/Interact.jsx";
import { CoverflowSlider } from "../Slider/Slider.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { HourlyChart } from "../HourlyChart/HourlyChart.jsx";

const API_KEY = "352776a7cec67a372aa5f5597af2eab5";

export const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cities, setCities] = useState([]);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [seeMoreData, setSeeMoreData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);

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

  const getHourlyForecast = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=${API_KEY}`
    );

    const data = await res.json();

    return data.list.map((item) => ({
      time: item.dt_txt.slice(11, 16),
      temp: Math.round(item.main.temp),
    }));
  };

  const handleHourly = async (city) => {
    if (!isLoggedIn) {
      toast.error("You must log in first");
      return;
    }
    if (hourlyData && hourlyData.city === city.name) {
      setHourlyData(null);
      return;
    }

    const hourly = await getHourlyForecast(city);
    setHourlyData({
      city: city.name,
      data: hourly,
    });
  };

  const getWeather = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) {
      toast.error("City not found", {
        transition: Slide,
      });
      return null;
    } // else {
    //   // toast.success("Added successfully");
    // }
    return await res.json();
    // if (!res.ok) throw new Error("City not found");
    // return await res.json();
  };

  const getTimeZone = async (city) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/geocoding?name=${city}`
    );

    const data = await res.json();
    return data?.results?.[0]?.timezone || "UTC";
  };

  const getForecast = async (lat, lon, timezone) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}`
    );

    const data = await res.json();

    // format for DailyForecast.jsx
    return data.daily.time.map((date, i) => ({
      dt: Date.parse(date + "T00:00:00Z") / 1000,
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
      if (!data) return;
      setCities((prev) =>
        prev.some((c) => c.name === data.name) ? prev : [...prev, data]
      );
    } catch {
      alert("City not found");
    }
  };

  const handleOpenSeeMore = async (city) => {
    if (!isLoggedIn) {
      toast.error("You must log in first");
      return;
    }
    if (seeMoreData && seeMoreData.name === city.name) {
      handleCloseSeeMore();
      return;
    }
    setSeeMoreData(city);
    setDailyForecastData(null);

    try {
      const timezone = await getTimeZone(city.name);
      const forecast = await getForecast(
        city.coord.lat,
        city.coord.lon,
        timezone
      );
      setDailyForecastData(forecast);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshCity = async (cityName) => {
    const updated = await getWeather(cityName);
    if (!updated) return;
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

  const handleCloseSeeMore = () => {
    setSeeMoreData(false);
    setDailyForecastData(false);
    setHourlyData(false);
  };

  return (
    <>
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
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
              onToggleSeeMore={() => handleOpenSeeMore(city)}
              onHourlyForecast={() => handleHourly(city)}
            />
          ))}
        </section>
        {seeMoreData && (
          <>
            <SeeMore
              data={seeMoreData}
              onClose={handleCloseSeeMore}
              isLoggedIn={isLoggedIn}
            />

            <section style={{ padding: "80px 0" }}>
              {dailyForecastData ? (
                <DailyForecast forecast={dailyForecastData} />
              ) : (
                <p style={{ textAlign: "center" }}>Loading forecast...</p>
              )}
            </section>
          </>
        )}
        {hourlyData && (
          <HourlyChart data={hourlyData.data} isLoggedIn={isLoggedIn} />
        )}
        <Interact />
        <CoverflowSlider />
      </main>
      <Footer />
    </>
  );
};
