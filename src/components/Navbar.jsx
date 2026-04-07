import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar className="flex justify-between">
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          className="font-bold no-underline text-white"
        >
          AI Resume Analyzer
        </Typography>

        <Box className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Typography variant="body2" className="text-white">
                {user?.email}
              </Typography>
              <Button 
                color="inherit" 
                component={Link} 
                to="/dashboard"
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                variant="outlined"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
                variant="outlined"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;