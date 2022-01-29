import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { LocationMarkerIcon, GlobeIcon } from "@heroicons/react/solid";

const api = {
  key: "5fd4af78deeae88cfafc0c004e64ce8d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Thuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="app pt-20">
      <main className="max-w-screen-sm mx-auto ">
        <div className="text-center">
          <input
            type="text"
            placeholder="Enter the name of your region or city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            className="bg-transparent w-1/2 text-gray-50 text-sm border rounded-lg border-gray-200 p-4  "
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div className="text-center mt-8">
            <div>
              <div className="flex justify-center">
                <LocationMarkerIcon className="w-8 h-8 text-gray-300/80 mb-2" />
              </div>
              <div className="text-gray-300 mb-2  text-xl">
                {weather.name},{weather.sys.country}
              </div>
              <div className="text-gray-300 font-thin text-sm">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div>
              <div className="bg-gray-300/20 max-w-fit mx-auto p-5 text-gray-300 font text-3xl my-4 rounded-md">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="text-gray-300 font-medium">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* footer */}
        <div className=" relative flex justify-center mt-40">
          <GlobeIcon className="h-5 w-5 text-gray-300/90 mr-2 " />
          <p className=" text-gray-300/90 ">Copyright 2022</p>

          {/* <a href="https://instagram.com/nanda_novan">@nanda_novan</a> */}
        </div>
      </main>
    </div>
  );
}

export default App;
