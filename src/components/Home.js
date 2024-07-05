import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, TextField, Button, Box, Autocomplete, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SearchIcon from '@mui/icons-material/Search';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#0a1929',
      paper: '#1e3a5f',
    },
  },
});

const Home = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/cities.json')
      .then(response => response.json())
      .then(data => {
        setAllCities(data);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        toast.error('Failed to load city data');
      });
  }, []);

  useEffect(() => {
    if (city && city.length > 2) {
      const filteredCities = allCities.filter(c => 
        c.name.toLowerCase().includes(city.toLowerCase())
      ).slice(0, 5);  // Limit to 5 suggestions
      setSuggestions(filteredCities.map(c => c.name));
    } else {
      setSuggestions([]);
    }
  }, [city, allCities]);

  const handleSearch = () => {
    if (city) {
      navigate(`/weather?city=${encodeURIComponent(city)}`);
    } else {
      toast.error('Please enter a city name');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#90caf9' }}>
              Weather Wonder
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: '#64b5f6' }}>
              Get accurate weather forecasts for any city in the world
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper elevation={6} sx={{ p: 4, mt: 4, backgroundColor: 'rgba(30, 58, 95, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
              <Box component="form" sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Autocomplete
                  freeSolo
                  options={suggestions}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Enter city name"
                      variant="outlined"
                      sx={{
                        mr: { xs: 0, sm: 2 },
                        mb: { xs: 2, sm: 0 },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(144, 202, 249, 0.5)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(144, 202, 249, 0.8)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#90caf9',
                          },
                        },
                      }}
                    />
                  )}
                  value={city}
                  onChange={(event, newValue) => {
                    setCity(newValue || '');
                  }}
                  onInputChange={(event, newInputValue) => {
                    setCity(newInputValue || '');
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSearch}
                    sx={{
                      backgroundColor: '#64b5f6',
                      '&:hover': { backgroundColor: '#42a5f5' },
                      px: 4,
                      py: 2,
                      ml: { xs: 0, sm: 2 },
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 14px 0 rgba(100, 181, 246, 0.39)',
                    }}
                  >
                    <SearchIcon sx={{ mr: 1 }} />
                    Search
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Box>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }}>
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            style={{ position: 'absolute', top: '10%', left: '10%' }}
          >
            <CloudIcon sx={{ fontSize: 100, color: 'rgba(144, 202, 249, 0.2)' }} />
          </motion.div>
          <motion.div
            animate={{
              x: [0, -150, 0],
              y: [0, 100, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            style={{ position: 'absolute', top: '50%', right: '20%' }}
          >
            <WbSunnyIcon sx={{ fontSize: 80, color: 'rgba(255, 235, 59, 0.2)' }} />
          </motion.div>
          <motion.div
            animate={{
              x: [0, 200, 0],
              y: [0, -100, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            style={{ position: 'absolute', bottom: '20%', left: '30%' }}
          >
            <AcUnitIcon sx={{ fontSize: 60, color: 'rgba(176, 190, 197, 0.2)' }} />
          </motion.div>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
