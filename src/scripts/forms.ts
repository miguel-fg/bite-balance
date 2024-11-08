import { InputStatus } from "../types/InputStatus";

type ValidTests = "EMAIL" | "USERNAME" | "PASSWORD";

interface ValidationResult {
  res: InputStatus;
  msg: string;
}

const validateField = (input: string, test: ValidTests): ValidationResult => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const usernameRegex = /^[a-zA-Z\s]{2,}$/;
  const passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/;

  switch (test) {
    case "EMAIL":
      if (emailRegex.test(input)) {
        return { res: "VALID", msg: "" };
      } else {
        return {
          res: "ERROR",
          msg: "Please enter a valid email address.",
        };
      }
    case "USERNAME":
      if (usernameRegex.test(input)) {
        return { res: "VALID", msg: "" };
      } else {
        return {
          res: "ERROR",
          msg: "Username must be at least 2 characters long and can only contain letters and spaces.",
        };
      }
    case "PASSWORD":
      if (passwordRegex.test(input)) {
        return { res: "VALID", msg: "" };
      } else {
        let message =
          "Password must be at least 8 characters long and include:";
        if (!/(?=.*[a-z])/.test(input)) message += " one lowercase letter,";
        if (!/(?=.*[A-Z])/.test(input)) message += " one uppercase letter,";
        if (!/(?=.*\d)/.test(input)) message += " one number,";
        if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(input))
          message += " one symbol,";
        message = message.replace(/,$/, "."); // Clean up trailing comma
        return {
          res: "ERROR",
          msg: message,
        };
      }
    default:
      return { res: "ERROR", msg: "Invalid validation type specified." };
  }
};

const matchFields = (input1: string, input2: string): ValidationResult => {
  if (!input1 || !input2) {
    return {
      res: "ERROR",
      msg: "Please confirm your password",
    };
  }

  if (input1 !== input2) {
    return {
      res: "ERROR",
      msg: "Passwords don't match",
    };
  }

  return {
    res: "VALID",
    msg: "",
  };
};

export { validateField, matchFields };
