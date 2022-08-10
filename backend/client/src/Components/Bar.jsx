import { Box } from '@mui/material';
import React from 'react'

const Bar = ({props}) => {
  return (
    <Box
      maxWidth="lg"
      sx={{
        bgcolor: "#6177D4",
        color: "white",
        p: 1,
        fontWeight: "bold",
        borderRadius: "4px",
        my: 3,
        pl: 2,
        width: "80%",
      }}
    >
      {props}
    </Box>
  );
}

export default Bar