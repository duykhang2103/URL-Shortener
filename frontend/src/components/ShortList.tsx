import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext, useEffect } from "react";
import ShortDisplay from "./ShortDisplay";
import { UrlsContext } from "@/contexts/UrlsContext";

export function ShortList() {
  const { urls } = useContext(UrlsContext);
  useEffect(() => {
    console.log(urls);
  }, [urls]);
  return (
    <Table className="w-full">
      <TableCaption>A list of your recent invoices.</TableCaption>
      {/* <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {urls.map((url) => (
          <ShortDisplay key={url._id} url={url} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={3}>Total</TableCell> */}
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
