import express from "express";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";
import ImgurStorage from "multer-storage-imgur";

// Middleware
import errorHandler from "#middleware/errors.js";
import { verifyToken } from "#middleware/authentication.js";

// Routes
import userRoutes from "#routes/users.js";
import imagesRoutes from "#routes/images.js";

const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGUR_CLIENT_ID }),
});

const allowedDomains = {
  [process.env.FRONTEND_APP]: true,
};

const corsOptions = {
  origin: function (origin, callback) {
    if (
      allowedDomains[origin] ||
      (process.env.NODE_ENV || "development") === "development"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));

server.use("/account", userRoutes);
server.use("/images", imagesRoutes);

server.get("/", (req, res) => {
  res.send("It's working!");
});

server.post(
  "/postImage",
  verifyToken,
  upload.single("image"),
  async (req, res) => res.status(201).send({ link: req.file.link })
);

server.use(errorHandler);

export default server;
