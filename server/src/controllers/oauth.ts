import { Request, Response } from "express";
import prisma from "../services/prisma";
import { GitHub, Google } from "arctic";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "src/config";

const github = new GitHub(
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  "http://localhost:3000/api/oauth/github/callback",
);

const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/oauth/google/callback",
);
