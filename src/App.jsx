import React, { useRef, useState } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import translations from "./i18n";
import Start from "./pages/Start";
import Language from "./pages/Language";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";
import Page8 from "./pages/Page8";
import Preview from "./pages/Preview";
import Banner from "./components/Banner";
import Success from "./pages/Success";

function getDefaultForm() {
  return {
    language: "en",
    fullName: "",
    email: "",
    whatsapp: "",
    date: "",
    buildingName: "",
    mapLink: "",
    unitsCount: null,
    q1_1: null,
    q1_2: null,
    q1_3: null,
    q1_4: null,
    q2_1: null,
    q2_2: null,
    q2_3: null,
    q2_4: null,
    q2_5: null,
    q2_6: null,
    q3_1: null,
    q3_2: null,
    q3_3: null,
    q4_1: null,
    q4_2: null,
    q4_3: null,
    q5_1: null,
    q5_2: null,
    q5_3: null,
    q5_4: null,
    score_water_management: null,
    score_water_efficiency: null,
    score_groundwater: null,
    score_circularity: null,
    score_green_cover: null,
  };
}

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(getDefaultForm());
  const [clearDialog, setClearDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);

  const currentLang = form.language || "en";
  const t = translations[currentLang];

  const handleNext = (data = {}) => {
    setForm((prev) => ({ ...prev, ...data }));
    setActiveStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClear = () => setClearDialog(true);

  const confirmClear = () => {
    setForm(getDefaultForm());
    setActiveStep(0);
    setClearDialog(false);
    setIsEditing(false);
  };

  const cancelClear = () => setClearDialog(false);

  const handleRestart = () => {
    setForm(getDefaultForm());
    setActiveStep(0);
    setIsEditing(false);
  };

  const handleSubmitDetailedForm = async () => {
    console.log("Form submitted", form);
    setActiveStep(t.steps.length - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStepContent = (step) => {
    const pageProps = {
      onNext: handleNext,
      onBack: handleBack,
      form,
      setForm,
      sections: t.sections,
    };

    switch (step) {
      case 0:
        return <Start onNext={handleNext} />;
      case 1:
        return (
          <Language
            onNext={handleNext}
            onBack={handleBack}
            form={form}
            setForm={setForm}
          />
        );
      case 2:
        return <Page2 {...pageProps} />;
      case 3:
        return <Page3 {...pageProps} />;
      case 4:
        return <Page4 {...pageProps} />;
      case 5:
        return <Page5 {...pageProps} />;
      case 6:
        return <Page6 {...pageProps} />;
      case 7:
        return <Page7 {...pageProps} />;
      case 8:
        return <Page8 {...pageProps} />;
      case 9:
        return (
          <Preview
            form={form}
            onEdit={() => {
              setActiveStep(1);
              setIsEditing(true);
            }}
            onSubmit={handleSubmitDetailedForm}
            sections={t.sections}
          />
        );
      case 10:
        return (
          <Success
            form={form}
            onRestart={handleRestart}
            sections={t.sections}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {activeStep !== 0 && activeStep !== t.steps.length - 1 && <Banner />}

      {activeStep !== t.steps.length - 1 && (
        <Stepper activeStep={activeStep} alternativeLabel>
          {t.steps.map((label, index) => {
            const isClickable =
              isEditing && index !== 0 && index !== t.steps.length - 1;
            return (
              <Step key={label}>
                <StepLabel
                  {...(isClickable
                    ? {
                        onClick: () => setActiveStep(index),
                        style: { cursor: "pointer" },
                      }
                    : {})}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}

      <Box sx={{ mt: 4 }} ref={formRef}>
        {getStepContent(activeStep)}
      </Box>

      {activeStep > 0 && activeStep < t.steps.length - 1 && activeStep !== 1 && (
        <Box
          sx={{
            mt: 2,
            mb: 7,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button color="error" variant="outlined" onClick={handleClear}>
            {t.buttons.clear}
          </Button>
        </Box>
      )}

      <Dialog open={clearDialog} onClose={cancelClear}>
        <DialogTitle>{t.buttons.clear}</DialogTitle>
        <DialogContent>{t.messages.confirmClear}</DialogContent>
        <DialogActions>
          <Button onClick={cancelClear}>{t.buttons.cancel}</Button>
          <Button color="error" onClick={confirmClear}>
            {t.buttons.clear}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
