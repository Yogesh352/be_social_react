import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import { useState, createContext } from "react";

export const NavbarContext = createContext(null);

const Layout = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ open, setOpen }}>
      <Box>
        <Box>
          <Navbar />
        </Box>
        <Box
          className="bg-gray-50 px-5 pb-5"
          sx={{
            minHeight: "calc(100vh)",
            marginLeft: open ? 35: 10
          }}
        >
          {props.children}
        </Box>
      </Box>
    </NavbarContext.Provider>
  );
};

export default Layout;
