import useUI from "../../hooks/useUI";
import BiographyItem from "./BiographyItem";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const BiographyList = ({ dob, slogan, joinAt }) => {
  const { sizeWindow } = useUI();
  const sx = { fontSize: sizeWindow === "sm" ? 18 : 25 };

  const fmtDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  return (
    <ul className="mt-6 sm:mt-2 w-full h-max">
      <BiographyItem
        icon={<CelebrationOutlinedIcon sx={sx} />}
        title="Birth day"
        description={fmtDate(dob)}
      />
      <BiographyItem
        icon={<CreateOutlinedIcon sx={sx} />}
        title="Slogan"
        description={slogan}
      />
      <BiographyItem
        icon={<CalendarMonthOutlinedIcon sx={sx} />}
        title="Join at"
        description={fmtDate(joinAt)}
      />
    </ul>
  );
};

export default BiographyList;
