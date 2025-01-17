const jerry = require ("lodash")

let holidays = [
    {name: "Christmas", date: new Date("2025-12-25")},
    {name: "Canada Day", date: new Date("2025-07-01")},
    {name: "April Fools", date: new Date("2025-04-01")},
]

let today = new Date()
holidays.forEach(x => {
    let dateDifference = x.date - today;

    console.log(Math.ceil(dateDifference/(1000 * 60 * 60 * 24)))
})

console.log(jerry.sample(holidays))

console.log(jerry.findIndex(holidays, {name: "April Fools"}))