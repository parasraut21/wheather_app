import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_HOST = process.env.REACT_APP_WEATHER_API_HOST;
const API_BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  },
});

export const getCurrentWeather = (query) => {
  return api.get(`/current.json?q=${query}`);
};

export const getForecast = (query, days = 7) => {
  return api.get(`/forecast.json?q=${query}&days=${days}`);
};
