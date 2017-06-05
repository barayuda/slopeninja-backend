import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
} from '../util';

const initialWeather = {
  status: null,
  weatherIcon: null,
  temprature: null,
  baseCondition: null,
  newSnow: null,
  snowDepthBase: null,
  snowDepthSummit: null,

};

const parseHomewood = async ($) => {
  const temprature = $('#current_temp_hi').text().trim();
  //24 Hours
  const newSnow24Hr = $('#current_snow_conditions table tr td').slice(4,5).text().trim();
  //Base
  const snowDepthBase = $('#current_snow_conditions table tr td').slice(1,2).text().trim();

  const snowDepthSummit = $('#current_snow_conditions table tr td').slice(2,3).text().trim();
  return {
    ...initialWeather,
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const fetchHomewood = async (html) => {
  const $ = cheerio.load(html)

  const weather = await parseHomewood($);

  return {
    weather,
  };
}
