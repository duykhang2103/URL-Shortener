import Dashboard from "./components/Dashboard";
import { UrlsContextProvider } from "./contexts/UrlsContext";

export default function App() {
  return (
    <>
      <UrlsContextProvider>
        <Dashboard />
      </UrlsContextProvider>
    </>
  );
}
