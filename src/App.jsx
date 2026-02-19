import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ReactLenis root>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ReactLenis>
    </BrowserRouter>
  );
}
export default App;
