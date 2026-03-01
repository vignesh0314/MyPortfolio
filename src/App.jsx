import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/AnimatedBackground";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen key="loader" onComplete={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Portfolio fades in after loader exits */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <AnimatedBackground />
        <Navbar />
        <Home />
      </div>
    </>
  );
}
