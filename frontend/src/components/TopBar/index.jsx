import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchTitle = async () => {
      if (location.pathname.startsWith("/users/")) {
        const userId = location.pathname.split("/")[2];
        try {
          const user = await fetchModel(`/api/user/${userId}`);
          if (isMounted && user) {
            setTitle(`${user.first_name} ${user.last_name}`);
          }
        } catch {
          if (isMounted) setTitle("");
        }
      } else if (location.pathname.startsWith("/photos/")) {
        const userId = location.pathname.split("/")[2];
        try {
          const user = await fetchModel(`/api/user/${userId}`);
          if (isMounted && user) {
            setTitle(`Photos of ${user.first_name} ${user.last_name}`);
          }
        } catch {
          if (isMounted) setTitle("");
        }
      } else if (location.pathname === "/users") {
        setTitle("User List");
      } else {
        setTitle("");
      }
    };
    fetchTitle();
    return () => { isMounted = false; };
  }, [location]);

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
