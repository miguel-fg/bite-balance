import { Request, Response } from "express";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { register, login, logout } from "../../src/controllers/auth";
import prisma from "../../src/services/prisma";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import {
  generateSessionToken,
  createSession,
  invalidateSession,
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from "../../src/services/session";

vi.mock("../../src/services/prisma", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("../../src/services/session", () => ({
  generateSessionToken: vi.fn(),
  createSession: vi.fn(),
  invalidateSession: vi.fn(),
  setSessionTokenCookie: vi.fn(),
  deleteSessionTokenCookie: vi.fn(),
}));

vi.mock("@oslojs/crypto/sha2");
vi.mock("@oslojs/encoding");

describe("authentication controllers", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: ReturnType<typeof vi.fn>;
  let responseStatus: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubGlobal("crypto", {
      getRandomValues: vi.fn().mockReturnValue(new Uint8Array(16)),
    });

    responseJson = vi.fn();
    responseStatus = vi.fn().mockReturnThis();
    mockResponse = {
      status: responseStatus,
      json: responseJson,
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    };
  });

  describe("register", () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          username: "Test User",
          email: "test@example.com",
          password: "Password123!",
        },
      };
    });

    it("should successfully register a new user", async () => {
      const mockUser = {
        id: 1,
        username: "Test User",
        email: "test@example.com",
        hashedPassword: "mockhash",
        salt: "mocksalt",
        provider: null,
        providerId: null,
        dateOfBirth: null,
        weight: null,
        height: null,
        gender: null,
      };

      const mockSession = {
        id: "1",
        userId: 1,
        expiresAt: new Date(),
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.user.create).mockResolvedValue(mockUser);
      vi.mocked(encodeBase32LowerCaseNoPadding).mockReturnValue("mocksalt");
      vi.mocked(encodeHexLowerCase).mockReturnValue("mockhash");
      vi.mocked(generateSessionToken).mockReturnValue("mocktoken");
      vi.mocked(createSession).mockResolvedValue(mockSession);

      await register(mockRequest as Request, mockResponse as Response);

      expect(setSessionTokenCookie).toHaveBeenCalled();
      expect(responseStatus).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Registration successful",
          user: expect.objectContaining({
            id: mockUser.id,
            username: mockUser.username,
            email: mockUser.email,
          }),
        }),
      );
    });

    it("should return 400 if required fields are missing", async () => {
      mockRequest.body = { username: "Test User" };

      await register(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        message: "Username, email, and password are required",
      });
    });

    it("should return 400 if email is already in use", async () => {
      const mockUser = {
        id: 1,
        username: "Test User",
        email: "test@example.com",
        hashedPassword: "mockhash",
        salt: "mocksalt",
        provider: null,
        providerId: null,
        dateOfBirth: null,
        weight: null,
        height: null,
        gender: null,
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);

      await register(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        message: "Email is already in use",
      });
    });
  });

  describe("login", () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          email: "test@example.com",
          password: "Password123!",
        },
      };
    });

    it("should successfully login a user", async () => {
      const mockUser = {
        id: 1,
        username: "Test User",
        email: "test@example.com",
        hashedPassword: "mockhash",
        salt: "mocksalt",
        provider: null,
        providerId: null,
        dateOfBirth: null,
        weight: null,
        height: null,
        gender: null,
      };

      const mockSession = {
        id: "1",
        userId: 1,
        expiresAt: new Date(),
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
      vi.mocked(encodeHexLowerCase).mockReturnValue("mockhash");
      vi.mocked(generateSessionToken).mockReturnValue("mocktoken");
      vi.mocked(createSession).mockResolvedValue(mockSession);

      await login(mockRequest as Request, mockResponse as Response);

      expect(setSessionTokenCookie).toHaveBeenCalled();
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Login successful",
          user: expect.objectContaining({
            id: mockUser.id,
            username: mockUser.username,
            email: mockUser.email,
          }),
        }),
      );
    });

    it("should return 401 if credentials are missing", async () => {
      mockRequest.body = { email: "test@example.com" };

      await login(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(401);
      expect(responseJson).toHaveBeenCalledWith({
        message: "Email and password are required",
      });
    });

    it("should return 401 if user is not found", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      await login(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(401);
      expect(responseJson).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("should return 401 if password is incorrect", async () => {
      const mockUser = {
        id: 1,
        username: "Test User",
        email: "test@example.com",
        hashedPassword: "correcthash",
        salt: "mocksalt",
        provider: null,
        providerId: null,
        dateOfBirth: null,
        weight: null,
        height: null,
        gender: null,
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
      vi.mocked(encodeHexLowerCase).mockReturnValue("wronghash");

      await login(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(401);
      expect(responseJson).toHaveBeenCalledWith({
        message: "Password is incorrect",
      });
    });
  });

  describe("logout", () => {
    beforeEach(() => {
      mockRequest = {
        cookies: {
          session: "mocktoken",
        },
      };
    });

    it("should successfully logout a user", async () => {
      await logout(mockRequest as Request, mockResponse as Response);

      expect(invalidateSession).toHaveBeenCalledWith("mocktoken");
      expect(deleteSessionTokenCookie).toHaveBeenCalled();
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith({
        message: "Logout successful",
      });
    });

    it("should return 400 if no session token is found", async () => {
      mockRequest.cookies = {};

      await logout(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        message: "No session token found",
      });
    });
  });
});
