import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SecurityIcon from '@mui/icons-material/Security';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <SpeedIcon className="text-4xl text-indigo-500" />,
      title: 'Instant Analysis',
      description: 'Get your resume analyzed by AI in seconds, not hours.'
    },
    {
      icon: <PsychologyIcon className="text-4xl text-indigo-500" />,
      title: 'AI-Powered Insights',
      description: 'Google Gemini AI provides professional-grade feedback.'
    },
    {
      icon: <SecurityIcon className="text-4xl text-indigo-500" />,
      title: '100% Free & Secure',
      description: 'No credit card required. Your data is never shared.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Box className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <Container maxWidth="md" className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Optimize Your Resume with AI
          </Typography>
          <Typography variant="h5" className="mb-8 opacity-90">
            Get instant ATS scores and actionable feedback to land your dream job
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" className="py-16">
        <Typography variant="h4" className="text-center mb-12 font-bold">
          Why Choose Our Resume Analyzer?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper className="p-6 text-center h-full hover:shadow-xl transition-shadow">
                <Box className="mb-4">{feature.icon}</Box>
                <Typography variant="h6" className="font-bold mb-2">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;