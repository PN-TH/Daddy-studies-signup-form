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
import { CirclePicker } from "react-color";
import { useMutation, gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation Mutation($createSchoolInput: InputSchool!) {
    createSchool(input: $createSchoolInput) {
      data {
        id
        firstname
        schoolName
      }
      user {
        id
        firstname
      }
      workspace {
        id
        title
      }
    }
  }
`;

const SignupForm = () => {
  const classes = useStyles();
  const [createSchool] = useMutation(SIGNUP_MUTATION);
  const colors = [
    "#D92D2D",
    "#F55A5A",
    "#F57B5A",
    "#963636",
    "#9A5937",
    "#F5AB5A",
    "#F5DF5A",
    "#BBF55A",
    "#78F372",
    "#72F398",
    "#0DB47D",
    "#3C9A37",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#274A6D",
    "#4E4C6D",
    "#3F3B6D",
    "#89559C",
    "#B9599B",
    "#FFA3E2",
    "#FF66B6",
    "#544B4B",
    "#A5A5A5",
  ];
  const [formState, setFormState] = useState<SignUp>({
    schoolName: "",
    logo: "",
    firstname: "",
    lastname: "",
    email: "",
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
    await createSchool({
      variables: {
        createSchoolInput: {
          schoolName: formState.schoolName,
          logo: formState.logo,
          firstname: formState.firstname,
          lastname: formState.lastname,
          email: formState.email,
          primaryColor: formState.primaryColor,
          secondaryColor: formState.secondaryColor,
        },
      },
    });
    alert(
      "vous pouvez maintenant vous connecter et commencer à configurer votre espace, rendez vous sur daddystuddies.com"
    );
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onSubmit();
    }
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
          onChange={(e) => handleChange("schoolName", e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="schoolName"
          label="Url du logo"
          name="logo"
          autoFocus
          onChange={(e) => handleChange("logo", e.target.value)}
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
          //   onChange={(e) => handleChange("password", e.target.value)}
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
          //   onChange={(e) => handleChange("passwordConfirm", e.target.value)}
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
            colors={colors}
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
            colors={colors}
            onChangeComplete={(color: any) =>
              handleChange("secondaryColor", color.hex)
            }
          />
        </div>

        <Button
          onClick={() => onSubmit()}
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginBottom: 20 }}>
          Validé
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
