import React, { useRef, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import bannerImage from "../assets/banner.png";
import translations from "../i18n";

const sections = [
  {
    key: "waterManagement",
    title: {
      en: "1) Water Management",
      hi: "१) जल प्रबंधन",
    },
    questions: [
      { key: "q1_1", label: { en: "1.1 Status of Water Policy", hi: "1.1 जल नीति की स्थिति" }, options: ["None", "In progress", "Drafted", "Drafted & communicated"] },
      { key: "q1_2", label: { en: "1.2 Status of Water Pledge", hi: "1.2 जल प्रतिज्ञा की स्थिति" }, options: ["None", "Management", "Management + Staff", "Management + Staff + Tenants"] },
      { key: "q1_3", label: { en: "1.3 Status of Water Charter", hi: "1.3 जल चार्टर की स्थिति" }, options: ["None", "Drafting", "Finalized", "Finalized & displayed"] },
      { key: "q1_4", label: { en: "1.4 Status of Water Saving Goals & Targets", hi: "1.4 जल बचत लक्ष्यों और उद्देश्यों की स्थिति" }, options: ["None", "In progress", "Set", "Set & communicated"] },
    ],
  },
  {
    key: "waterEfficiency",
    title: {
      en: "2) Water Efficiency",
      hi: "२) जल दक्षता",
    },
    questions: [
      { key: "q2_1", label: { en: "2.1 Status of Water Metering", hi: "2.1 जल मीटरिंग की स्थिति" }, options: ["Bulk meter", "Bulk + Submeter", "Bulk + Submeter + Monitoring", "Smart submeters"] },
      { key: "q2_2", label: { en: "2.2 Status of Water Fixtures Flow Rate (lpm)", hi: "2.2 जल उपकरणों की औसत प्रवाह दर (lpm)" }, options: [">15 lpm", "10-15 lpm", "5-10 lpm", "<5 lpm"] },
      { key: "q2_3", label: { en: "2.3 Status of Toilet Flushing", hi: "2.3 शौचालय फ्लशिंग की स्थिति" }, options: ["Single flush >12L", "Single flush 10-12L", "Dual flush 12/6L", "Dual flush 8/4L"] },
      { key: "q2_4", label: { en: "2.4 Status of Water Conservation Signage", hi: "2.4 जल संरक्षण साइनज की स्थिति" }, options: ["None", "Washrooms", "Washrooms + other areas", "Signage + Awareness"] },
      { key: "q2_5", label: { en: "2.5 Status of Water Use in Cooling Tower", hi: "2.5 कूलिंग टॉवर में जल उपयोग की स्थिति" }, options: ["N/A", "No submeter / Single pass", "Submeter + Recirculation <3", "Submeter + Recirculation >3"], notApplicableValue: -1 },
      { key: "q2_6", label: { en: "2.6 Status of Water Use Intensity", hi: "2.6 जल उपयोग तीव्रता की स्थिति" }, options: [">60% above benchmark", "51-60% above", "11-40% above", "Within 10% of benchmark"] },
    ],
  },
  {
    key: "groundwater",
    title: {
      en: "3) Groundwater Sustainability",
      hi: "३) भूजल स्थिरता",
    },
    questions: [
      { key: "q3_1", label: { en: "3.1 Groundwater dependency (% of total annual use)", hi: "3.1 भूजल निर्भरता (कुल वार्षिक उपयोग का %)" }, options: [">50%", "20-50%", "5-20%", "<5%"] },
      { key: "q3_2", label: { en: "3.2 Status of Groundwater Extraction", hi: "3.2 भूजल निकासी की स्थिति" }, options: ["None", "Manual monitoring", "Manual metering", "Smart metering"] },
      { key: "q3_3", label: { en: "3.3 Groundwater Recharge (% of extraction)", hi: "3.3 भूजल पुनर्भरण (निकासी का %)" }, options: ["<20%", "20-40%", "40-50%", ">50%"] },
    ],
  },
  {
    key: "circularity",
    title: {
      en: "4) Water Circularity Status",
      hi: "४) जल परिपत्रता स्थिति",
    },
    questions: [
      { key: "q4_1", label: { en: "4.1 Status of Rainwater Harvesting", hi: "4.1 वर्षा जल संचयन की स्थिति" }, options: ["None", "Roof <50%", "Roof >50%", "Roof + Non-roof"] },
      { key: "q4_2", label: { en: "4.2 Greywater / Sewage Recycling or Reuse", hi: "4.2 ग्रे वॉटर/सीवेज जल पुनर्चक्रण या पुन: उपयोग" }, options: ["None", "Space available", "Work in progress", "Operational"] },
      { key: "q4_3", label: { en: "4.3 Collective RO Treated Water", hi: "4.3 सामूहिक आरओ जल उपयोग" }, options: ["No reuse", "Feasible", "Plans in place", "Reused for non-potable use"], notApplicableValue: -1 },
    ],
  },
  {
    key: "vegetation",
    title: {
      en: "5) Green Vegetation Cover",
      hi: "५) हरित आवरण",
    },
    questions: [
      { key: "q5_1", label: { en: "5.1 Status of Green Cover Policy", hi: "5.1 हरित आवरण नीति की स्थिति" }, options: ["None", "Drafting", "Finalized", "Shared with stakeholders"] },
      { key: "q5_2", label: { en: "5.2 Status of Green Coverage Area", hi: "5.2 हरित क्षेत्र कवरेज की स्थिति" }, options: ["<10%", "10-25%", "25-50%", ">50%"] },
      { key: "q5_3", label: { en: "5.3 Status of Green Landscapes", hi: "5.3 हरित परिदृश्यों की स्थिति" }, options: ["Non-native + No smart irrigation", "Non-native + Smart irrigation", "Native + No smart irrigation", "Native + Smart irrigation"] },
      { key: "q5_4", label: { en: "5.4 Status of Green Roofs & Walls", hi: "5.4 ग्रीन रूफ और ग्रीन वॉल्स की स्थिति" }, options: ["None", "Plans in place", "Green roofs operational", "Green roofs + Green walls operational"], notApplicableValue: -1 },
    ],
  },
];

// helpers
function mapIndexToScore(index) {
  return (Number(index) + 1) * 25;
}
function getColorForScore(score) {
  if (score <= 49) return "#e74c3c";
  if (score <= 64) return "#f39c12";
  if (score <= 99) return "#27ae60";
  return "#3498db";
}
function calculateSectionScore(section, form) {
  let total = 0,
    count = 0;
  section.questions.forEach((q) => {
    const val = form[q.key];
    if (!(q.notApplicableValue && val == q.notApplicableValue)) {
      const numVal = Number(val);
      if (!isNaN(numVal) && numVal >= 0 && numVal <= 3) {
        total += mapIndexToScore(numVal);
        count++;
      }
    }
  });
  return count ? Math.round(total / count) : 0;
}
function calculateTotalScore(form) {
  let total = 0,
    count = 0;
  sections.forEach((section) => {
    section.questions.forEach((q) => {
      const val = form[q.key];
      if (!(q.notApplicableValue && val == q.notApplicableValue)) {
        const numVal = Number(val);
        if (!isNaN(numVal) && numVal >= 0 && numVal <= 3) {
          total += mapIndexToScore(numVal);
          count++;
        }
      }
    });
  });
  return count ? Math.round(total / count) : 0;
}
function getMaturityLevel(score, lang) {
  if (score < 50) return lang === "hi" ? "उदीयमान" : "Aspirant";
  if (score < 65) return lang === "hi" ? "प्रदर्शनकारी" : "Performer";
  if (score < 100) return lang === "hi" ? "अग्रणी" : "Front Runner";
  return lang === "hi" ? "सफल साधक" : "Achiever";
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

const Success = ({ form, onRestart }) => {
  const pdfRef = useRef(null);
  const hasSentRef = useRef(false);
  const [emailStatus, setEmailStatus] = useState('idle');
  const currentLang = form.language || "en";
  const totalScore = calculateTotalScore(form);
  const overallColor = getColorForScore(totalScore);
  const maturity = getMaturityLevel(totalScore, currentLang);

  const getImageBase64 = (url) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });

  const addFooter = (doc) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    const footerY = pageHeight - 40;
    const leftX = margin;
    const centerX = doc.internal.pageSize.getWidth() / 2;
    const rightX = doc.internal.pageSize.getWidth() - margin;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const leftText = "Hours\nMon-Fri / 7:00 – 18:00\nSaturday / 9:00 – 17:00";
    const centerText = "Corporate offices\nHead Office: Amravati, Maharashtra 444602\nCorporate Office: New Delhi, Delhi 110049";
    const rightText = "Contact Info\nEmail: contact@jalsmruti.org";

    const lineSpacing = 10;

    leftText.split("\n").forEach((line, i) => {
      doc.text(
        line,
        leftX,
        footerY - (leftText.split("\n").length - 1 - i) * lineSpacing
      );
    });

    centerText.split("\n").forEach((line, i) => {
      doc.text(
        line,
        centerX,
        footerY - (centerText.split("\n").length - 1 - i) * lineSpacing,
        {
          align: "center",
        }
      );
    });

    rightText.split("\n").forEach((line, i) => {
      doc.text(
        line,
        rightX,
        footerY - (rightText.split("\n").length - 1 - i) * lineSpacing,
        {
          align: "right",
        }
      );
    });
  };

  const generatePdfBlob = async () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;

    let bannerDisplayHeight = 0;

    const bannerBase64 = await getImageBase64(bannerImage);
    if (bannerBase64) {
      const originalWidth = 855;
      const originalHeight = 214;
      const aspectRatio = originalHeight / originalWidth;

      const bannerDisplayWidth = pageWidth;
      bannerDisplayHeight = pageWidth * aspectRatio;

      doc.addImage(bannerBase64, "PNG", 0, 0, bannerDisplayWidth, bannerDisplayHeight);
    }

    let startY = bannerDisplayHeight + 20;
    const slogan = "Jalsmruti is empowering communities to restore India's cherished legacy — a land that was once celebrated as 'Sujalaam Sufalaam', abundant in water and lush vegetation.";

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    const marginX = 40;
    const maxWidth = pageWidth - marginX * 2;
    const words = slogan.split(" ");
    let line = "";
    const lines = [];

    words.forEach((word) => {
      const testLine = line + word + " ";
      const testWidth = doc.getTextWidth(testLine);
      if (testWidth > maxWidth) {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = testLine;
      }
    });
    if (line) lines.push(line.trim());

    lines.forEach((lineText, i) => {
      const y = startY + i * 18;
      const wordsInLine = lineText.split(" ");

      const lineWidth = wordsInLine.reduce((sum, word) => {
        return sum + doc.getTextWidth(word + " ");
      }, 0);

      let cursorX = (pageWidth - lineWidth) / 2;

      wordsInLine.forEach((word) => {
        if (word === "Jalsmruti") {
          doc.setTextColor(0, 102, 204);
          doc.setFont(undefined, "bold");
        } else if (
          word.includes("Sujalaam") ||
          word.includes("Sufalaam") ||
          word.includes("'Sujalaam") ||
          word.includes("Sufalaam',")
        ) {
          doc.setTextColor(0, 153, 76);
          doc.setFont("helvetica", "italic");
        } else {
          doc.setTextColor(0, 0, 0);
          doc.setFont("helvetica", "normal");
        }

        const wordWidth = doc.getTextWidth(word + " ");
        doc.text(word + " ", cursorX, y);
        cursorX += wordWidth;
      });
    });

    startY += lines.length * 18 + 20;

    const overallScore = totalScore.toFixed(0);
    const maturityLevel = getMaturityLevel(totalScore, "en");
    const { r: rO, g: gO, b: bO } = hexToRgb(overallColor);

    doc.setFillColor(rO, gO, bO);
    doc.setTextColor(255, 255, 255);
    doc.rect(40, startY, pageWidth - 80, 40, "F");

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(
      `Overall Water Management Score: ${overallScore}`,
      centerX,
      startY + 18,
      { align: "center" }
    );
    doc.setFontSize(14);
    doc.setFont(undefined, "normal");
    doc.text(`Maturity Level: ${maturityLevel}`, centerX, startY + 34, {
      align: "center",
    });

    startY += 60;

    for (let i = 0; i < 3; i++) {
      const section = sections[i];
      const sectionScore = calculateSectionScore(section, form);
      const sectionColor = getColorForScore(sectionScore);
      const { r, g, b } = hexToRgb(sectionColor);

      doc.setFillColor(r, g, b);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.rect(40, startY, pageWidth - 80, 25, "F");
      doc.text(section.title.en, 50, startY + 17);
      doc.text(
        `Average Score: ${sectionScore.toFixed(0)}`,
        pageWidth - 50,
        startY + 17,
        { align: "right" }
      );
      startY += 25;

      const tableRows = section.questions.map((q) => {
        const val = form[q.key];
        const answerText =
          q.notApplicableValue && val == q.notApplicableValue
            ? "Not Applicable"
            : q.options?.[val] || val || "N/A";
        return [
          q.label.en,
          answerText,
          q.notApplicableValue && val == q.notApplicableValue
            ? "-"
            : val
        ];
      });

      autoTable(doc, {
        startY,
        head: [["Question", "Answer", "Score"]],
        body: tableRows,
        margin: { left: 40, right: 40 },
        theme: "grid",
        styles: {
          fontSize: 9,
          textColor: 0,
          cellPadding: 5,
          lineWidth: 0.1,
          lineColor: [50, 50, 50],
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          fontStyle: "bold",
        },
      });

      startY = doc.lastAutoTable.finalY + 28;
    }

    doc.addPage();
    startY = 40;

    for (let i = 3; i < 5; i++) {
      const section = sections[i];
      const sectionScore = calculateSectionScore(section, form);
      const sectionColor = getColorForScore(sectionScore);
      const { r, g, b } = hexToRgb(sectionColor);

      doc.setFillColor(r, g, b);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.rect(40, startY, pageWidth - 80, 25, "F");
      doc.text(section.title.en, 50, startY + 17);
      doc.text(
        `Average Score: ${sectionScore.toFixed(0)}`,
        pageWidth - 50,
        startY + 17,
        { align: "right" }
      );

      startY += 25;

      const tableRows = section.questions.map((q) => {
        const val = form[q.key];
        const answerText =
          q.notApplicableValue && val == q.notApplicableValue
            ? "Not Applicable"
            : q.options?.[val] || val || "N/A";
        return [
          q.label.en,
          answerText,
          q.notApplicableValue && val == q.notApplicableValue ? "-" : val
        ];
      });

      autoTable(doc, {
        startY,
        head: [["Question", "Answer", "Score"]],
        body: tableRows,
        margin: { left: 40, right: 40 },
        theme: "grid",
        styles: {
          fontSize: 9,
          textColor: 0,
          cellPadding: 5,
          lineWidth: 0.1,
          lineColor: [50, 50, 50],
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          fontStyle: "bold",
        },
      });

      startY = doc.lastAutoTable.finalY + 50;
    }

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("OUR SERVICES", 40, startY);
    startY += 25;

    doc.setFontSize(13);
    doc.setFont(undefined, "normal");
    const services = [
      "• Water Body Rejuvenation & Restoration",
      "• Capacity Building & Behaviour Change",
      "• Water Positive Program for Urban Built Forms",
    ];

    services.forEach((service) => {
      doc.text(service, 50, startY);
      startY += 25;
    });

    startY += 10;

    if (startY + 200 > pageHeight - 60) {
      doc.addPage();
      startY = 40;
    }

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 0, 0);

    doc.text("Donate", 40, startY);
    startY += 25;

    startY += 4;
    const text = "Jal Smruti Foundation is a Section 80G approved non profit entity based in India";

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    const wrappedLines = doc.splitTextToSize(text, maxWidth);

    wrappedLines.forEach((line) => {
      doc.text(line, marginX, startY);
      startY += 18;
    });

    startY += 5;

    doc.setFontSize(12);
    doc.setFont(undefined, "normal");
    doc.text(
      "Your donation to Jal Smruti Foundation is tax deductible",
      40,
      startY
    );
    startY += 30;

    doc.setFont(undefined, "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const bankHeader = "Bank Details";
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(bankHeader, 40, startY);

    const bankHeaderWidth = doc.getTextWidth(bankHeader);
    doc.line(40, startY + 2, 40 + bankHeaderWidth, startY + 2); // underline
    startY += 18;

    doc.setFont(undefined, "normal");
    const bankLines = [
      "Account Name: Jal Smruti Foundation",
      "Bank Name: State Bank of India",
      "Account Number: 40131834676",
      "Account Type: Current",
      "IFSC Code: SBIN0003866",
      "",
    ];
    bankLines.forEach((line) => {
      doc.text(line, 40, startY);
      startY += 15;
    });
    const upiLabel = "UPI:";
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(upiLabel, 40, startY);
    const upiLabelWidth = doc.getTextWidth(upiLabel);
    doc.line(40, startY + 2, 40 + upiLabelWidth, startY + 2);

    startY += 18;
    doc.setFont(undefined, "normal");
    doc.text("jalsmrutifoundation@ybl", 40, startY);
    startY += 20;

    addFooter(doc);

    return doc.output("blob");
  };

  const sendPdfToBackend = async () => {
    try {
      setEmailStatus('sending');
      const blob = await generatePdfBlob();
      const fileName = `${form.fullName || "Water_Scorecard"}_Report.pdf`;
      const formData = new FormData();
      formData.append(
        "pdf",
        new File([blob], fileName, { type: "application/pdf" })
      );
      formData.append("email", form.email);
      formData.append("cc_email", "contact@jalsmruti.org");

      const res = await fetch("http://localhost:5000/api/send-pdf-email", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("PDF emailed successfully");
        setEmailStatus('success');
      } else {
        console.error("Failed to send email");
        setEmailStatus('error');
      }
    } catch (err) {
      console.error("Error generating/sending PDF", err);
      setEmailStatus('error');
    }
  };

  const handleDownloadPdf = async () => {
    const blob = await generatePdfBlob();
    const fileName = `${
      form.fullName || "Water_Management"
    }_Assessment_Report.pdf`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!hasSentRef.current && form.email) {
      sendPdfToBackend();
      hasSentRef.current = true;
    }
  }, []);

  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          component="img"
          src={bannerImage}
          alt="Banner"
          sx={{ width: "100%", maxHeight: 150, objectFit: "contain" }}
        />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
          {currentLang === "hi"
            ? `धन्यवाद, ${form.fullName || "उपयोगकर्ता"}!`
            : `Thank you, ${form.fullName || "User"} for completing the assessment!`}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: overallColor,
          color: "white",
          textAlign: "center",
          py: 2,
          mb: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5">
          {currentLang === "hi"
            ? `कुल अंक: ${totalScore}`
            : `Overall Water Management Score: ${totalScore}`}
        </Typography>
        <Typography variant="h6">
          {currentLang === "hi" ? `परिपक्वता स्तर: ${maturity}` : `Maturity Level: ${maturity}`}
        </Typography>
      </Box>

      {emailStatus === 'sending' && (
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
          {currentLang === "hi" ? "आपकी रिपोर्ट ईमेल भेजी जा रही है..." : "Sending email with your report..."}
        </Typography>
      )}
      
      {emailStatus === 'success' && (
        <Typography variant="body2" color="success.main" sx={{ textAlign: 'center', mt: 2 }}>
          {currentLang === "hi" ? "रिपोर्ट आपके ईमेल पर सफलतापूर्वक भेज दी गई है!" : "Report sent successfully to your email!"}
        </Typography>
      )}
      
      {emailStatus === 'error' && (
        <Typography variant="body2" color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {currentLang === "hi" ? "ईमेल भेजने में विफल। कृपया रिपोर्ट मैन्युअल डाउनलोड करें।" : "Failed to send email. Please download the report manually."}
        </Typography>
      )}

      {sections.map((section, sIdx) => {
        const sectionScore = calculateSectionScore(section, form);
        const color = getColorForScore(sectionScore);

        return (
          <Box
            key={`section-${sIdx}`}
            sx={{
              mb: 4,
              border: `2px solid ${color}`,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ backgroundColor: color, color: "white", p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {section.title[currentLang]}{" "}
                ({currentLang === "hi" ? "औसत अंक" : "Average Score"}: {sectionScore})
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{currentLang === "hi" ? "प्रश्न" : "Question"}</TableCell>
                    <TableCell>{currentLang === "hi" ? "उत्तर" : "Answer"}</TableCell>
                    <TableCell>{currentLang === "hi" ? "अंक" : "Score"}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.questions.map((q, qIdx) => {
                    const rawVal = form[q.key];
                    let answerText = "N/A";

                    if (rawVal !== undefined && rawVal !== "") {
                      if (q.notApplicableValue && rawVal == q.notApplicableValue) {
                        answerText = currentLang === "hi" ? "लागू नहीं" : "Not Applicable";
                      } else {
                        const numVal = Number(rawVal);
                        if (q.options && !isNaN(numVal)) {
                          answerText = q.options[numVal] || "N/A";
                        } else {
                          answerText = rawVal;
                        }
                      }
                    }

                    return (
                      <TableRow key={`row-${sIdx}-${q.key || q.label.en}-${qIdx}`}>
                        <TableCell>{q.label[currentLang]}</TableCell>
                        <TableCell>{answerText}</TableCell>
                        <TableCell>
                          {q.notApplicableValue && rawVal == q.notApplicableValue
                            ? "-"
                            : rawVal !== "" ? rawVal : "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}

      <Box
        sx={{
          textAlign: "center",
          marginTop: 4,
          padding: 2,
          borderTop: "2px solid #154360",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={handleDownloadPdf}
        >
          {currentLang === "hi" ? "PDF रिपोर्ट डाउनलोड करें" : "Download PDF Report"}
        </Button>

        <Button variant="outlined" color="secondary" onClick={onRestart}>
          {currentLang === "hi" ? "एक और फॉर्म जमा करें" : "Submit Another Form"}
        </Button>
      </Box>
    </Box>
  );
};

export default Success;