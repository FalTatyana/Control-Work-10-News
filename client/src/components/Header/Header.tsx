import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";



const Header = () => {
  return (
  <>
        <AppBar position="static" sx={{backgroundColor: "#263238"}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chat
            </Typography>
          </Toolbar>
        </AppBar>

  </>
  )
}

export default Header;