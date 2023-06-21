import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Badge, Container, Grid, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { styled } from "@mui/system";
import { useRouter as UseRouter } from "next/router";
import Navbar from "./navbar";
import SideDrawer from "./sideDrawer";
import NxtImage from "../../controls/nxtImage";
import logo2 from "../../images/logo2.jpg";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header = () => {
  const router = UseRouter();

  const navLinks = [
    { title: "Home", path: `/`, label: "home" },
    { title: "Contact", path: `/contactus`, label: "contact" },
    {
      title: "ChangePassword",
      path: `changePassword`,
      label: "ChangePassword",
    },
  ];

  return (
    <>
      <Container>
        <Grid container className="navbarContent">
          <Grid item xs={2}>
            <NxtImage src={logo2} width="180" height="80" />
          </Grid>
          <Grid item xs={10} sx={{ alignContent: "flex-start", pt: 4, pr: 0 }}>
            <Stack spacing={2} direction="row" sx={{ justifyContent: `right` }}>
              <Badge>
                <FacebookIcon className="navbarIcons" />
              </Badge>
              <Badge>
                <TwitterIcon className="navbarIcons" />
              </Badge>
              <Badge>
                <LinkedInIcon className="navbarIcons" />
              </Badge>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <AppBar position="relative" sx={{ height: "50px" }}>
        <Toolbar variant="dense">
          <Container
            maxWidth="xl"
            // sx={{ display: `flex`, justifyContent: `left` }}
            sx={{ display: `flex`, marginLeft: "10%" }}
          >
            <Navbar navLinks={navLinks} />
          </Container>
          <SideDrawer navLinks={navLinks} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
