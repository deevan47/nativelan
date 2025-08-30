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



function Page4({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q1_1: form.q1_1 ?? "",
    q1_2: form.q1_2 ?? "",
    q1_3: form.q1_3 ?? "",
    q1_4: form.q1_4 ?? "",
  });
  const [error, setError] = useState({});

  const currentLang = form.language || "en";
  const t = translations[currentLang];

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    t.sections[0].questions.forEach((q, i) => {
      const key = `q1_${i + 1}`;
      if (data[key] === "") err[key] = t.messages.required;
    });
    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "left" }}>
      <Typography variant="h5" gutterBottom color="primary">
        {t.sections[0].title}
      </Typography>

      <form onSubmit={handleSubmit}>
        {t.sections[0].questions.map((q, i) => {
          const key = `q1_${i + 1}`;
          return (
            <FormControl
              key={key}
              component="fieldset"
              sx={{ mt: 3, mb: 2, width: "100%", textAlign: "left" }}
              error={!!error[key]}
            >
              <FormLabel
                component="legend"
                sx={{ fontWeight: 600, mb: 1, textAlign: "left" }}
              >
                {q.label}
              </FormLabel>
              <RadioGroup
                name={key}
                value={data[key]}
                onChange={handleChange}
                sx={{ textAlign: "left" }}
              >
                {q.options?.map((opt, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={String(opt.value)}
                    control={<Radio />}
                    label={`${opt.value} - ${opt.label}`}
                    sx={{
                      display: "block",
                      ml: 0,
                      my: 0.5,
                      textAlign: "left",
                    }}
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

export default Page4;
