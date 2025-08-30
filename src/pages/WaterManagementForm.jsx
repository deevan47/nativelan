import React, { useState } from "react";

const initialFormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  date: "",
  buildingname: "",
  maplink: "",
  unitscount: "",
  q1_1: "",
  q1_2: "",
  q1_3: "",
  q1_4: "",
  q2_1: "",
  q2_2: "",
  q2_3: "",
  q2_4: "",
  q2_5: "",
  q2_6: "",
  q3_1: "",
  q3_2: "",
  q3_3: "",
  q4_1: "",
  q4_2: "",
  q4_3: "",
  q5_1: "",
  q5_2: "",
  q5_3: "",
  q5_4: "",
};

export default function WaterManagementForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.fullName || !formData.email) {
      setErrorMsg("Please fill in your full name and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || "Form submitted successfully!");
        setFormData(initialFormState);
      } else {
        setErrorMsg(data.message || "Failed to submit the form.");
      }
    } catch (err) {
      setErrorMsg("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <h2>Water Management Form</h2>
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        {/* Basic info */}
        <label>
          Full Name*:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email*:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          WhatsApp:
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Building Name:
          <input
            type="text"
            name="buildingname"
            value={formData.buildingname}
            onChange={handleChange}
          />
        </label>
        <label>
          Map Link:
          <input
            type="url"
            name="maplink"
            value={formData.maplink}
            onChange={handleChange}
          />
        </label>
        <label>
          Units Count:
          <input
            type="number"
            name="unitscount"
            value={formData.unitscount}
            onChange={handleChange}
            min="0"
          />
        </label>

        {/* Section 1 */}
        <fieldset>
          <legend>1) Water Management</legend>
          <label>
            1.1 Status of Water Policy:
            <select name="q1_1" value={formData.q1_1} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Water policy making in progress</option>
              <option value="2">Water Policy drafted</option>
              <option value="3">Drafted & communicated</option>
            </select>
          </label>

          <label>
            1.2 Status of Water Pledge:
            <select name="q1_2" value={formData.q1_2} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Management</option>
              <option value="2">Management + Staff</option>
              <option value="3">Management + Staff + Tenants</option>
            </select>
          </label>

          <label>
            1.3 Status of Water Charter:
            <select name="q1_3" value={formData.q1_3} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Drafting in progress</option>
              <option value="2">Finalized</option>
              <option value="3">Finalized & Public</option>
            </select>
          </label>

          <label>
            1.4 Status of Water Saving Goals & Targets:
            <select name="q1_4" value={formData.q1_4} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Work in progress</option>
              <option value="2">Goals set</option>
              <option value="3">Goals communicated</option>
            </select>
          </label>
        </fieldset>

        {/* Section 2 */}
        <fieldset>
          <legend>2) Water Efficiency</legend>
          <label>
            2.1 Status of Water Metering:
            <select name="q2_1" value={formData.q2_1} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">Bulk water meter</option>
              <option value="1">Bulk + Submeter</option>
              <option value="2">Bulk + Submeter + Monitoring</option>
              <option value="3">Smart water sub meters</option>
            </select>
          </label>

          <label>
            2.2 Water Fixtures (lpm):
            <select name="q2_2" value={formData.q2_2} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">&gt; 15</option>
              <option value="1">10–15</option>
              <option value="2">5–10</option>
              <option value="3">&lt; 5</option>
            </select>
          </label>

          <label>
            2.3 Toilet Flushing:
            <select name="q2_3" value={formData.q2_3} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">Single flush &gt;12L</option>
              <option value="1">Single flush 10–12L</option>
              <option value="2">Dual flush 12/6L</option>
              <option value="3">Dual flush 8/4L</option>
            </select>
          </label>

          <label>
            2.4 Water Conservation Signage:
            <select name="q2_4" value={formData.q2_4} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Washrooms</option>
              <option value="2">Washrooms + Other</option>
              <option value="3">Signage + Awareness Sessions</option>
            </select>
          </label>

          <label>
            2.5 Water Use in Cooling Tower:
            <select name="q2_5" value={formData.q2_5} onChange={handleChange}>
              <option value="">Select</option>
              <option value="na">Not Applicable</option>
              <option value="0">No submeter / single pass</option>
              <option value="1">Submeter + single pass</option>
              <option value="2">Submeter + recirc &lt;3</option>
              <option value="3">Submeter + recirc &gt;3</option>
            </select>
          </label>

          <label>
            2.6 Water Use Intensity:
            <select name="q2_6" value={formData.q2_6} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">&gt;60% above benchmark</option>
              <option value="1">51–60% above</option>
              <option value="2">11–40% above</option>
              <option value="3">Within 10% of benchmark</option>
            </select>
          </label>
        </fieldset>

        {/* Section 3 */}
        <fieldset>
          <legend>3) Groundwater Sustainability</legend>
          <label>
            3.1 Groundwater Dependency %:
            <select name="q3_1" value={formData.q3_1} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">&gt;50%</option>
              <option value="1">20–50%</option>
              <option value="2">5–20%</option>
              <option value="3">&lt;5%</option>
            </select>
          </label>

          <label>
            3.2 Groundwater Extraction:
            <select name="q3_2" value={formData.q3_2} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Manual hours monitoring</option>
              <option value="2">Manual metering</option>
              <option value="3">Smart metering</option>
            </select>
          </label>

          <label>
            3.3 Groundwater Recharge %:
            <select name="q3_3" value={formData.q3_3} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">&lt;20%</option>
              <option value="1">20–40%</option>
              <option value="2">40–50%</option>
              <option value="3">&gt;50%</option>
            </select>
          </label>
        </fieldset>

        {/* Section 4 */}
        <fieldset>
          <legend>4) Water Circularity</legend>
          <label>
            4.1 Rainwater Harvesting:
            <select name="q4_1" value={formData.q4_1} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Roof &lt;50%</option>
              <option value="2">Roof &gt;50%</option>
              <option value="3">Roof + Non-roof</option>
            </select>
          </label>

          <label>
            4.2 Greywater / Sewage Recycling:
            <select name="q4_2" value={formData.q4_2} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Footprint available</option>
              <option value="2">Work in progress</option>
              <option value="3">Operational</option>
            </select>
          </label>

          <label>
            4.3 Reverse Osmosis Treated Water:
            <select name="q4_3" value={formData.q4_3} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">No reuse</option>
              <option value="1">Technically feasible</option>
              <option value="2">Plans in place</option>
              <option value="3">Being reused</option>
            </select>
          </label>
        </fieldset>

        {/* Section 5 */}
        <fieldset>
          <legend>5) Green Vegetation Cover</legend>
          <label>
            5.1 Green Cover Policy:
            <select name="q5_1" value={formData.q5_1} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Drafting</option>
              <option value="2">Finalized</option>
              <option value="3">Finalized + Shared</option>
            </select>
          </label>

          <label>
            5.2 Green Coverage Area:
            <select name="q5_2" value={formData.q5_2} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">&lt;10%</option>
              <option value="1">10–25%</option>
              <option value="2">25–50%</option>
              <option value="3">&gt;50%</option>
            </select>
          </label>

          <label>
            5.3 Green Landscapes:
            <select name="q5_3" value={formData.q5_3} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">High water, non-native + no smart irrigation</option>
              <option value="1">High water, non-native + smart irrigation</option>
              <option value="2">Native + no smart irrigation</option>
              <option value="3">Native + smart irrigation</option>
            </select>
          </label>

          <label>
            5.4 Green Roofs & Walls:
            <select name="q5_4" value={formData.q5_4} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Plans in place</option>
              <option value="2">Green Roofs operational</option>
              <option value="3">Green Roofs + Green Walls operational</option>
            </select>
          </label>
        </fieldset>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
