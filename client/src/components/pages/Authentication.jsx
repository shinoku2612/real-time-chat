import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { hasLoading } from "../../store/selectors";
import ProcessBar from "../ui/loading/ProcessBar";

const Authentication = () => {
  const isLoading = useSelector(hasLoading);
  return (
    <>
      <ProcessBar isShow={isLoading} />
      <div className=" flex items-center w-full h-screen relative  bg-[url('../assets/img/cool-background.svg')] overflow-hidden justify-center bg-no-repeat bg-right-top bg-cover">
        <div className="w-full h-full bg-gradient-to-tr from-[#545454b3] to-[#1c1c1c24]">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Authentication;
