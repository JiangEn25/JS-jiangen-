// YearSelection.tsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const YearSelection = () => {
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (year) {
      navigate(`/rain/${year}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="year"
        label="Select Year"
        name="year"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        View Rainfall Data
      </Button>
    </Box>
  );
};

export default YearSelection;