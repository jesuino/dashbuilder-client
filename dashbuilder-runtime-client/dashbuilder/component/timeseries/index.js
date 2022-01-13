const chartContainer = echarts.init(document.getElementById("main"));

option = {
  tooltip: {
    trigger: "axis",
    position: function (pt) {
      return [pt[0], "10%"];
    },
  },
  title: {
    left: "center",
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    },
  },
  xAxis: {
    type: "time",
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
  },
  dataZoom: [],
  series: [],
};

// Display the chart using the configuration items and data just specified.
chartContainer.setOption(option);

const validate = (columns) => {
  if (
    columns.length < 3 ||
    columns[0].type !== "LABEL" || // series
    columns[1].type !== "NUMBER" || // time
    columns[2].type !== "NUMBER" // value
  ) {
    return "You must provide at least 3 columns container the series (LABEL), timestamp (NUMBER) and the value (NUMBER)";
  }
};

const datasetToSeries = (dataset) => {
  const seriesMap = new Map();
  for (var i = 0; i < dataset.data.length; i++) {
    const row = dataset.data[i];

    const serieName = row[0];
    var data = seriesMap.get(serieName);

    if (!data) {
      data = [];
    }

    data.push([+row[1], +row[2]]);
    seriesMap.set(serieName, data);
  }

  const series = [];
  seriesMap.forEach((v, k) => {
    series.push({
      name: k,
      type: "line",
      smooth: false,
      symbol: "none",
      areaStyle: {},
      data: v,
    });
  });

  return series;
};

const fillProperties = (props) => {
  let option = {
    title: {
      left: props.get("title_align") || "center",
      text: props.get("title") || "",
    },
  };

  if (props.get("zoom") === "true") {
    option.dataZoom = [
      {
        type: "inside",
      },
      {
        start: 0,
        end: 20,
      },
    ];
  } else {
    option.dataZoom = [];
  }

  return option;
};

window.addEventListener("message", (e) => {
  const props = e.data.properties;
  const dataset = props ? props.get("dataSet") : null;

  if (props) {
    const option = fillProperties(props);
    chartContainer.setOption(option);
  }

  if (dataset) {
    const validation = validate(dataset.columns);
    if (validation) {
    } else {
      chartContainer.setOption({ series: datasetToSeries(dataset) });
    }
  }
});
