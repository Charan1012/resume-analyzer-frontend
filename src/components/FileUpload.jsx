import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Button, Box, Typography, Paper, Select, MenuItem, 
  FormControl, InputLabel, CircularProgress, Alert 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { resumeAPI } from '../services/api';

const FileUpload = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('Software Engineer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError('File must be PDF or DOCX and less than 5MB');
      return;
    }
    
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024
  });

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobRole', jobRole);

      const { data } = await resumeAPI.analyze(formData);
      onAnalysisComplete(data.analysis);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} className="p-8 max-w-2xl mx-auto">
      <Typography variant="h5" className="mb-6 font-bold text-center">
        Upload Your Resume
      </Typography>

      {/* Job Role Selector */}
      <FormControl fullWidth className="mb-6">
        <InputLabel>Target Job Role</InputLabel>
        <Select
          value={jobRole}
          label="Target Job Role"
          onChange={(e) => setJobRole(e.target.value)}
          disabled={loading}
        >
          <MenuItem value="Software Engineer">Software Engineer</MenuItem>
          <MenuItem value="Frontend Developer">Frontend Developer</MenuItem>
          <MenuItem value="Backend Developer">Backend Developer</MenuItem>
          <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
          <MenuItem value="Data Scientist">Data Scientist</MenuItem>
          <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
          <MenuItem value="Machine Learning Engineer">Machine Learning Engineer</MenuItem>
          <MenuItem value="Product Manager">Product Manager</MenuItem>
        </Select>
      </FormControl>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Dropzone */}
      <Box
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
          ${file ? 'bg-green-50 border-green-500' : 'bg-white'}
        `}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="text-6xl text-gray-400 mb-4" />
        
        {file ? (
          <div>
            <Typography className="text-green-600 font-medium">
              ✅ {file.name}
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              ({(file.size / 1024).toFixed(1)} KB)
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className="mb-2 font-medium">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              or click to select (PDF, DOCX, or DOC)
            </Typography>
            <Typography variant="caption" className="text-gray-400 block mt-2">
              Maximum file size: 5MB
            </Typography>
          </div>
        )}
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="mt-6"
        startIcon={loading && <CircularProgress size={20} color="inherit" />}
      >
        {loading ? 'Analyzing with AI...' : 'Analyze Resume'}
      </Button>

      <Typography variant="caption" className="text-center block mt-4 text-gray-500">
        Powered by Google Gemini AI • Free & Secure
      </Typography>
    </Paper>
  );
};

export default FileUpload;