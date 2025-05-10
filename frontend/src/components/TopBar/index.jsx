import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  let title = "";

  if (location.pathname.startsWith("/users/")) {
    const userId = location.pathname.split("/")[2];
    const user = models.userModel(userId);
    if (user) {
      title = `${user.first_name} ${user.last_name}`;
    }
  } else if (location.pathname.startsWith("/photos/")) {
    const userId = location.pathname.split("/")[2];
    const user = models.userModel(userId);
    if (user) {
      title = `Photos of ${user.first_name} ${user.last_name}`;
    }
  } else if (location.pathname === "/users") {
    title = "User List";
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          Bùi Quang Anh
        </Typography>
        <Typography variant="h6" color="inherit" style={{ marginLeft: "auto" }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
