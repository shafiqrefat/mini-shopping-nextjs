import React from "react";
import HeaderIndex from "./header";
import FooterIndex from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderIndex />
      <main>{children}</main>
      {/* <FooterIndex /> */}
    </>
  );
};

export default Layout;
