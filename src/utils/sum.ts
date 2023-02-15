import { data } from "../data";
import names from "./names";

export const sumInByMonth = (month: string) => {
  return data
    .filter(
      (el) =>
        el.period === month &&
        (el.name === names.IN_CP || el.name === names.IN_IT)
    )
    .map((el) => el.value)
    .reduce((acc, next) => acc + next);
};

export const sumOutByMonth = (month: string) => {
  return data
    .filter(
      (el) =>
        el.period === month &&
        (el.name === names.OUT_CP || el.name === names.OUT_IT)
    )
    .map((el) => el.value)
    .reduce((acc, next) => acc + next);
};

export const sumByName = (month: string, name: names) => {
  return data
    .filter((el) => el.period === month && el.name === name)
    .map((el) => el.value)
    .reduce((acc, next) => acc + next);
};
