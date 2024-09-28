import { SERVER_URL } from "@/lib/const";
import { IUrl } from "@/lib/interfaces";
import CopyButton from "./CopyButton";
import { ArrowRightIcon, HandIcon } from "@radix-ui/react-icons";

export default function ShortDisplay({ url }: { url: IUrl }) {
  return (
    // <div className="w-full flex flex-row ">
    <div className="relative w-full mb-4 p-2 flex flex-row items-center justify-between border-spacing-1 border rounded-sm">
      <div className="w-2/3 flex flex-row items-center justify-between">
        <div className="w-4/5 flex flex-col">
          <a
            href={SERVER_URL + "/" + url.shortCode}
            className=" text-xl font-bold  overflow-auto"
          >
            {SERVER_URL + "/" + url.shortCode}
          </a>
          <a
            href={url.original}
            className="w-[80%] ml-2 text-sm text-gray-500 text-ellipsis text-nowrap overflow-hidden"
          >
            <ArrowRightIcon className="h-4 w-4 inline" />
            {url.original}
          </a>
        </div>
        <CopyButton url={SERVER_URL + "/" + url.shortCode} />
      </div>
      <div className="text-l w-[15%] p-2 flex flex-row items-center justify-between border border-gray-500 rounded-xl">
        <HandIcon className="h-4 w-4 mt-1 inline" />
        <p className="text-l text-gray-500">{url.numOfClicks} clicks!</p>
      </div>
      {/* </div> */}
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
