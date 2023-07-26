import moment from "moment";

export const convertConnectionDate = (date: string) => {
  const connectionDate = moment(date);
  const currentDate = moment();

  const minutesDiff = Math.abs(connectionDate.diff(currentDate, "minutes"));

  if (minutesDiff < 60) {
    return `${minutesDiff}분 전`;
  }

  const hourDiff = Math.abs(connectionDate.diff(currentDate, "hours"));

  if (hourDiff < 24) {
    return `${hourDiff}시간 전`;
  }

  const dayDiff = Math.abs(connectionDate.diff(currentDate, "days"));

  return `${dayDiff}일 전`;
};
