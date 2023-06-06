import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar sx={{ minHeight: 20 }}>
        <Container maxWidth="lg">
          <Typography align="center" variant="subtitle2" className="Footer">
            &copy; 2023 Management Site
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
