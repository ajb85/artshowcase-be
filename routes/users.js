import * as Users from "#queries/users";
import { Router } from "express";

import { verifyToken } from "#middleware/authentication.js";
import { validatePassword, validatePasswordChange } from "#middleware/user";
import { generateToken } from "#utils/token";
import { encrypt } from "#utils/password";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  const { user } = res.locals;
  user.token = generateToken(user);
  return res.status(200).json(user);
});

router.post("/login", validatePassword, (req, res) => {
  const { user } = res.locals;
  user.token = generateToken(user);
  return res.status(200).json(user);
});

router.put("/", verifyToken, validatePasswordChange, async (req, res) => {
  const { id } = res.locals.user;
  const update = {};

  if (req.body.newPassword) {
    update.password = encrypt(req.body.newPassword);
  }

  if (req.body.username) {
    update.username = req.body.username;
  }

  const updatedUser = await Users.edit({ id }, update);
  delete updatedUser.password;
  return res.status(200).json(updatedUser);
});

export default router;
