const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    console.log('Logout: Token y role eliminados'); 
    setUserRole(null);
    window.location.href = '/login';
};

useEffect(() => {
    const role = localStorage.getItem('role');
    console.log('User Role en Navbar:', role); 
    setUserRole(role);
}, []);
