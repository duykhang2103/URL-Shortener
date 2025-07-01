import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { UrlsContextProvider } from "./contexts/UrlsContext";
import Password from "./components/Password";
import { Toaster } from "./components/ui/toaster";
export default function App() {
  return (
    <UrlsContextProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:code" element={<Password />} />
        </Routes>
      </BrowserRouter>
    </UrlsContextProvider>
  );
}
