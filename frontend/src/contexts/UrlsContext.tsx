import { IUrl } from "@/lib/interfaces";
import { createContext, useState } from "react";

export interface IUrlsContext {
  urls: IUrl[];
  setUrls: React.Dispatch<React.SetStateAction<IUrl[]>>;
  // getUrls: () => void;
}

export const UrlsContext = createContext<IUrlsContext>({
  urls: [],
  setUrls: () => {},
  // getUrls: () => {},
});

export function UrlsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const getUrls = async () => {
  //   try {
  //     // const response = await axios.get(`${SERVER_URL}/urls`);
  //     // setUrls(response.data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  const [urls, setUrls] = useState<IUrl[]>([]);
  return (
    <UrlsContext.Provider
      value={{
        urls,
        setUrls,
      }}
    >
      {children}
    </UrlsContext.Provider>
  );
}
