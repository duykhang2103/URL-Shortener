import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { ClipboardIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function CopyButton({ url }: { url: string }) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {isCopied ? (
            <Button className="w-1/5" variant="outline">
              <p className="md:block hidden">Copied!</p>
              <CheckIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="w-1/5"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(url);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
            >
              <p className="md:block hidden">Copy to Clipboard</p>

              <ClipboardIcon className=" h-[50px] w-[50px]" />
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
