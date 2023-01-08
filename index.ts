import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";

type DestinationCallback = (error: Error, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, file.originalname);
  },
  destination: (
    request: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, "./uploads");
  },
});

const upload = multer({ storage });

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();

// Cross-Origin Requests
app.use(cors());

app.post("/upload_file", upload.any(), (req, res) => {
  res.send({ message: "Successfully uploaded file" });
});

app.get("/", (req: Request, res: Response) => {
  res.send("The Song Splitter server is up and running!");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
