# Simple-node-weather-app
## Description
Simple console weather app using node.js and Open Weather Map API

## Usage
Provide an API KEY in the api.json file. You can get one by registering on https://openweathermap.org/

To run it type

```
node app.js [enter city or zip code here]
```

All arguments are joined together so you are able to type a city name that contains a space character

```
node app.js Los Angeles
```

## Additional comments
By default, if you provide just zip code it searches in the United States. You can be more precise and provide country by adding comma and ISO 3166 country code.

```
node app.js tarnow,pl
node app.js 33-100,pl
```
