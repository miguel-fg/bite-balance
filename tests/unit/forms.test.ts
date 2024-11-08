import { describe, it, expect } from "vitest";
import { validateField, matchFields } from "../../src/scripts/forms";

describe("validateField", () => {
    it("should return VALID for a valid email", () => {
        const result = validateField("test@example.com", "EMAIL");
        expect(result).toEqual({ res: "VALID", msg: "" });
    });

    it("should return ERROR with a message for an invalid email", () => {
        const result = validateField("invalid-email", "EMAIL");
        expect(result).toEqual({
            res: "ERROR",
            msg: "Please enter a valid email address",
        });
    });
});

describe("matchFields", () => {
    it("should return VALID when passwords match", () => {
        const result = matchFields("password123!", "password123!");
        expect(result).toEqual({ res: "VALID", msg: "" });
    });

    it("should return ERROR when passwords do not match", () => {
        const result = matchFields("password123!", "password456!");
        expect(result).toEqual({ res: "ERROR", msg: "Passwords don't match" });
    });

    it("should return ERROR when passwords are empty", () => {
        const result = matchFields("", "");
        expect(result).toEqual({
            res: "ERROR",
            msg: "Please confirm your password",
        });
    });
});
