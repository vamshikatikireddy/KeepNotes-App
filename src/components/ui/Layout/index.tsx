import React from "react";
import Navbar from "../Navbar";

interface props {
  title: string;
  children: React.ReactNode;
}

export function Layout({ title, children }: props) {
  return <Navbar title={title}>{children}</Navbar>;
}
