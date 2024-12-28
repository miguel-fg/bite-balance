import { Request, Response } from "express";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { register, login, logout } from "../../src/controllers/auth";
import prisma from "../../src/services/prisma";
import { sha256 } from "@oslojs/crypto/sha2";
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
                dateOfBirth: null,
                weight: null,
                height: null,
                gender: null,
            };

            vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
            vi.mocked(prisma.user.create).mockResolvedValue(mockUser);
            vi.mocked(encodeBase32LowerCaseNoPadding).mockReturnValue("mocksalt");
            vi.mocked(encodeHexLowerCase).mockReturnValue("mockhash");
            vi.mocked(generateSessionToken).mockReturnValue("mocktoken");
            vi.mocked(createSession).mockResolvedValue({
                id: 1,
                token: "mocktoken",
                expiresAt: new Date(),
            });

            await register(mockRequest as Request, mockResponse as Response);

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
    });
});
