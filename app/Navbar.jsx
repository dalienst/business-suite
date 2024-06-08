"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import {
  AutoAwesome,
  AutoAwesomeMotion,
  DashboardRounded,
  Money,
  Wallet,
} from "@mui/icons-material";
import Image from "next/image";

function Navbar() {
  const { data: session } = useSession();

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navLinks = [
    {
      id: 1,
      name: "Dashboard",
      path: "/suite/dashboard",
      icon: <DashboardRounded />,
    },
    {
      id: 2,
      name: "Clients",
      path: "/suite/clients",
      icon: <PeopleIcon />,
    },
    {
      id: 3,
      name: "Contracts",
      path: "/suite/contacts",
      icon: <AutoAwesomeMotion />,
    },
    {
      id: 4,
      name: "Payments",
      path: "/suite/payments",
      icon: <Wallet />,
    },
    {
      id: 5,
      name: "Settings",
      path: "/suite/settings",
      icon: <SettingsIcon />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {navLinks?.map((link) => (
          <ListItem disablePadding key={link?.id}>
            <ListItemButton component="a" href={link?.path}>
              <ListItemIcon>{link?.icon}</ListItemIcon>
              <ListItemText primary={link?.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {!isSmUp && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Business Suite
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            {session?.user?.avatar ? (
              <>
                <Image
                  src={person?.avatar}
                  alt="logo"
                  width={40}
                  height={40}
                  unoptimized
                  priority={true}
                />
              </>
            ) : (
              <>
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                  priority={true}
                />
              </>
            )}
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
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <AccountCircle />
              Account
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
              <Logout />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isSmUp ? "permanent" : "temporary"}
          open={isSmUp || mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default Navbar;
