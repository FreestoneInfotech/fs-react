import Faker from 'faker';
import {system_enums} from '../../data/demo/demo_data';
var faker = Faker;

// Shorthand function to get a random number between min and max
let fr = (min,max) => faker.random.number({min:min, max:max});

let getRandomDateValArr = function(count){
    let arr = [...new Array(count)].map( (_, i) => [ faker.date.recent(30 /*30 days*/).getTime(), fr(0,1) ]);

    arr.sort(function (a, b) {
      if (a[0] > b[0]) { return 1; }
      if (a[0] < b[0]) { return -1; }
      return 0;
    });
    return arr;
}

let stackedData = [{
    "key": "Allowed",
    "values": getRandomDateValArr(100),
    "color": '#ff7f0e'
  },

  {
    "key": "Denied",
    "values": getRandomDateValArr(100)
  }

]

let locationGraphData = system_enums.hacker_code.map( (alert, i) => {
        return {
            "key" : alert,
            "values": system_enums.locations.map((loc,i) => [loc, fr(20,50)]),
        }
});

let pieChartData = system_enums.hacker_code.map( (alert, i) => {
    return {
        label : alert,
        value : fr(20,50),
    }
});

let getLastThirtyDaysData = function(){
    var start = Date.now();
    var days = 30;
    var dates = []
    for(var i=0; i<days; i++)
        dates.push([new Date(start - (i * 1000 * 60 * 60 * 24)).getTime(), fr(20,50)]);

    return dates;
}

let lastThirtyDaysData = [
  {
    "key": "Low",
    "values": getLastThirtyDaysData(),
    "color" : '#3182bd'
    },
  {
    "key": "Medium",
    "values": getLastThirtyDaysData(),
    "color" : '#ff7f0e'
  },
    {
    "key": "High",
    "values": getLastThirtyDaysData(),
    "color" : '#d62728'
  }
]

console.log(pieChartData);
export {locationGraphData, stackedData, pieChartData, lastThirtyDaysData}
