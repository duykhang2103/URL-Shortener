import { Request, Response, NextFunction } from "express";
import { urlService } from "./url.service";
import {
  sendRedirectResponse,
  sendSuccessResponse,
} from "../../../common/successResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const { expiresAt, password } = req.params;
    const shortUrl = await urlService.create(url);
    sendSuccessResponse(res, shortUrl, 201, "URL shortened successfully");
  } catch (error) {
    next(error);
  }
};

const redirect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const originalUrl = await urlService.redirect(code);
    sendRedirectResponse(res, originalUrl);
  } catch (error) {
    next(error);
  }
};

export const urlController = {
  create,
  redirect,
};
