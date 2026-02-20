import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ReactLenis>
  );
}

export default App;
