import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import translations from "../i18n";

function Page3({ onNext, onBack, form }) {
  const [data, setData] = useState({
    buildingName: form.buildingName || "",
    mapLink: form.mapLink || "",
    unitsCount: form.unitsCount || "",
  });
  const [error, setError] = useState({});

  // ✅ Language handler
  const currentLang = form.language || "en";
  const t = translations[currentLang];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "unitsCount") {
      const digitsOnly = value.replace(/\D/g, "");
      setData((prev) => ({ ...prev, [name]: digitsOnly }));
      setError((prev) => ({
        ...prev,
        [name]: digitsOnly ? "" : t.messages.required,
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
      setError((prev) => ({
        ...prev,
        [name]: value ? "" : t.messages.required,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};

    if (!data.buildingName) {
      err.buildingName = t.messages.required;
    }
    if (!data.mapLink) {
      err.mapLink = t.messages.required;
    }
    if (!data.unitsCount) {
      err.unitsCount = t.messages.required;
    }

    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <div>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          {t.apartment.title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label={t.apartment.name}
            name="buildingName"
            value={data.buildingName}
            onChange={handleChange}
            error={!!error.buildingName}
            helperText={error.buildingName}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t.apartment.map}
            name="mapLink"
            value={data.mapLink}
            onChange={handleChange}
            error={!!error.mapLink}
            helperText={error.mapLink}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t.apartment.units}
            name="unitsCount"
            type="number"
            value={data.unitsCount}
            onChange={handleChange}
            error={!!error.unitsCount}
            helperText={error.unitsCount}
            fullWidth
            margin="normal"
            required
          />
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
          >
            <Button variant="outlined" onClick={onBack}>
              {t.buttons.back}
            </Button>
            <Button variant="contained" type="submit">
              {t.buttons.next}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default Page3;
