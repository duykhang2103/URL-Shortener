import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { UrlsContextProvider } from "./contexts/UrlsContext";
import Password from "./components/Password";
export default function App() {
  return (
    <UrlsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:code" element={<Password />} />
        </Routes>
      </BrowserRouter>
    </UrlsContextProvider>
  );
}
