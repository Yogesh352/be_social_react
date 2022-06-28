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
        className="bg-grey-300 py- px-10 justify-center h-full w-full overflow-hidden"
        sx={{
          height: "91vh",
          width: "100%",
          mx: open ? 25 : 0,
        }}
      >
        {props.children}
      </Box>
    </NavbarContext.Provider>
  );
};

export default Layout;
