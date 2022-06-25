import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import { useState, createContext } from "react";

export const NavbarContext = createContext(null);

const Layout = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ open, setOpen }}>
      <Navbar />
      <Box
        
        className="bg-grey-100 px-5 pb-5 h-full w-full"
        sx={{
          minHeight: "calc(100vh)",
          marginLeft: open ? 25 : 0,
        }}
      >
        {props.children}
      </Box>
    </NavbarContext.Provider>
  );
};

export default Layout;
