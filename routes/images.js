import * as Images from "#queries/images";
import { Router } from "express";
import { verifyToken } from "../middleware/authentication";

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const image = await Images.find({ id }).first();
  return res.status(200).json(image);
});

router.get("/public", async (req, res) => {
  const images = await Images.find({ private: false });
  return res.status(200).json(images);
});

router.get("/all", verifyToken, async (req, res) => {
  const images = await Images.find();
  return res.status(200).json(images);
});

router.post("/", verifyToken, async (req, res) => {
  const image = await Images.add(req.body);
  return res.status(201).json(image);
});

router.put("/:id", verifyToken, async (req, res) => {
  delete req.body.id;
  const { id } = req.params;
  const image = await Images.edit({ id }, req.body);
  return res.status(201).json(image);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const deleted = await Images.remove(req.params.id);
  return res
    .status(deleted ? 200 : 404)
    .json({ message: deleted ? "Successfully delete" : "Error" });
});

export default router;
