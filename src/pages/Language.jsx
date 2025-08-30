import React from "react";
import { Button, Box, Typography } from "@mui/material";

export default function Language({ onNext, onBack, form, setForm }) {
  const handleSelect = (lang) => {
    setForm((prev) => ({ ...prev, language: lang }));
    onNext();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Select Language
      </Typography>
      <Button variant="contained" onClick={() => handleSelect("en")} sx={{ m: 1 }}>
        English
      </Button>
      <Button variant="contained" onClick={() => handleSelect("hi")} sx={{ m: 1 }}>
        हिंदी
      </Button>
    </Box>
  );
}
