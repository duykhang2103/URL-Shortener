import { Router } from "express";
import { urlController } from "./url.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { urlValidation } from "./url.validation";

const router = Router();

router.post(
  "/urls",
  validateRequest(urlValidation.create),
  urlController.create
);

router.get("/urls", validateRequest(urlValidation.list), urlController.list);

router.get("/:code", urlController.redirect);

export const urlRouter = router;
