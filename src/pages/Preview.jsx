import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import translations from "../i18n";
import sections from "./sections";

function Preview({ form, onEdit, onSubmit }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const currentLang = form.language || "en";
  const t = translations[currentLang];

  const getAnswerLabel = (q, value) => {
    if (q.notApplicableValue !== undefined && value === q.notApplicableValue) {
      return t.messages.notApplicable;
    }
    if (!isNaN(value) && value >= 0 && value <= 3) {
  const opt = q.options?.[value];
  if (typeof opt === "string") {
    return `${value} - ${opt}`;
  } else if (typeof opt === "object" && opt !== null) {
    return `${value} - ${opt.label}`;
  }
}

    return "-";
  };

  const userDetails = [
    { label: t.contact.fullName, value: form.fullName },
    { label: t.contact.email, value: form.email },
    { label: t.contact.whatsapp, value: form.whatsapp },
    { label: t.contact.date, value: form.date },
    { label: t.apartment.name, value: form.buildingName },
    { label: t.apartment.map, value: form.mapLink },
    { label: t.apartment.units, value: form.unitsCount },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 6 }}>
      <Paper
        elevation={3}
        sx={{ p: 5, width: "100%", maxWidth: "1200px", borderRadius: 3 }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t.messages.previewTitle}
        </Typography>

        {/* User Details Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            {t.contact.title} & {t.apartment.title}
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableBody>
                {userDetails.map((item) => (
                  <TableRow key={item.label}>
                    <TableCell sx={{ fontWeight: 600, width: "30%" }}>
                      {item.label}
                    </TableCell>
                    <TableCell>
                      {item.value !== undefined && item.value !== null
                        ? item.value
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Sections & Answers */}
        {t.sections.map((section, sIdx) => (
          <Box key={section.title} sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              sx={{ color: "#1976d2", mb: 2, fontWeight: 500 }}
            >
              {section.title}
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {t.buttons.question || "Question"}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {t.buttons.selectedAnswer || "Selected Answer"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.questions.map((q, qIdx) => {
                    const key = `q${sIdx + 1}_${qIdx + 1}`;
                    return (
                      <TableRow key={q.key || key}>
                        <TableCell>{q.label}</TableCell>
                        <TableCell>
                          {getAnswerLabel(q, Number(form[q.key || key]))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}

        {/* Buttons */}
        <Box sx={{ mt: 10, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="primary" onClick={onEdit}>
            {t.buttons.edit}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setConfirmOpen(true)}
          >
            {t.buttons.submit}
          </Button>
        </Box>

        {/* Confirm Submission Dialog */}
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>{t.buttons.confirm || "Confirm Submission"}</DialogTitle>
          <DialogContent sx={{ mt: 1, mb: 1 }}>
            {t.messages.confirmSubmit}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>
              {t.buttons.cancel}
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                setConfirmOpen(false);
                onSubmit();
              }}
            >
              {t.buttons.confirm}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}

export default Preview;
