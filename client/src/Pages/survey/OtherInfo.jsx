import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@material-ui/core";
function OtherInfo({ page, formQuestion, formData, setFormData }) {
  const [value, setValue] = React.useState("5");
  const handleChange = (event) => {
    setValue(event.target.value);
    formData[page] = event.target.value;
    setFormData(formData);
  };

  return (
    <FormControl
      sx={{
        background: "#FFFFFF",
        boxShadow: " 0px 0px 20px 2px #CBD6FF",
        borderRadius: "10px",
        padding: "3rem",
        width: "70vw",
        heigh: "100vh",
        display: "flex",

        gap: "2rems",
      }}
    >
      <FormLabel sx={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        Q{page + 1}:{formQuestion}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{ marginBottom: "1rem" }}
      >
        <FormControlLabel
          sx={{ marginBottom: "1rem" }}
          value="1"
          control={<Radio />}
          label="Innacurate"
        />
        <FormControlLabel
          sx={{ marginBottom: "1rem" }}
          value="2"
          control={<Radio />}
          label="Moderately Innacurate"
        />
        <FormControlLabel
          sx={{ marginBottom: "1rem" }}
          value="3"
          control={<Radio />}
          label="Neither Innacurate Nor Accurate"
        />
        <FormControlLabel
          sx={{ marginBottom: "1rem" }}
          value="4"
          control={<Radio />}
          label="Moderately Accurate"
        />
        <FormControlLabel value="5" control={<Radio />} label="Accurate" />
      </RadioGroup>
    </FormControl>
  );
}

export default OtherInfo;
