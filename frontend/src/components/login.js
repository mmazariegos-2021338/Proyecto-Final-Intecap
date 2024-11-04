import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, Grid } from '@mui/material';
import { styled } from '@mui/system';

const LoginContainer = styled(Paper)({
  padding: '2rem',
  width: '75%', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0px 4px 12px rgba(0, 255, 0, 0.5)',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  color: '#00FF00',
});

const BackgroundWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQ4fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=2000")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const ImageContainer = styled(Box)({
  backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
});

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard-clientes');
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales e intenta nuevamente.');
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <BackgroundWrapper>
      <Grid container>
        <Grid item xs={12} md={6}>
          <ImageContainer />
        </Grid>

        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
          <LoginContainer elevation={3}>
            <Typography variant="h5" component="h2" gutterBottom style={{ color: '#00FF00', fontWeight: 'bold' }}>
              LOGIN
            </Typography>
            {error && <Alert severity="error" style={{ marginBottom: '1rem', color: '#ff4d4d' }}>{error}</Alert>}
            <TextField
              label="Usuario"
              variant="filled"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#222', color: '#00FF00' },
              }}
              InputLabelProps={{ style: { color: '#00FF00' } }}
              sx={{ width: '75%' }} 
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#222', color: '#00FF00' },
              }}
              InputLabelProps={{ style: { color: '#00FF00' } }}
              sx={{ width: '75%' }} 
            />
            <Button
              variant="contained"
              onClick={handleLogin}
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem',
                backgroundColor: '#00FF00',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '1rem',
                width: '75%'
              }}
            >
              Iniciar Sesión
            </Button>
          </LoginContainer>
        </Grid>
      </Grid>
    </BackgroundWrapper>
  );
}

export default Login;
