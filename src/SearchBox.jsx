import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./SearchBox.css";
import { useState } from "react";
import PropTypes from "prop-types";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const API_KEY = "f2f944250fcf972b846ebf3b980b62b4";

  /**
   * The function `getWeatherInfo` is an asynchronous function that fetches weather information from an
   * API and returns a result object containing various weather data.
   * @returns The function `getWeatherInfo` is returning a promise that resolves to an object
   * containing weather information for a specific city.
   */
  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  /**
   * The handleChange function updates the city state variable with the value of the input field.
   */
  let handleChange = (event) => {
    setCity(event.target.value);
  };

  /**
   * The handleSubmit function is an asynchronous function that handles form submission, logs the city,
   * clears the city input field, retrieves weather information, and updates the information.
   */
  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      let newinfo = await getWeatherInfo();
      updateInfo(newinfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form action="" onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /> <br />
        &nbsp;&nbsp;
        <Button variant="contained" type="submit" endIcon={<SendIcon />}>
          Search
        </Button>
        {error && <h3 style={{ color: "red" }}>No Such Place Exit!</h3>}
      </form>
    </div>
  );
}

SearchBox.propTypes = {
  updateInfo: PropTypes.object,
};
