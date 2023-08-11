import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
function Signin() {
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 18,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h5"}>
          Welcome to course site man. Sign in below
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="email-ID"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button size={"larger"} variant="contained">
            sign in
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
