import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
        >
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': { background: 'rgba(144, 202, 249, 0.1)' }
            }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <WbSunnyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            </motion.div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: theme.palette.primary.main }}>
              Weather Wonder
            </Typography>
          </Button>
        </motion.div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
       
        </Box>
      </Toolbar>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          animate={{
            x: [0, window.innerWidth],
            transition: { repeat: Infinity, duration: 20, ease: "linear" }
          }}
        >
          <CloudIcon sx={{ fontSize: 40, color: 'rgba(144, 202, 249, 0.2)', mr: 2 }} />
        </motion.div>
      </Box>
    </AppBar>
  );
};

export default Navbar;
