const translations = {
  en: {
    steps: [
      "Start",
      "Language",
      "Contact Details",
      "Apartment Details",
      "Water Management",
      "Water Efficiency",
      "Groundwater Sustainability",
      "Water Circularity",
      "Green Vegetation",
      "Preview",
      "Success",
    ],
    start: {
      title: "Jal Smruti Apartment Building Water Scorecard Assessment Input Form",
      button: "Start Assessment",
    },
    language: {
      title: "Select Your Language",
      english: "English",
      hindi: "Hindi",
      next: "Next",
    },
    contact: {
      title: "Contact Person Details",
      fullName: "Full Name of Contact Person",
      email: "Email Address of Contact Person",
      whatsapp: "Whatsapp Number of Contact Person",
      date: "Date of Assessment",
    },
    apartment: {
      title: "About the Apartment Building being Assessed",
      name: "Name and Full Address of the Apartment Building",
      map: "Google map location link of the Apartment Building being assessed",
      units: "How many Units/Flats in the Apartment Building *",
    },
    buttons: {
      next: "Next",
      back: "Back",
      finish: "Finish",
      submit: "Submit",
      edit: "Edit your response",
      cancel: "Cancel",
      confirm: "Yes, Submit",
      restart: "Submit Another Form",
      pdf: "Download PDF Report",
      clear: "Clear Form",
    },
    messages: {
      required: "Required",
      invalidEmail: "Invalid email address",
      invalidPhone: "Phone must be exactly 10 digits",
      notApplicable: "Not Applicable",
      previewTitle: "Preview Your Submission",
      confirmSubmit: "Are you sure you want to submit and view your results?",
      thankYou: "Thank you, {name} for completing the assessment!",
    },
    sections: [
      {
        title: "1) Water Management",
        questions: [
          {
            label: "1.1 Status of Water Policy",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Water policy making in progress" },
              { value: 2, label: "Water Policy drafted" },
              { value: 3, label: "Water Policy drafted & communicated to staff & tenants" },
            ],
          },
          {
            label: "1.2 Status of Water Pledge",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Management have taken a water pledge" },
              { value: 2, label: "Management + Facility Staff have taken a water pledge" },
              { value: 3, label: "Management + Facility Staff + Tenants have taken a water pledge" },
            ],
          },
          {
            label: "1.3 Status of Water Charter",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Water Charter drafting in progress" },
              { value: 2, label: "Water Charter finalized" },
              { value: 3, label: "Water Charter finalized and displayed in public" },
            ],
          },
          {
            label: "1.4 Status of Water Saving Goals & Targets",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Work in progress" },
              { value: 2, label: "Water saving goals & targets have been set" },
              { value: 3, label: "Water saving goals & targets communicated to staff & tenants" },
            ],
          },
        ],
      },
      {
        title: "2) Water Efficiency",
        questions: [
          {
            label: "2.1 Status of Water Metering",
            options: [
              { value: 0, label: "Bulk water meter" },
              { value: 1, label: "Bulk meter + submeter" },
              { value: 2, label: "Bulk meter + submeter + monthly/weekly monitoring" },
              { value: 3, label: "Smart water sub meters" },
            ],
          },
          {
            label: "2.2 Status of Water Fixtures (Average Flow Rate in lpm)",
            options: [
              { value: 0, label: ">15 lpm" },
              { value: 1, label: "10–15 lpm" },
              { value: 2, label: "5–10 lpm" },
              { value: 3, label: "<5 lpm" },
            ],
          },
          {
            label: "2.3 Status of Toilet Flushing",
            options: [
              { value: 0, label: "Single flush (>12 litres)" },
              { value: 1, label: "Single flush (10–12 litres)" },
              { value: 2, label: "Dual flush (12/6 litres)" },
              { value: 3, label: "Dual flush (8/4 litres)" },
            ],
          },
          {
            label: "2.4 Status of Water Conservation Signage & Communication",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Signage in washrooms" },
              { value: 2, label: "Signage in washrooms and other areas" },
              { value: 3, label: "Signage + monthly staff & tenant awareness sessions" },
            ],
          },
          {
            label: "2.5 Status of Water Use in Cooling Tower",
            options: [
              { value: -1, label: "Not Applicable" },
              { value: 0, label: "No submeter / single pass use" },
              { value: 1, label: "Submeter + single pass use" },
              { value: 2, label: "Submeter + recirculation factor <3" },
              { value: 3, label: "Submeter + recirculation factor >3" },
            ],
          },
          {
            label: "2.6 Status of Water Use Intensity",
            options: [
              { value: 0, label: ">60% more than best practice benchmark" },
              { value: 1, label: "51–60% more than best practice benchmark" },
              { value: 2, label: "11–40% more than best practice benchmark" },
              { value: 3, label: "Within 10% of best practice benchmark" },
            ],
          },
        ],
      },
      {
        title: "3) Groundwater Sustainability",
        questions: [
          {
            label: "3.1 Groundwater dependency (% of total annual water)",
            options: [
              { value: 0, label: ">50%" },
              { value: 1, label: "20–50%" },
              { value: 2, label: "5–20%" },
              { value: 3, label: "<5%" },
            ],
          },
          {
            label: "3.2 Status of Groundwater Extraction",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Manual monitoring of pumped hours" },
              { value: 2, label: "Manual metering" },
              { value: 3, label: "Smart metering" },
            ],
          },
          {
            label: "3.3 Groundwater Recharge (% of extraction)",
            options: [
              { value: 0, label: "<20%" },
              { value: 1, label: "20–40%" },
              { value: 2, label: "40–50%" },
              { value: 3, label: ">50%" },
            ],
          },
        ],
      },
      {
        title: "4) Water Circularity",
        questions: [
          {
            label: "4.1 Status of Rainwater Harvesting",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Roofwater harvesting from <50% roof" },
              { value: 2, label: "Roofwater harvesting from >50% roof" },
              { value: 3, label: "Roofwater + non-roof water harvesting" },
            ],
          },
          {
            label: "4.2 Greywater/Sewage Recycling or Reuse",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Footprint area available for siting facility" },
              { value: 2, label: "Work in progress (designed, pending construction)" },
              { value: 3, label: "Recycling is operational" },
            ],
          },
          {
            label: "4.3 Collective RO Treated Water",
            options: [
              { value: 0, label: "No reuse – reject water discharged" },
              { value: 1, label: "Feasible for non-potable reuse" },
              { value: 2, label: "Plans in place for execution" },
              { value: 3, label: "Reject water reused for non-potable use" },
            ],
          },
        ],
      },
      {
        title: "5) Green Vegetation Cover",
        questions: [
          {
            label: "5.1 Green Cover Policy",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Drafting in progress" },
              { value: 2, label: "Finalized" },
              { value: 3, label: "Finalized & shared with stakeholders" },
            ],
          },
          {
            label: "5.2 Green Coverage Area",
            options: [
              { value: 0, label: "<10%" },
              { value: 1, label: "10–25%" },
              { value: 2, label: "25–50%" },
              { value: 3, label: ">50%" },
            ],
          },
          {
            label: "5.3 Green Landscapes",
            options: [
              { value: 0, label: "High water non-native + no smart irrigation" },
              { value: 1, label: "High water non-native + smart irrigation" },
              { value: 2, label: "Native species + no smart irrigation" },
              { value: 3, label: "Native species + smart irrigation" },
            ],
          },
          {
            label: "5.4 Green Roofs & Walls",
            options: [
              { value: 0, label: "None" },
              { value: 1, label: "Plans in place" },
              { value: 2, label: "Green roofs operational" },
              { value: 3, label: "Green roofs + walls operational" },
            ],
          },
        ],
      },
    ],
  },

  hi: {
    steps: [
      "प्रारंभ",
      "भाषा",
      "संपर्क विवरण",
      "अपार्टमेंट विवरण",
      "जल प्रबंधन",
      "जल दक्षता",
      "भूजल स्थिरता",
      "जल परिपत्रता",
      "हरी वनस्पति",
      "पूर्वावलोकन",
      "सफलता",
    ],
    start: {
      title: "जल स्मृति अपार्टमेंट भवन जल स्कोरकार्ड मूल्यांकन इनपुट फॉर्म",
      button: "मूल्यांकन शुरू करें",
    },
    language: {
      title: "अपनी भाषा चुनें",
      english: "अंग्रेज़ी",
      hindi: "हिंदी",
      next: "आगे",
    },
    contact: {
      title: "संपर्क व्यक्ति का विवरण",
      fullName: "संपर्क व्यक्ति का पूरा नाम",
      email: "संपर्क व्यक्ति का ईमेल पता",
      whatsapp: "संपर्क व्यक्ति का व्हाट्सएप नंबर",
      date: "मूल्यांकन की तारीख",
    },
    apartment: {
      title: "मूल्यांकन किए जा रहे अपार्टमेंट भवन के बारे में",
      name: "अपार्टमेंट भवन का नाम और पूरा पता",
      map: "मूल्यांकन किए जा रहे अपार्टमेंट भवन का गूगल मैप लिंक",
      units: "अपार्टमेंट भवन में कितने यूनिट/फ्लैट हैं *",
    },
    buttons: {
      next: "आगे",
      back: "पीछे",
      finish: "समाप्त करें",
      submit: "जमा करें",
      edit: "अपने उत्तर संपादित करें",
      cancel: "रद्द करें",
      confirm: "हाँ, जमा करें",
      restart: "नया फॉर्म भरें",
      pdf: "पीडीएफ रिपोर्ट डाउनलोड करें",
      clear: "फॉर्म साफ़ करें",
    },
    messages: {
      required: "आवश्यक",
      invalidEmail: "अमान्य ईमेल पता",
      invalidPhone: "फ़ोन नंबर 10 अंकों का होना चाहिए",
      notApplicable: "लागू नहीं",
      previewTitle: "अपनी प्रविष्टि देखें",
      confirmSubmit: "क्या आप वाकई सबमिट करना चाहते हैं और परिणाम देखना चाहते हैं?",
      thankYou: "धन्यवाद, {name} मूल्यांकन पूरा करने के लिए!",
    },
    sections: [
      {
        title: "१) जल प्रबंधन",
        questions: [
          {
            label: "1.1 जल नीति की स्थिति",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "जल नीति निर्माण प्रगति पर" },
              { value: 2, label: "जल नीति का मसौदा तैयार" },
              { value: 3, label: "जल नीति तैयार और कर्मचारियों/किरायेदारों को सूचित" },
            ],
          },
          {
            label: "1.2 जल प्रतिज्ञा की स्थिति",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "प्रबंधन ने जल प्रतिज्ञा ली है" },
              { value: 2, label: "प्रबंधन + स्टाफ ने जल प्रतिज्ञा ली है" },
              { value: 3, label: "प्रबंधन + स्टाफ + किरायेदारों ने जल प्रतिज्ञा ली है" },
            ],
          },
          {
            label: "1.3 जल चार्टर की स्थिति",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "जल चार्टर मसौदा तैयार किया जा रहा है" },
              { value: 2, label: "जल चार्टर अंतिम रूप दिया गया" },
              { value: 3, label: "जल चार्टर अंतिम और सार्वजनिक रूप से प्रदर्शित" },
            ],
          },
          {
            label: "1.4 जल बचत लक्ष्यों और उद्देश्यों की स्थिति",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "प्रगति पर" },
              { value: 2, label: "लक्ष्य निर्धारित किए गए" },
              { value: 3, label: "लक्ष्य कर्मचारियों/किरायेदारों को सूचित किए गए" },
            ],
          },
        ],
      },
      {
        title: "२) जल दक्षता",
        questions: [
          {
            label: "2.1 जल मीटरिंग की स्थिति",
            options: [
              { value: 0, label: "बल्क जल मीटर" },
              { value: 1, label: "बल्क मीटर + सबमीटर" },
              { value: 2, label: "बल्क मीटर + सबमीटर + मासिक/साप्ताहिक निगरानी" },
              { value: 3, label: "स्मार्ट वाटर सब मीटर" },
            ],
          },
          {
            label: "2.2 जल फिटिंग्स का औसत प्रवाह दर (lpm)",
            options: [
              { value: 0, label: ">15 lpm" },
              { value: 1, label: "10–15 lpm" },
              { value: 2, label: "5–10 lpm" },
              { value: 3, label: "<5 lpm" },
            ],
          },
          {
            label: "2.3 शौचालय फ्लशिंग की स्थिति",
            options: [
              { value: 0, label: "सिंगल फ्लश (>12 लीटर)" },
              { value: 1, label: "सिंगल फ्लश (10–12 लीटर)" },
              { value: 2, label: "डुअल फ्लश (12/6 लीटर)" },
              { value: 3, label: "डुअल फ्लश (8/4 लीटर)" },
            ],
          },
          {
            label: "2.4 जल संरक्षण साइनज और संचार",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "शौचालयों में साइनज" },
              { value: 2, label: "शौचालयों और अन्य क्षेत्रों में साइनज" },
              { value: 3, label: "साइनज + मासिक जागरूकता सत्र" },
            ],
          },
          {
            label: "2.5 कूलिंग टावर में जल उपयोग",
            options: [
              { value: -1, label: "लागू नहीं" },
              { value: 0, label: "कोई सबमीटर नहीं / सिंगल पास उपयोग" },
              { value: 1, label: "सबमीटर + सिंगल पास उपयोग" },
              { value: 2, label: "सबमीटर + पुन:संचलन कारक <3" },
              { value: 3, label: "सबमीटर + पुन:संचलन कारक >3" },
            ],
          },
          {
            label: "2.6 जल उपयोग तीव्रता",
            options: [
              { value: 0, label: "श्रेष्ठ अभ्यास बेंचमार्क से >60% अधिक" },
              { value: 1, label: "श्रेष्ठ अभ्यास बेंचमार्क से 51–60% अधिक" },
              { value: 2, label: "श्रेष्ठ अभ्यास बेंचमार्क से 11–40% अधिक" },
              { value: 3, label: "श्रेष्ठ अभ्यास बेंचमार्क के भीतर 10%" },
            ],
          },
        ],
      },
      {
        title: "३) भूजल स्थिरता",
        questions: [
          {
            label: "3.1 भूजल निर्भरता (% वार्षिक जल खपत का)",
            options: [
              { value: 0, label: ">50%" },
              { value: 1, label: "20–50%" },
              { value: 2, label: "5–20%" },
              { value: 3, label: "<5%" },
            ],
          },
          {
            label: "3.2 भूजल निष्कर्षण की स्थिति",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "पंप घंटे की मैनुअल निगरानी" },
              { value: 2, label: "मैनुअल मीटरिंग" },
              { value: 3, label: "स्मार्ट मीटरिंग" },
            ],
          },
          {
            label: "3.3 भूजल पुनर्भरण (% निष्कर्षण का)",
            options: [
              { value: 0, label: "<20%" },
              { value: 1, label: "20–40%" },
              { value: 2, label: "40–50%" },
              { value: 3, label: ">50%" },
            ],
          },
        ],
      },
      {
        title: "४) जल परिपत्रता",
        questions: [
          {
            label: "4.1 वर्षा जल संचयन की स्थिति",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "<50% छत से संचयन" },
              { value: 2, label: ">50% छत से संचयन" },
              { value: 3, label: "छत + गैर-छत संचयन" },
            ],
          },
          {
            label: "4.2 ग्रे/सीवेज जल पुनर्चक्रण या पुन: उपयोग",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "सुविधा हेतु स्थान उपलब्ध" },
              { value: 2, label: "प्रगति पर – डिज़ाइन तैयार, निर्माण शेष" },
              { value: 3, label: "संचालनात्मक" },
            ],
          },
          {
            label: "4.3 सामूहिक आरओ जल स्थिति",
            options: [
              { value: 0, label: "कोई पुन: उपयोग नहीं, अपशिष्ट जल छोड़ा गया" },
              { value: 1, label: "गैर-पीने योग्य उपयोग हेतु संभव" },
              { value: 2, label: "योजनाएं तैयार, कार्यान्वयन शेष" },
              { value: 3, label: "अपशिष्ट जल का पुन: उपयोग हो रहा है" },
            ],
          },
        ],
      },
      {
        title: "५) हरित आवरण",
        questions: [
          {
            label: "5.1 ग्रीन कवर नीति",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "प्रगति पर" },
              { value: 2, label: "अंतिम रूप दिया गया" },
              { value: 3, label: "अंतिम रूप दिया गया और साझा" },
            ],
          },
          {
            label: "5.2 ग्रीन कवरेज क्षेत्र",
            options: [
              { value: 0, label: "<10%" },
              { value: 1, label: "10–25%" },
              { value: 2, label: "25–50%" },
              { value: 3, label: ">50%" },
            ],
          },
          {
            label: "5.3 ग्रीन लैंडस्केप",
            options: [
              { value: 0, label: "उच्च जल उपयोग गैर-स्थानीय + कोई स्मार्ट सिंचाई नहीं" },
              { value: 1, label: "उच्च जल उपयोग गैर-स्थानीय + स्मार्ट सिंचाई" },
              { value: 2, label: "स्थानीय प्रजाति + कोई स्मार्ट सिंचाई नहीं" },
              { value: 3, label: "स्थानीय प्रजाति + स्मार्ट सिंचाई" },
            ],
          },
          {
            label: "5.4 ग्रीन रूफ्स और ग्रीन वॉल्स",
            options: [
              { value: 0, label: "कोई नहीं" },
              { value: 1, label: "योजनाएं तैयार" },
              { value: 2, label: "ग्रीन रूफ्स संचालन में" },
              { value: 3, label: "ग्रीन रूफ्स + वॉल्स संचालन में" },
            ],
          },
        ],
      },
    ],
  },
};

export default translations;
