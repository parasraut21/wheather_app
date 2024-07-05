import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Container, CircularProgress, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCurrentWeather, getForecast } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const getThemeAndBackground = (condition) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return {
        theme: createTheme({
          palette: {
            mode: 'light',
            primary: { main: '#FF6B6B' },
            background: { default: '#FFD166', paper: 'rgba(255, 209, 102, 0.8)' },
          },
        }),
        background: 'linear-gradient(135deg, #FFD166 0%, #FF9999 100%)',
        icon: <WbSunnyIcon sx={{ fontSize: 60, color: '#FF6B6B' }} />,
      };
    case 'rain':
    case 'heavy rain':
    case 'moderate rain':
      return {
        theme: createTheme({
          palette: {
            mode: 'dark',
            primary: { main: '#4ECDC4' },
            background: { default: '#292F36', paper: 'rgba(41, 47, 54, 0.8)' },
          },
        }),
        background: 'linear-gradient(135deg, #292F36 0%, #4ECDC4 100%)',
        icon: <UmbrellaIcon sx={{ fontSize: 60, color: '#4ECDC4' }} />,
      };
    case 'partly cloudy':
    case 'cloudy':
      return {
        theme: createTheme({
          palette: {
            mode: 'light',
            primary: { main: '#45B7D1' },
            background: { default: '#E0E0E0', paper: 'rgba(224, 224, 224, 0.8)' },
          },
        }),
        background: 'linear-gradient(135deg, #E0E0E0 0%, #45B7D1 100%)',
        icon: <CloudIcon sx={{ fontSize: 60, color: '#45B7D1' }} />,
      };
    case 'snow':
      return {
        theme: createTheme({
          palette: {
            mode: 'light',
            primary: { main: '#6B9080' },
            background: { default: '#F0F7F4', paper: 'rgba(240, 247, 244, 0.8)' },
          },
        }),
        background: 'linear-gradient(135deg, #F0F7F4 0%, #A4C3B2 100%)',
        icon: <AcUnitIcon sx={{ fontSize: 60, color: '#6B9080' }} />,
      };
    default:
      return {
        theme: createTheme({
          palette: {
            mode: 'dark',
            primary: { main: '#90caf9' },
            background: { default: '#0a1929', paper: 'rgba(30, 58, 95, 0.8)' },
          },
        }),
        background: 'linear-gradient(135deg, #0a1929 0%, #1e3a5f 100%)',
        icon: <CloudIcon sx={{ fontSize: 60, color: '#90caf9' }} />,
      };
  }
};

const WeatherDetails = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const city = searchParams.get('city');

      if (!city) {
        setError('No city specified');
        setLoading(false);
        toast.error('No city specified');
        navigate('/');
        return;
      }

      try {
        const [currentRes, forecastRes] = await Promise.all([
          getCurrentWeather(city),
          getForecast(city, 7)
        ]);

        setWeatherData({
          current: currentRes.data,
          forecast: forecastRes.data
        });
        toast.success('Weather data loaded successfully');
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data');
        toast.error('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, navigate]);

  const formatChartData = (forecastData) => {
    return forecastData.forecast.forecastday.map(day => ({
      date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      max: day.day.maxtemp_c,
      min: day.day.mintemp_c,
      avg: day.day.avgtemp_c,
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="error" variant="h4">{error}</Typography>
      </Container>
    );
  }

  if (!weatherData) {
    return null;
  }

  const { current, forecast } = weatherData;
  const chartData = formatChartData(forecast);
  const { theme, background, icon } = getThemeAndBackground(current.current.condition.text);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: background,
          transition: 'background 0.5s ease-in-out',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="md">
          <ToastContainer position="top-right" autoClose={3000} theme={theme.palette.mode} />
          <Box sx={{ pt: 4, pb: 4 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Weather in {current.location.name}, {current.location.country}
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Paper elevation={6} sx={{ p: 3, mb: 3, backgroundColor: 'background.paper', backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>Current Weather</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    {icon}
                  </Grid>
                  <Grid item>
                    <Typography variant="h3" sx={{ color: 'primary.main' }}>{current.current.temp_c}°C</Typography>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>{current.current.condition.text}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'text.secondary' }}>Wind: {current.current.wind_kph} km/h</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Humidity: {current.current.humidity}%</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>Temperature Trend</Typography>
              <Paper elevation={6} sx={{ p: 3, mb: 3, height: 400, backgroundColor: 'background.paper', backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: '5px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="max" stroke={theme.palette.error.main} name="Max Temp" />
                    <Line type="monotone" dataKey="min" stroke={theme.palette.info.main} name="Min Temp" />
                    <Line type="monotone" dataKey="avg" stroke={theme.palette.success.main} name="Avg Temp" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>7-Day Forecast</Typography>
              <Grid container spacing={2}>
                {forecast.forecast.forecastday.map((day, index) => (
                  <Grid item xs={12} sm={6} md={3} key={day.date}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * index }}>
                      <Paper elevation={6} sx={{ p: 2, textAlign: 'center', backgroundColor: 'background.paper', backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
                        <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </Typography>
                        {getThemeAndBackground(day.day.condition.text).icon}
                        <Typography sx={{ color: 'text.secondary' }}>{day.day.condition.text}</Typography>
                        <Typography sx={{ color: 'primary.main' }}>Max: {day.day.maxtemp_c}°C</Typography>
                        <Typography sx={{ color: 'primary.main' }}>Min: {day.day.mintemp_c}°C</Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default WeatherDetails;
