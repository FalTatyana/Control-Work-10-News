import type { PropsWithChildren } from "react";
import Header from "../Header/Header";
import Box from "@mui/material/Box";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Header />
      </Box>
      <Box>{children}</Box>
    </>
  );
};

export default Layout;
