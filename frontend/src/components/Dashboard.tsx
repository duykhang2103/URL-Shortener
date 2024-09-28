import { ShortList } from "./ShortList";
import { UrlForm } from "./UrlForm";
import { useContext, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/lib/const";
import { UrlsContext } from "@/contexts/UrlsContext";

export default function Dashboard() {
  const { setUrls } = useContext(UrlsContext);

  const getUrls = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/urls`);
      setUrls(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(SERVER_URL);
    getUrls();
  }, []);
  return (
    <div className="w-3/4 m-auto flex flex-col items-center space-y-5">
      <UrlForm />
      <ShortList />
    </div>
  );
}
