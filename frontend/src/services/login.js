import axios from 'axios';

export const login = async (username, password, setError) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username,
      password,
    });

    const { token, role } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role); 
    setError(''); 

    // Redirecciona al dashboard
    window.location.href = '/';
  } catch (error) {
    setError('Error al iniciar sesión. Verifica tus credenciales e intenta nuevamente.');
    console.error('Error de inicio de sesión:', error);
  }
};
