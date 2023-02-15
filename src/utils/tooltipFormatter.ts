import names from "./names";

function tooltipFormatter(params) {
  console.log(params);
  const month =
    params[0].name || params[1].name || params[2].name || params[3].name;

  const inIt = params.find((el) => el.seriesName === names.IN_IT);
  const inCp = params.find((el) => el.seriesName === names.IN_CP);
  const outIt = params.find((el) => el.seriesName === names.OUT_IT);
  const outCp = params.find((el) => el.seriesName === names.OUT_CP);

  const sumIt = (inIt ? inIt.value : 0) + (inCp ? inCp.value : 0);
  const sumOut = (outIt ? outIt.value : 0) + (outCp ? outCp.value : 0);
  const sumAll = sumIt + sumOut;

  const inProcent = Math.floor((sumIt / sumAll) * 100) + "%";
  const outProcent = Math.floor((sumOut / sumAll) * 100) + "%";

  return `
            <b>${month}</b>
            <br>
            <b>В программе ${inProcent} | ${sumIt} шт.</b>
            <br>
            ${
              inIt
                ? inIt.marker +
                  " Проекты ИТ \t" +
                  "<b>" +
                  inIt.value +
                  "шт." +
                  "</b>" +
                  "<br>"
                : ""
            }
            ${
              inCp
                ? inCp.marker +
                  " Проекты ЦП " +
                  "<b>" +
                  inCp.value +
                  "шт." +
                  "</b>" +
                  "<br>"
                : ""
            }
            <b>Вне программ ${outProcent} | ${sumOut} шт.</b>
            <br>
            ${
              outIt
                ? outIt.marker +
                  " Проекты ИТ " +
                  "<b>" +
                  outIt.value +
                  "шт." +
                  "</b>" +
                  "<br>"
                : ""
            }
            ${
              outCp
                ? outCp.marker +
                  " Проекты ЦП " +
                  "<b>" +
                  outCp.value +
                  "шт." +
                  "</b>"
                : ""
            }
          `;
}

export default tooltipFormatter;
