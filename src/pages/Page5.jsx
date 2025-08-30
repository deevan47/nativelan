import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import translations from "../i18n";

function Page5({ onNext, onBack, form }) {
  const currentLang = form.language || "en";
  const t = translations[currentLang];
  const section = t.sections[1]; // Page5 = Water Efficiency (index 1)

  const [data, setData] = useState({
    q2_1: form.q2_1 ?? "",
    q2_2: form.q2_2 ?? "",
    q2_3: form.q2_3 ?? "",
    q2_4: form.q2_4 ?? "",
    q2_5: form.q2_5 ?? "",
    q2_6: form.q2_6 ?? "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    section.questions.forEach((q, i) => {
      const key = `q2_${i + 1}`;
      if (data[key] === "") err[key] = t.messages.required;
    });
    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "left" }}>
      <Typography variant="h5" gutterBottom color="primary">
        {section.title}
      </Typography>
      <form onSubmit={handleSubmit}>
        {section.questions.map((q, i) => {
          const key = `q2_${i + 1}`;
          return (
            <FormControl
              key={key}
              component="fieldset"
              sx={{ mt: 3, mb: 2, width: "100%", textAlign: "left" }}
              error={!!error[key]}
            >
              <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
                {q.label}
              </FormLabel>
              <RadioGroup name={key} value={data[key]} onChange={handleChange}>
                {q.options.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={String(opt.value)}
                    control={<Radio />}
                    label={`${opt.value} - ${opt.label}`}
                    sx={{ display: "block", ml: 0, my: 0.5 }}
                  />
                ))}
              </RadioGroup>
              {error[key] && (
                <Typography color="error" variant="caption">
                  {error[key]}
                </Typography>
              )}
            </FormControl>
          );
        })}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={onBack}>
            {t.buttons.back}
          </Button>
          <Button variant="contained" type="submit">
            {t.buttons.next}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Page5;
