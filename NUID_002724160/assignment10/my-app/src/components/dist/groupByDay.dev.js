"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function groupByDay(data) {
  var daysOfWeek = _toConsumableArray(Array(7)).map(function () {
    return [];
  });

  data.forEach(function (day) {
    var date = new Date(day.dt_txt);
    var dayOfWeek = date.getDay();
    daysOfWeek[dayOfWeek].push({
      dt_txt: day.dt_txt,
      temp_max: day.main.temp_max || 0,
      temp_min: day.main.temp_min || 0,
      weather: day.weather
    });
  });
  return daysOfWeek;
}

var _default = groupByDay;
exports["default"] = _default;