import moment from "moment";

export const convertDateTime = (value: Date) => {
  return moment(value).format("DD/MM/YYYY hh:mmA");
};
