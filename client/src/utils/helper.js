export const formatDate = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

const check = (input) => input.current.isValid;
export const checkInputIsValid = (...args) => args.every(check);

export const fmtFromFileReader = (src) =>
  src.replace(/(data:image\/.+;base64,)/, "");

export const convertImageToBase64 = (imgFile, loadHandler) => {
  var reader = new FileReader();
  reader.onload = loadHandler;
  reader.readAsDataURL(imgFile); // --> when onload finish, we receive base64 code string
};

const format2Digit = (time) => ("0" + time).slice(-2);

const getDayAndMonth = (date) =>
  `${format2Digit(date.getDate())}/${format2Digit(date.getMonth() + 1)}`;

const getFullDate = (date) => {
  const year = date.getFullYear();

  return `${getDayAndMonth(date)}/${year}`;
};

const getFullTime = (date) => {
  const splitDate = date.toLocaleTimeString().split(" ");
  const timeWithHourAndMinute = splitDate[0].split(":").slice(0, 2).join(":");

  return `${timeWithHourAndMinute} ${splitDate[1]}`;
};

const timeObj = {
  month: 2_592_000,
  week: 648_000,
  day: 86_400,
  hour: 3_600,
  minute: 60,
};

export const formatTime = (time) => {
  const date = new Date(time);
  const diffDay = (Date.now() - date.getTime()) / 1000;
  return diffDay < timeObj.minute
    ? "just now"
    : diffDay < timeObj.hour
    ? getRemainTime(diffDay)(timeObj.minute) + "m"
    : diffDay < timeObj.day
    ? getFullTime(date)
    : diffDay < timeObj.month * 12
    ? getDayAndMonth(date)
    : getFullDate(date);
};

const getRemainTime = (timestamp) => (num) => Math.round(timestamp / num);

export const getOfflineTime = (timestamp) => {
  if (!timestamp) return;
  timestamp = (new Date().getTime() - timestamp) / 1000;

  const iGetRemainTime = getRemainTime(timestamp);

  return timestamp < timeObj.minute
    ? "just now"
    : timestamp < timeObj.hour
    ? iGetRemainTime(timeObj.minute) + "m"
    : timestamp < timeObj.day
    ? iGetRemainTime(timeObj.hour) + "h"
    : timestamp < timeObj.week
    ? iGetRemainTime(timeObj.day) + "d"
    : timestamp < timeObj.month
    ? iGetRemainTime(timeObj.week) + "w"
    : timestamp < timeObj.month * 12
    ? getDayAndMonth(new Date(timestamp * 1000))
    : getFullDate(new Date(timestamp * 1000));
};
