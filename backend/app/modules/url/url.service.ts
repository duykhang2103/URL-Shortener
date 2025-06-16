import isValid from "is-url";
import Url from "./url.model";
import ApiError from "../../../common/error";
import { generateUniqueId } from "../../../utils/uniqueId";
import { hashPassword } from "../../../utils/hash";
import { redis } from "../../../config/redis";

const create = async (
  url: string,
  expiresAt: string = "",
  password: string = "",
  custom: string = ""
) => {
  if (!isValid(url)) {
    throw new ApiError(400, "Invalid URL");
  }

  let shortCode;
  if (custom) {
    if (custom == "urls" || custom == "api-docs") {
      throw new ApiError(400, "Custom short code already exists");
    }
    const existingUrl = await Url.findOne({ shortCode: custom });
    if (existingUrl) {
      throw new ApiError(400, "Custom short code already exists");
    }
    shortCode = custom;
  } else shortCode = await generateUniqueId();

  const newUrl = new Url({ original: url, shortCode });
  if (expiresAt) {
    newUrl.expiresAt = new Date(expiresAt);
  }
  if (password) {
    const hashedPassword = await hashPassword(password);
    newUrl.password = hashedPassword;
  }

  await newUrl.save();
  await redis.set(
    `url:${newUrl.shortCode}`,
    JSON.stringify({
      _id: newUrl._id,
      original: newUrl.original,
      shortCode: newUrl.shortCode,
      expiresAt: newUrl.expiresAt,
      numOfClicks: newUrl.numOfClicks,
    }),
    "EX",
    60 * 60 * 24 * 30 // Cache for 30 days
  );

  return {
    _id: newUrl._id,
    original: newUrl.original,
    shortCode: newUrl.shortCode,
    expiresAt: newUrl.expiresAt,
    numOfClicks: newUrl.numOfClicks,
  };
};

const list = async (limit?: string) => {
  if (limit) {
    return await Url.find().sort({ createdAt: -1 }).limit(Number(limit));
  }
  return await Url.find(
    {},
    {
      original: 1,
      shortCode: 1,
      numOfClicks: 1,
      lastClickedAt: 1,
      expiresAt: 1,
      createdAt: 1,
      _id: 1,
    }
  ).sort({ createdAt: -1 });
};

const redirect = async (shortCode: string) => {
  if (!shortCode) {
    throw new ApiError(400, "Short code is required");
  }
  // Check Redis cache first
  const cachedUrl = await redis.get(`url:${shortCode}`);
  if (cachedUrl) {
    const urlData = JSON.parse(cachedUrl);
    // Check if the URL is expired
    if (urlData.expiresAt && new Date(urlData.expiresAt) <= new Date()) {
      throw new ApiError(404, "URL not found");
    }
    // Increment click count and update last clicked time
    await Url.updateOne(
      { shortCode },
      { $inc: { numOfClicks: 1 }, lastClickedAt: new Date() }
    );
    return urlData.original;
  }

  // If not found in cache, query the database
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
  list,
};
