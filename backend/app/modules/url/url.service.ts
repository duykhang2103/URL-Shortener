import isValid from "is-url";
import Url from "./url.model";
import ApiError from "../../../common/error";
import { generateUniqueId } from "../../../utils/uniqueId";

const create = async (
  url: string,
  expiresAt: string = "",
  password: string = ""
) => {
  if (!isValid(url)) {
    throw new ApiError(400, "Invalid URL");
  }
  const shortCode = await generateUniqueId();

  const newUrl = new Url({ original: url, shortCode });
  if (expiresAt) {
    newUrl.expiresAt = new Date(expiresAt);
  }
  if (password) {
    newUrl.password = password;
  }

  await newUrl.save();
  return `${process.env.BASE_URL}/${shortCode}`;
};

const redirect = async (shortCode: string) => {
  const url = await Url.findOne({
    $and: [
      { shortCode },
      {
        $or: [
          { expiresAt: { $exists: false } },
          { expiresAt: { $gt: new Date() } },
        ],
      },
    ],
  });
  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  await Url.updateOne(
    { shortCode },
    { $inc: { numOfClicks: 1 }, lastClickedAt: new Date() }
  );

  return url.original;
};

export const urlService = {
  create,
  redirect,
};
