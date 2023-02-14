import { option } from "./option";
import * as echarts from "echarts";

const main = document.getElementById("main");

if (main) {
  const myChart = echarts.init(main);
  myChart.setOption(option);
}
