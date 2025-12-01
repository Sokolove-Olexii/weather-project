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

  const getWeather = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("City not found");
    return await res.json();
  };

  const getForecast = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("Forecast not found");
    return await res.json();
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

  const toggleSeeMore = (city) => {
    setSeeMoreData((prev) => (prev && prev.id === city.id ? null : city));
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
              onOpenSeeMore={() => toggleSeeMore(city)}
            />
          ))}
        </section>
        {seeMoreData && (
          <section>
            <SeeMore data={seeMoreData} onClose={() => setSeeMoreData(null)} />
            <DailyForecast
              data={seeMoreData}
              onClose={() => setSeeMoreData(null)}
            />
          </section>
        )}
        <Interact />
      </main>
      <Footer />
    </>
  );
};
