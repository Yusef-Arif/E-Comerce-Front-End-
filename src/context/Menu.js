import { createContext, useState } from "react";

export const MenuContext = createContext({});

export default function ToggleProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MenuContext.Provider>
  );
}
