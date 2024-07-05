import React from 'react';
import { Box, Typography, Link, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import WavesIcon from '@mui/icons-material/Waves';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(30, 58, 95, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="body1" align="center" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            Weather Wonder
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ color: theme.palette.primary.light, mt: 1 }}
          >
            Providing accurate weather forecasts since 2024
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography variant="body2" align="center" sx={{ color: theme.palette.primary.light, mt: 2 }}>
            {'Copyright © '}
            <Link color="inherit" href="#" sx={{ '&:hover': { color: theme.palette.primary.main } }}>
              Weather Wonder
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </motion.div>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          bottom: -10,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
          opacity: 0.2,
        }}
      >
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -10, 0],
              transition: {
                repeat: Infinity,
                duration: 2 + index,
                ease: "easeInOut",
              },
            }}
          >
            <WavesIcon sx={{ fontSize: 40 + index * 10, color: theme.palette.primary.main }} />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
