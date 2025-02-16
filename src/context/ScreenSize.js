import { createContext, useEffect, useState } from "react";

export const Screen = createContext({});

export default function ScreenProvider({ children }) {
  const [size, setSize] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 768 ? setSize(true) : setSize(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Screen.Provider value={{ size, setSize }}>{children}</Screen.Provider>
  );
}
