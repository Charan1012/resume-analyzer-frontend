import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import FileUpload from '../components/FileUpload';
import AnalysisResult from '../components/AnalysisResult';

const Dashboard = () => {
  const [analysis, setAnalysis] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysis(data);
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="mb-12">
        <Typography variant="h3" className="text-center mb-6 font-bold text-gray-800">
          AI Resume Analyzer
        </Typography>
        <Box className="flex justify-center">
          <Typography 
            variant="subtitle1" 
            className="text-center text-gray-600 leading-relaxed"
            sx={{ maxWidth: '600px' }}
          >
            Upload your resume and get instant AI-powered feedback. Our system analyzes ATS compatibility, keywords, formatting, and more.
          </Typography>
        </Box>
      </Box>

      <FileUpload onAnalysisComplete={handleAnalysisComplete} />
      
      {analysis && <AnalysisResult analysis={analysis} />}
    </Container>
  );
};

export default Dashboard;