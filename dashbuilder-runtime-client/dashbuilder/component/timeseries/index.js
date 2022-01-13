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

const setPropertyOnObject = (prop, value, obj) => {
  if (!prop || !value) {
    return obj;
  }
  const props = prop.split(".");
  let parent = obj;
  for (let i = 0; i < props.length; i++) {
    let name = props[i];
    if (i === props.length - 1) {
      parent[name] = value;
    } else {
      parent[name] = parent[name] || {};
      parent = parent[name];
    }
  }
  return obj;
};

const fillProperties = (props) => {
  var option = {};
  const optionStr = props.get("option");
  if (optionStr) {
    try {
      option = JSON.parse(optionStr);
    } catch (e) {
      console.log('Not able to parse option property')
      option = {};
    }
    props.delete("option");
  }
  props.forEach((value, key) => {
    if (key !== "dataSet") {
      setPropertyOnObject(key, value, option);
    }
  });
  console.debug(option);
  return option;
};

window.addEventListener("message", (e) => {
  const props = e.data.properties;
  const dataset = props ? props.get("dataSet") : null;
  if (props) {
    const option = fillProperties(props);
    if (option) {
      chartContainer.setOption(option);
    }
  }
  if (dataset) {
    const validation = validate(dataset.columns);
    if (validation) {
        // TODO: Handle validation
    } else {
      chartContainer.setOption({ series: datasetToSeries(dataset) });
    }
  }

});
