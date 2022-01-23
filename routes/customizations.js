import * as Customizations from "#queries/customizations";
import { Router } from "express";
import { verifyToken } from "../middleware/authentication";

const router = Router();

router.get("/", async (req, res) => {
  const customizations = await Customizations.find().first();
  return res.status(200).json(customizations);
});

router.put("/", verifyToken, async (req, res) => {
  const customizations = await Customizations.edit({ id: 1 }, req.body);
  return res.status(201).json(customizations);
});

export default router;
