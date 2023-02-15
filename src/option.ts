import {
  BarSeriesOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts/types/dist/echarts";
import { data } from "./data";
import tooltipFormatter from "./utils";
import monthList from "./utils/monthList";
import names from "./utils/names";
import { sumInByMonth, sumOutByMonth } from "./utils/sum";

type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | XAXisComponentOption
  | YAXisComponentOption
  | GridComponentOption
>;

const title: TitleComponentOption = {
  padding: 16,
  left: 22,
  text: "Программы в проектах и вне программ",
  textStyle: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 16,
    color: "#002033",
  },
  subtext:
    "Сумма и процентное соотношение проектов, находящихся в программах и вне программ",
  subtextStyle: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#00203399",
  },
  itemGap: 8,
};

const legend: LegendComponentOption = {
  orient: "horizontal",
  bottom: 0,
  data: [
    {
      name: names.IN_IT,
      icon: "circle",
    },
    {
      name: names.IN_CP,
      icon: "circle",
    },
    {
      name: names.OUT_IT,
      icon: "circle",
    },
    {
      name: names.OUT_CP,
      icon: "circle",
    },
  ],
};

export const series: BarSeriesOption[] = [
  {
    name: names.IN_IT,
    data: data.filter((el) => el.name === names.IN_IT).map((el) => el.value),
    stack: "in",
    itemStyle: {
      color: "#56b9f2",
    },
  },
  {
    name: names.IN_CP,
    data: data.filter((el) => el.name === names.IN_CP).map((el) => el.value),
    stack: "in",
    label: {
      show: true,
      position: "outside",
      fontWeight: "bold",
      formatter: (params) => {
        return sumInByMonth(params.name).toString();
      },
    },
    itemStyle: {
      color: "#0077d1",
    },
  },
  {
    name: names.OUT_IT,
    data: data.filter((el) => el.name === names.OUT_IT).map((el) => el.value),
    stack: "out",
    itemStyle: {
      color: "#22c38d",
    },
  },
  {
    name: names.OUT_CP,
    label: {
      show: true,
      position: "outside",
      fontWeight: "bold",
      formatter: (params) => {
        return sumOutByMonth(params.name).toString();
      },
    },

    data: data.filter((el) => el.name === names.OUT_CP).map((el) => el.value),
    stack: "out",
    itemStyle: {
      color: "#00734c",
    },
  },
];

const option: ECOption = {
  title,
  grid: {
    top: 112,
    width: 650,
    height: 370,
  },
  legend,
  tooltip: {
    trigger: "axis",
    padding: 10,
    formatter: tooltipFormatter,
  },
  xAxis: { type: "category", data: monthList },
  yAxis: {},
  series: series.map((item, index) =>
    Object.assign(item, {
      type: "bar",
    })
  ),
};

export default option;
