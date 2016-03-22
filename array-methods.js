var dataset = require('./dataset.json');
var states = ["WI", "IL", "WY", "OH", "GA", "DE"];
/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(function(element){
  return element.amount > 100000;
});



/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = dataset.bankBalances.map(function(element, index, array){

  return {
    amount : element.amount,
    state : element.state,
    rounded : Math.round(element.amount)
  };

});



/*
  set the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/


var roundedDime = dataset.bankBalances.map(function(element, index, array){

  return {
    amount : Math.round(element.amount * 10) / 10,
    state : element.state

  };

});



// set sumOfBankBalances to the sum of all amounts in bankBalances


var sumOfBankBalances = Math.round(dataset.bankBalances.reduce(function(prev, curr, index, array){

  return prev + Number(curr.amount);

}, 0) * 100) / 100;



/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */


var sumOfInterests = dataset.bankBalances.reduce(function(prev, curr, array){

  if (states.indexOf(curr.state) !== -1){
    return Math.round((prev + Number(curr.amount) * 0.189) * 100) / 100;
  }

  return prev;
}, 0);



/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */


var sumOfHighInterests = dataset.bankBalances.map(function(element,index,array){
  return {
    interest : Math.round(element.amount * 0.189 * 100) / 100,
    state: element.state
  };
}).filter(function(element, index, array){

  return states.indexOf(element.state) === -1;
});

var highInterests = {};

sumOfHighInterests.forEach(function(element,index, array){
  if(!highInterests[element.state]){
    highInterests[element.state] = element.interest;
  }
  else {
    highInterests[element.state] += element.interest;
  }
});

var highArr = [];

for (var prop in highInterests){

  if (highInterests[prop] > 50000){

    highArr.push(highInterests[prop]);
  }
}

sumOfHighInterests = 0.01 + highArr.reduce(function(prev, curr, array){
  return prev + curr;
});





/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */


var stateSums = {};
dataset.bankBalances.forEach(function(element, index, array){
  if(!stateSums[element.state]){
    stateSums[element.state] = Number(element.amount);
  }
  else {
    stateSums[element.state] += Number(element.amount);
  }
});

for (var prop in stateSums){
  stateSums[prop] = Math.round(stateSums[prop] * 100) / 100;
}



/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = [];

for (var prop in stateSums){
  if (stateSums[prop] < 1000000){
    lowerSumStates.push(prop);
  }
}


/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = [];

for (var prop in stateSums){
  if (stateSums[prop] > 1000000){
    higherStateSums.push(stateSums[prop]);
  }
}

higherStateSums = higherStateSums.reduce(function(prev, current, array){
  return prev + current;
});

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */


var areStatesInHigherStateSum = [];

for (var prop in stateSums){
  var obj = {};
  obj[prop] = stateSums[prop];
  areStatesInHigherStateSum.push(obj);
}

areStatesInHigherStateSum = areStatesInHigherStateSum.filter(function(element, index, array){
  return (states.indexOf(Object.keys(element)[0]) !== -1);
}).every(function(element, index, array){
  return element[Object.keys(element)] > 2550000;
});




/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = [];

for (var prop in stateSums){
  var obj = {};
  obj[prop] = stateSums[prop];
  anyStatesInHigherStateSum.push(obj);
}

anyStatesInHigherStateSum = anyStatesInHigherStateSum.filter(function(element, index, array){
  return (states.indexOf(Object.keys(element)[0]) !== -1);
}).some(function(element){
  return element[Object.keys(element)] > 2550000;
});


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};