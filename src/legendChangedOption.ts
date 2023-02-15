import { data } from "./data";
import names from "./utils/names";
import { sumByName, sumInByMonth, sumOutByMonth } from "./utils/sum";

type SelectedSeries = {
  [names.IN_CP]: boolean;
  [names.IN_IT]: boolean;
  [names.OUT_CP]: boolean;
  [names.OUT_IT]: boolean;
};

export const legendChangedOption = (selectedSeries: SelectedSeries) => {
  return {
    series: [
      {
        name: names.IN_IT,
        data: data
          .filter((el) => el.name === names.IN_IT)
          .map((el) => el.value),
        stack: "in",
        label: {
          show: !selectedSeries[names.IN_CP],
          fontWeight: "bold",
          position: "outside",
          formatter: (params: { name: string; seriesName: names }) => {
            return sumByName(params.name, params.seriesName).toString();
          },
        },
        itemStyle: {
          color: "#56b9f2",
        },
      },
      {
        name: names.IN_CP,
        data: data
          .filter((el) => el.name === names.IN_CP)
          .map((el) => el.value),
        stack: "in",
        label: {
          show: true,
          fontWeight: "bold",
          position: "outside",
          formatter: (params: { name: string; seriesName: names }) => {
            if (selectedSeries[names.IN_CP] && selectedSeries[names.IN_IT]) {
              return sumInByMonth(params.name);
            }
            return sumByName(params.name, params.seriesName).toString();
          },
        },
        itemStyle: {
          color: "#0077d1",
        },
      },
      {
        name: names.OUT_IT,
        data: data
          .filter((el) => el.name === names.OUT_IT)
          .map((el) => el.value),
        stack: "out",
        label: {
          fontWeight: "bold",
          show: !selectedSeries[names.OUT_CP],
          position: "outside",
          formatter: (params: { name: string; seriesName: names }) => {
            return sumByName(params.name, params.seriesName).toString();
          },
        },
        itemStyle: {
          color: "#22c38d",
        },
      },
      {
        name: names.OUT_CP,
        label: {
          show: true,
          fontWeight: "bold",
          position: "outside",
          formatter: (params: { name: string; seriesName: names }) => {
            if (selectedSeries[names.OUT_CP] && selectedSeries[names.OUT_IT]) {
              return sumOutByMonth(params.name);
            }
            return sumByName(params.name, params.seriesName).toString();
          },
        },

        data: data
          .filter((el) => el.name === names.OUT_CP)
          .map((el) => el.value),
        stack: "out",
        itemStyle: {
          color: "#00734c",
        },
      },
    ],
  };
};
