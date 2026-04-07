import { Paper, Typography, Box, Chip, LinearProgress, Grid, Card, CardContent, Divider, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

const ScoreCard = ({ title, score, color }) => (
  <Card className="text-center">
    <CardContent>
      <Typography variant="h6" className="mb-2">{title}</Typography>
      <Box position="relative" display="inline-flex" className="mb-2">
        <CircularProgress
          variant="determinate"
          value={score}
          size={80}
          thickness={4}
          sx={{ color: color }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" component="div" className="font-bold">
            {score}%
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AnalysisResult = ({ analysis }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Paper elevation={3} className="p-8 mt-8 mx-auto max-w-6xl">
      <Typography variant="h4" className="mb-8 text-center font-bold">
        📊 AI Resume Analysis
      </Typography>

      {/* Overall Score */}
      <Box className="mb-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <Typography variant="h6" className="mb-4 text-gray-700">ATS Compatibility Score</Typography>
        <Box className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={analysis.atsScore}
              size={120}
              thickness={5}
              sx={{ color: getScoreColor(analysis.atsScore) === 'success' ? '#22c55e' : getScoreColor(analysis.atsScore) === 'warning' ? '#f59e0b' : '#ef4444' }}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              right={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Typography variant="h4" component="div" className="font-bold">
                {analysis.atsScore}
              </Typography>
              <Typography variant="caption" className="text-gray-500">/100</Typography>
            </Box>
          </Box>
          <Box className="flex-1 text-left">
            <Typography variant="body1" className="text-gray-700 mb-2">
              Your resume is{' '}
              <span className="font-bold">
                {analysis.atsScore >= 80 ? 'excellent' : analysis.atsScore >= 60 ? 'good' : 'needs improvement'}
              </span>
              {' '}for ATS compatibility.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Strengths */}
        <Grid item xs={12} md={6}>
          <Card className="h-full border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <CardContent>
              <Box className="flex items-center gap-2 mb-4">
                <CheckCircleIcon className="text-green-500 text-2xl" />
                <Typography variant="h6" className="font-bold">Strengths</Typography>
              </Box>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1 font-bold">✓</span>
                    <Typography variant="body2" className="text-gray-700">{strength}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Improvements */}
        <Grid item xs={12} md={6}>
          <Card className="h-full border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
            <CardContent>
              <Box className="flex items-center gap-2 mb-4">
                <WarningIcon className="text-orange-500 text-2xl" />
                <Typography variant="h6" className="font-bold">Areas to Improve</Typography>
              </Box>
              <ul className="space-y-2">
                {analysis.improvements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1 font-bold">⚠</span>
                    <Typography variant="body2" className="text-gray-700">{item}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Missing Keywords */}
        <Grid item xs={12} md={6}>
          <Card className="h-full border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <CardContent>
              <Box className="flex items-center gap-2 mb-4">
                <LightbulbIcon className="text-blue-500 text-2xl" />
                <Typography variant="h6" className="font-bold">Missing Keywords</Typography>
              </Box>
              <Box className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((keyword, idx) => (
                  <Chip
                    key={idx}
                    label={keyword}
                    color="primary"
                    variant="outlined"
                    size="small"
                    className="hover:bg-blue-50"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Formatting Tips */}
        <Grid item xs={12} md={6}>
          <Card className="h-full border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <CardContent>
              <Box className="flex items-center gap-2 mb-4">
                <FormatColorTextIcon className="text-purple-500 text-2xl" />
                <Typography variant="h6" className="font-bold">Formatting Tips</Typography>
              </Box>
              <ul className="space-y-2">
                {analysis.formattingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1 font-bold">💡</span>
                    <Typography variant="body2" className="text-gray-700">{tip}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider className="my-6" />

      {/* Overall Feedback */}
      <Box className="bg-gray-50 p-6 rounded-lg">
        <Typography variant="h6" className="mb-2 font-bold">Overall Feedback</Typography>
        <Typography variant="body1" className="text-gray-700 leading-relaxed">
          {analysis.overallFeedback}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AnalysisResult;