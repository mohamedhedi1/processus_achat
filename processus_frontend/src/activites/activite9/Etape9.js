import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Button, FormControl } from '@mui/material';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
function RedBar() {
  return (
    <Box
      sx={{
        height: 10,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0)"
            : "rgb( 0  0 0 / 0 %)"
      }}
    />
  );
}
export default function Etape9() {
  const [value, setValue] = React.useState(new Date());
  const [testvalue, settestValue] = React.useState(false);
  const [testvalue1, settestValue1] = React.useState(false);
  const [now, setNow] = React.useState(new Date());

  const [value1, setValue1] = React.useState(new Date());
  const handleChange = (newValue) => {
    if (now.getTime() < newValue.getTime()) {
      setValue(newValue);
      settestValue(false);
    } else {
      settestValue(true);
    }
  };
  const handleChange1 = (newValue) => {
    if (now.getTime() < newValue.getTime()) {
      setValue1(newValue);
      settestValue1(false);
    } else {
      settestValue1(true);
    }
  };
  const post =()=>{
    let b={
      date1:format(value, 'dd/MM/yyyy'),
      date:format(value1, 'dd/MM/yyyy')
    }
    console.log(b)
  }

  return (
      <div className="col-3">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={3}>
        <Stack>
          <DesktopDatePicker
            label="Date de Lancement de L'appelle d'offre"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <RedBar />
          {testvalue && (
            <Alert variant="outlined" severity="error">
              vous ne pouvez pas utiliser une date antérieure à celle
              d'aujourd'hui.
            </Alert>
          )}
        </Stack>
        <Stack>
        <DesktopDatePicker
            label="Date de Lancement de séance de plis"
            value={value1}
            onChange={handleChange1}
            renderInput={(params) => <TextField {...params} />}
          />
          <RedBar />
          {testvalue1 && (
            <Alert variant="outlined" severity="error">
              vous ne pouvez pas utiliser une date antérieure à celle
              d'aujourd'hui.
            </Alert>
          )}
        </Stack>
      </Stack>
    </LocalizationProvider>
    <Button onClick={post }> test</Button>
    </div>
  );
}
