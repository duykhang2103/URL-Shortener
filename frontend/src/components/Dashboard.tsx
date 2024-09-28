import { IUrl } from "@/lib/interfaces";
import { ShortList } from "./ShortList";
import { UrlForm } from "./UrlForm";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/lib/const";
import { UrlsContext } from "@/contexts/UrlsContext";

export default function Dashboard() {
  // const [urls, setUrls] = useState<Url[]>([]);
  const { urls, setUrls } = useContext(UrlsContext);
  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${SERVER_URL}/urls`, values);
    } catch (error) {
      console.error(error);
    }
  };

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
    <div>
      <UrlForm
      // handleSubmit={handleSubmit}
      />
      <ShortList />
    </div>
  );
}
