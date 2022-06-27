import { useState } from "react";
import Link from "next/link";

import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

import { auth, db } from "../../authentication/firebase";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";

import { AccountIcon, NotificationIcon } from "../Icons/index";
const Authorisation = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutClick = () => {
    setAuth(false);
  };

  const loginClick = () => {
    setAuth(true);
    handleClose();
  };

  return (
    <>
      {auth ? (
        <div>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link href="/profile">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <Link href="/login">
              <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
            </Link>
          </Menu>
        </div>
      ) : null}
    </>
  );
};

export default Authorisation;
