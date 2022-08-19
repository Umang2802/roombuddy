import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@material-ui/core";
function OtherInfo({ page, formQuestion, formData, setFormData }) {
  const [value, setValue] = React.useState("female");
  console.log(formQuestion);
  const handleChange = (event) => {
    formData[page] = event.target.value;
    setFormData(formData);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        {formQuestion}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="Innacurate" />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="Moderately Innacurate"
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="Neither Innacurate Nor Accurate"
        />
        <FormControlLabel
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
