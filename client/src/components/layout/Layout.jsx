import React from "react";
import ProcessBar from "../ui/loading/ProcessBar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { hasLoading } from "../../store/selectors";
import Header from "./header/Header";

const Layout = () => {
  const isLoading = useSelector(hasLoading);
  return (
    <div>
      <ProcessBar isShow={isLoading} />
      <Header />
      <main className="mt-[70px] py-[10px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
