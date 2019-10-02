# Time and Weather Displayer

![GitHub Actions](https://github.com/minaz912/weather/workflows/Node%20CI/badge.svg)

## Description

A node script that utilizes the OpenWeatherMap API to display weather conditions (and local time) given a list of city/zip code queries (passed as comma-delimited command-line args).

## Steps to run

- Clone the repo
- Run `npm i`
- Get an API key from [here](https://openweathermap.org/appid). **Important Note: your key might take about an hour (maybe more) to be activated. You may get "401 api key invalid" responses if you try to use it before then**
- Pass your key as `OWM_APPID` environment variable when running the script.
  Example: `OWM_APPID=<your_key_here> npm start -- cairo, london, new york, 10005`, or run `npm run build` then `OWM_APPID=<your_key_here> node build/index.js cairo, london, new york, 10005`
- Profit

## Run the tests

- Run `npm test`
