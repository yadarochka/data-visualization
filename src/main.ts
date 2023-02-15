import option from "./option";
import * as echarts from "echarts";
import { legendChangedOption } from "./legendChangedOption";

const main = document.getElementById("main");

if (main) {
  const myChart = echarts.init(main);
  myChart.setOption(option);

  myChart.on("legendselectchanged", function (params) {
    const selectedSeries = params.selected;
    myChart.setOption(legendChangedOption(selectedSeries));
  });
}
