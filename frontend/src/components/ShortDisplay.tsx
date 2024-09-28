import { IUrl } from "@/lib/interfaces";
import React from "react";

export default function ShortDisplay({ url }: { url: IUrl }) {
  return (
    <div className="w-full flex flex-row justify-between">
      <p className="text-l">{url.shortCode}</p>
      <p className="text-l">{url.numOfClicks}</p>
    </div>
  );
}
