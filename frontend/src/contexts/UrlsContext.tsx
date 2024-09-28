import { Toaster } from "@/components/ui/toaster";
import { IUrl } from "@/lib/interfaces";
import { createContext, useState } from "react";

export interface IUrlsContext {
  urls: IUrl[];
  setUrls: React.Dispatch<React.SetStateAction<IUrl[]>>;
}

export const UrlsContext = createContext<IUrlsContext>({
  urls: [],
  setUrls: () => {},
});

export function UrlsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [urls, setUrls] = useState<IUrl[]>([]);
  return (
    <UrlsContext.Provider
      value={{
        urls,
        setUrls,
      }}
    >
      {children}
      <Toaster />
    </UrlsContext.Provider>
  );
}
