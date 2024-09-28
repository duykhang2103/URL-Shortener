import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { ClipboardIcon } from "@radix-ui/react-icons";

export default function CopyToClipboard() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            Copy to Clipboard <ClipboardIcon className="ml-2 h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
