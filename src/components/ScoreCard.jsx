import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

const ScoreCard = ({ title, score, color = 'primary', size = 120 }) => {
  const getColor = (score) => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const scoreColor = getColor(score);

  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <Typography variant="h6" className="mb-4 font-semibold text-gray-700">
          {title}
        </Typography>
        
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={score}
            size={size}
            thickness={5}
            sx={{ color: scoreColor }}
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
            <Typography variant="h4" component="div" className="font-bold" style={{ color: scoreColor }}>
              {score}
            </Typography>
            <Typography variant="caption" className="text-gray-500">/100</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;