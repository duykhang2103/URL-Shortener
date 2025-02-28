import { VITE_BASE_URL } from "@/lib/const";
import { IUrl } from "@/lib/interfaces";
import CopyButton from "./CopyButton";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShortDisplay({
  url,
  isLatest,
}: {
  url: IUrl;
  isLatest: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full mb-4 p-2 flex flex-row items-center justify-between border-spacing-1 border rounded-sm",
        isLatest ? "border-green-500 border-2" : "border-gray-500"
      )}
    >
      <div className="md:w-2/3 w-full flex flex-row items-center justify-between">
        <div className="w-4/5 flex flex-col">
          <a
            href={VITE_BASE_URL + "/" + url.shortCode}
            className=" md:text-xl text-sm font-bold  overflow-auto"
          >
            {VITE_BASE_URL + "/" + url.shortCode}
          </a>
          <a
            href={url.original}
            className="w-[80%] ml-2 text-sm text-gray-500 text-ellipsis text-nowrap overflow-hidden"
          >
            <ArrowRightIcon className="h-4 w-4 inline" />
            {url.original}
          </a>
        </div>
        <CopyButton url={VITE_BASE_URL + "/" + url.shortCode} />
      </div>
      <div className="md:flex hidden w-[10%] p-2 flex-row items-center justify-between border border-gray-500 rounded-xl">
        <MousePointerClick />
        <p className="text-sm text-gray-500">{url.numOfClicks} clicks!</p>
      </div>
      {url.expiresAt && (
        <div className="absolute right-[-20px] top-[-15px] text-sm p-1 border border-gray-500 rounded-xl bg-black text-white">
          Expires in{" "}
          {Math.ceil(
            (new Date(url.expiresAt).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )}{" "}
          days
        </div>
      )}
    </div>
  );
}
