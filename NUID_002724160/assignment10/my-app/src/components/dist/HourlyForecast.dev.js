"use strict";

var _reactRouterDom = require("react-router-dom");

var _Forecast = require("./Forecast");

function HourlyForecast() {
  var _useParams = (0, _reactRouterDom.useParams)(),
      nameOfDay = _useParams.nameOfDay;

  var dataByDay = (0, _Forecast.groupByDay)(weatherData.list);
  console.log(weatherData.list);
}