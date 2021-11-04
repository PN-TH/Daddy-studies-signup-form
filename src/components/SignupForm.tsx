import React, { useState, useContext, ContextType } from "react";
import {
  Container,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import useStyles from "./SignupStyle";
import { SignUp } from "../types/Signup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SketchPicker, CirclePicker } from "react-color";

interface SomeComponentProps {}

const SignupForm: React.FC<SomeComponentProps> = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState<SignUp>({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    primaryColor: "",
    secondaryColor: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);


  const handleChange = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  const onSubmit = async (): Promise<void> => {
    console.log(formState);
  };

  const handleKeyPress = (event: any) => {
    // if (validate()) {
    //   if (event.key === "Enter") {
    //     onSubmit();
    //   }
    // }
  };

  return (
    <div className={classes.paper}>
      <img className={classes.logo} src="logo-ds.png" alt="Daddy Studies" />
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="schoolName"
          label="Nom de l'école"
          name="schoolName"
          autoFocus
          onChange={(e) => handleChange("title", e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="Prenom"
          name="firstname"
          autoComplete="firstname"
          onChange={(e) => handleChange("firstname", e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastname"
          label="Nom"
          name="lastname"
          autoComplete="lastname"
          onChange={(e) => handleChange("lastname", e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          onChange={(e) => handleChange("email", e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={(e) => handleChange("password", e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Visibility color="primary" />
                  ) : (
                    <VisibilityOff color="primary" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirmation du mot de passe"
          type={showPasswordConfirm ? "text" : "password"}
          id="password"
          onChange={(e) => handleChange("passwordConfirm", e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                  {showPasswordConfirm ? (
                    <Visibility color="primary" />
                  ) : (
                    <VisibilityOff color="primary" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div style={{ color: "#666666", alignItems: "center" }}>
          <p>
            Couleur primaire de l'application:{" "}
            <span style={{ color: formState.primaryColor, fontWeight: "bold" }}>
              {formState.primaryColor}
            </span>
          </p>
          <CirclePicker
            width="100%"
            onChangeComplete={(color: any) =>
              handleChange("primaryColor", color.hex)
            }
          />
        </div>

        <div
          style={{
            color: "#666666",
            alignItems: "center",
            marginBottom: 20,
          }}>
          <p>
            Couleur secondaire de l'application:{" "}
            <span
              style={{ color: formState.secondaryColor, fontWeight: "bold" }}>
              {formState.secondaryColor}
            </span>
          </p>
          <CirclePicker
            width="100%"
            onChangeComplete={(color: any) =>
              handleChange("secondaryColor", color.hex)
            }
          />
        </div>

        <Button
          onClick={onSubmit}
          fullWidth
          variant="contained"
          color="primary"
          // disabled={!validate()}
        >
          Validé
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
