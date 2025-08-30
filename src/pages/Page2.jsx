import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import translations from "../i18n";

function Page2({ onNext, onBack, form }) {
  const [data, setData] = useState({
    fullName: form.fullName || "",
    email: form.email || "",
    whatsapp: form.whatsapp || "",
    date: form.date || "",
  });
  const [error, setError] = useState({});

  // ✅ Pick current language from form
  const currentLang = form.language || "en";
  const t = translations[currentLang];

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!/^[A-Za-z\s]*$/.test(value)) {
          return t.messages.required;
        }
        return "";
      case "email":
        if (value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value)) {
          return t.messages.invalidEmail;
        }
        return "";
      case "whatsapp":
        if (value && !/^\d{0,10}$/.test(value)) {
          return t.messages.invalidPhone;
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "whatsapp") {
      const digitsOnly = value.replace(/\D/g, "");
      setData((prev) => ({ ...prev, [name]: digitsOnly }));
      setError((prev) => ({
        ...prev,
        [name]: validateField(name, digitsOnly),
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
      setError((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};

    if (!data.fullName) {
      err.fullName = t.messages.required;
    }
    if (!data.email) {
      err.email = t.messages.invalidEmail;
    }
    if (!/^\d{10}$/.test(data.whatsapp)) {
      err.whatsapp = t.messages.invalidPhone;
    }
    if (!data.date) {
      err.date = t.messages.required;
    }

    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <div>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          {t.contact.title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label={t.contact.fullName}
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            error={!!error.fullName}
            helperText={error.fullName}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t.contact.email}
            name="email"
            value={data.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t.contact.whatsapp}
            name="whatsapp"
            type="tel"
            value={data.whatsapp}
            onChange={handleChange}
            error={!!error.whatsapp}
            helperText={error.whatsapp}
            fullWidth
            margin="normal"
            inputProps={{
              maxLength: 10,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            required
          />
          <TextField
            label={t.contact.date}
            name="date"
            type="date"
            value={data.date}
            onChange={handleChange}
            error={!!error.date}
            helperText={error.date}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
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

export default Page2;
