import { useContext } from "react";
import ShortDisplay from "./ShortDisplay";
import { UrlsContext } from "@/contexts/UrlsContext";

export function ShortList() {
  const { urls } = useContext(UrlsContext);
  return (
    <div className="w-full flex flex-col mt-5">
      {urls.map((url) =>
        !url.expiresAt || new Date(url.expiresAt) > new Date() ? (
          <ShortDisplay key={url._id} url={url} />
        ) : null
      )}
    </div>
  );
}
