import { describe, it, expect } from "vitest";
import { validateField, matchFields } from "../../src/scripts/forms";

describe("email validation", () => {
  const errorMsg = "Please enter a valid email address";

  it("returns VALID for a valid email", () => {
    const result = validateField("test@example.com", "EMAIL");
    expect(result).toEqual({ res: "VALID", msg: "" });
  });

  it("returns ERROR for an invalid email", () => {
    const result = validateField("invalid-email", "EMAIL");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });

  it("returns ERROR for an empty string", () => {
    const result = validateField("", "EMAIL");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });

  it("returns ERROR for missing domain", () => {
    const result = validateField("username@.com", "EMAIL");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });

  it("returns ERROR for missing local part", () => {
    const result = validateField("@domain.com", "EMAIL");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });

  it("returns ERROR for trailing dots in local part", () => {
    const result = validateField("username.@domain.com", "EMAIL");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });

  it("returns ERROR for leading dots in local part", () => {
    const result = validateField(".username@domain.com", "EMAIL");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });

  it("returns ERROR for repeating dots in local part", () => {
    const result = validateField("user..name@domain.com", "EMAIL");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });
});

describe("username validation", () => {
  const errorMsg =
    "Username must be at least 2 characters long and can only contain letters and spaces";

  it("returns VALID for a string with only letters and spaces", () => {
    const result = validateField("Abc Def", "USERNAME");
    expect(result).toEqual({
      res: "VALID",
      msg: "",
    });
  });

  it("returns ERROR for an empty string", () => {
    const result = validateField("", "USERNAME");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });

  it("returns ERROR for a single character string", () => {
    const result = validateField("A", "USERNAME");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });

  it("returns ERROR if string contains invalid characters", () => {
    const result = validateField("User123!", "USERNAME");
    expect(result).toEqual({
      res: "ERROR",
      msg: errorMsg,
    });
  });
});

describe("password validation", () => {
  it("returns VALID for passwords that meet all requirements", () => {
    const result = validateField("Password123!", "PASSWORD");
    expect(result).toEqual({
      res: "VALID",
      msg: "",
    });
  });

  it("returns ERROR for empty strings", () => {
    const result = validateField("", "PASSWORD");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Password must be at least 8 characters long and include: one lowercase letter, one uppercase letter, one number, one symbol",
    });
  });

  it("returns ERROR for short passwords", () => {
    const result = validateField("Ab1,", "PASSWORD");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Password must be at least 8 characters long and include:",
    });
  });

  it("returns ERROR if no uppercase character is found", () => {
    const result = validateField("password123!", "PASSWORD");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Password must be at least 8 characters long and include: one uppercase letter",
    });
  });

  it("returns ERROR if no lowercase character is found", () => {
    const result = validateField("PASSWORD123!", "PASSWORD");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Password must be at least 8 characters long and include: one lowercase letter",
    });
  });

  it("returns ERROR if no number is found", () => {
    const result = validateField("Password!", "PASSWORD");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Password must be at least 8 characters long and include: one number",
    });
  });

  it("returns ERROR if no symbol is found", () => {
    const result = validateField("Password123", "PASSWORD");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Password must be at least 8 characters long and include: one symbol",
    });
  });
});

describe("password confirmation", () => {
  it("returns VALID when passwords match", () => {
    const result = matchFields("password123!", "password123!");
    expect(result).toEqual({ res: "VALID", msg: "" });
  });

  it("returns ERROR when passwords do not match", () => {
    const result = matchFields("password123!", "password456!");
    expect(result).toEqual({ res: "ERROR", msg: "Passwords don't match" });
  });

  it("returns ERROR when both passwords are empty", () => {
    const result = matchFields("", "");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Please confirm your password",
    });
  });

  it("returns ERROR when first field is empty", () => {
    const result = matchFields("", "password123!");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Please confirm your password",
    });
  });

  it("returns ERROR when second field is empty", () => {
    const result = matchFields("password123!", "");
    expect(result).toEqual({
      res: "ERROR",
      msg: "Please confirm your password",
    });
  });
});
