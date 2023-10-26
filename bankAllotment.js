
// Isaiah Cooper
// 10/19/2023
// Program imports a csv as a multidimensional array, and compares it to a hardcoded list of categorized keywords
// Then outputs costs associated with those keywords. 

//copied code for importing file
const fs = require("fs");
const readline = require("readline");
//read stream that uses local example.csv title 
const stream = fs.createReadStream("./example.csv");
const reader = readline.createInterface({input: stream});

//establish variables
// data is an array for holding incoming csv
let data = [];

//making an object that acts like a dictionary, it should have a string, an array of arrays
var referenceDict = {dataShopping : [["AMAZON", 0], ["AMZN", 0], ["KLARNA", 0], ["AFTERPAY", 0], ["MICHAELS", 0],
["TARGET", 0], ["NAVY", 0], ["BARNES", 0], ["ATOMIC", 0], ["WALMART", 0], ["STAPLES", 0], ["NOOM", 0],
["TIC TAC", 0], ["DUKE CARD", 0], ["VENDING", 0]],
dataSubs: [["NETFLIX", 0], ["WATER",0], ["WUNC",0], ["NYTIMES",0], ["DISNEY",0], ["APPLE",0], ["PEACOCK",0],["AUDIBLE",0],["SPOTIFY",0]],
dataLiving: [["DUKEENERGY", 0], ["ATT", 0], ["ENERGY", 0], ["BRANCH", 0],["MORTG", 0],["ROCK",0]],
dataGas: [["BP",0], ["SHELL",0], ["EXXON",0], ["CIRCLE K",0], ["REFUEL",0]],
dataBigDance: [["BARRE",0],["NINTH STREET DANCE",0]],
dataLilDance: [["ENCORE",0],["GOLDFISH",0]],
dataFood: [["PANERA",0], ["FUQUA",0], ["CHICK-FIL-A",0], ["WHOLEFDS",0], ["HACIENDA",0], ["TOKYO",0], ["FOOD",0], ["LOCOPOPS",0], ["ENZOS",0],
["POKEWORKS",0],["SALADELIA",0],["MCDONALDS",0],["STARBUCKS",0],["DINING",0],["FREDDY",0],["TANDOORI",0],["EARLY BIRD",0],["HARRIS",0], 
["COSTCO", 0],["FIRST WATCH",0],["DOORDASH",0],["Q SHA",0],["WEGMANS",0],["DRAGON INN",0],["MONUTS",0]]
}

// proceeding vars are for sorting respective spending
var shopping = 0;
//let dataShopping = ["AMAZON", "AMZN", "KLARNA", "AFTERPAY", "MICHAELS", "TARGET", "NAVY", "BARNES", "ATOMIC",
//"WALMART", "STAPLES", "NOOM", "TIC TAC", "DUKE CARD", "VENDING"];
var subs = 0;
//let dataSubs = ["NETFLIX", "WATER","WUNC", "NYTIMES", "DISNEY", "APPLE", "PEACOCK","AUDIBLE","SPOTIFY"];
var food = 0;
let dataFood = ["PANERA", "FUQUA", "CHICK-FIL-A", "WHOLEFDS", "HACIENDA", "TOKYO", "FOOD", "LOCOPOPS", "ENZOS", 
"POKEWORKS","SALADELIA","MCDONALDS","STARBUCKS", "DINING","FREDDY", "TANDOORI", "EARLY BIRD", "HARRIS", "COSTCO", 
"FIRST WATCH", "DOORDASH", "Q SHA", "WEGMANS", "DRAGON INN", "MONUTS" ];
var other = 0;
//let dataLiving = ["DUKEENERGY", "ATT","ENERGY","BRANCH","MORTG","ROCK"];
var living = 0;
//let dataGas = ["BP", "SHELL", "EXXON", "CIRCLE K", "REFUEL" ];
var gas = 0;
//let dataBigDance = ["BARRE", "NINTH STREET DANCE"];
var bigDance = 0;
//let dataLilDance = ["ENCORE","GOLDFISH"];
var lilDance = 0;
let dataTami = ["VENMO"];
var tami = 0;

var income = 0;

reader. on("line", row => {
    // this is splitter
    data.push(row.split(","));
});

// when reader finishes a csv
reader.on("close", () => {
    // next line was to see if data was being populated
    //console.log(data);

    // for loop through data adding values to respective spending variables 
    for (let n = 1; n < data.length;n++){
        // making "working" variables to hold numbers so we don't get false truthies
        let workingShopping = 0;
        let workingSubs = 0;
        let workingFood = 0;
        let workingLiving = 0;
        let workingBigDance = 0;
        let workingLilDance = 0;
        let workingTami = 0;
        let workingGas = 0;
        
        //using falsy logic to function through datasets looking for matches, ideally sorted by size of the data set to reduce time, 
        // IE dataFood is the largest and broadest category, to save from everthing filtering through it before moving onto dataShopping
        // or dataDance I'm placing it towards the end. Gas is below it because gas containts BP which I think may accidentally trigger 
        // things more than BP gas 
        if((workingShopping = (iterateDataSets(data[n][2], data[n][3],referenceDict.dataShopping)))||
        (workingSubs = (iterateDataSets(data[n][2], data[n][3],referenceDict.dataSubs)))||
        (workingLiving = (iterateDataSets(data[n][2], data[n][3],dataLiving)))||
        (workingLilDance = (iterateDataSets(data[n][2], data[n][3],dataLilDance)))||
        (workingBigDance = (iterateDataSets(data[n][2], data[n][3],dataBigDance)))||
        (workingTami = (iterateDataSets(data[n][2], data[n][3],dataTami)))||
        (workingFood = (iterateDataSets(data[n][2], data[n][3],dataFood)))||
        (workingGas = (iterateDataSets(data[n][2], data[n][3],dataGas))))
        {
            //if it finds something truthy in the logic before it runs through them adds all results from working
            // ideally I'd like to only trigger whichever returned, still working on how to do that
            shopping += parseInt(workingShopping);
            subs += parseInt(workingSubs);
            living += parseInt(workingLiving);
            lilDance += parseInt(workingLilDance);
            bigDance += parseInt(workingBigDance);
            food += parseInt(workingFood);
            tami += parseInt(workingTami);
            gas += parseInt(workingGas);
        }
        // if data[n][3] is not undefined add it to other section
        else if (data[n][3])
        {other += parseInt(data[n][3])}
        // if data[n][3] is undefined it's a deposit
        // added != this to filter out transfers from looking like income
        else if (data[n][2]!="Transfer from Shares")
        {income += parseInt(data[n][4])};
               
    }
    var totalExpenses = 0;
    // output variable counts
    console.log("------------------");
    console.log("Shopping = " + shopping);
    totalExpenses += shopping;
    console.log("Subscriptions = " +subs);
    totalExpenses += subs;
    console.log("Food = " +food);
    totalExpenses += food;
    console.log("Living Expenses = " +living);
    totalExpenses += living;
    console.log("Adult Dance = " +bigDance);
    totalExpenses += bigDance;
    console.log("Child Dance = " +lilDance);
    totalExpenses += lilDance;
    console.log("Gas = " +gas);
    totalExpenses += gas;
    console.log("Tami = " +tami);
    totalExpenses += tami;
    console.log("Other = " +other);
    totalExpenses += other;
    console.log("Income = " + income);
    console.log("Expenditure = " +totalExpenses)
    console.log("Profit = " + (income - (shopping + subs + food + living + bigDance + lilDance + other)))


    var output = document.getElementById("output");
    var text = document.createTextNode("------------------");
    output.appendChild(text);
    console.log("Shopping = " + shopping);
    totalExpenses += shopping;
    console.log("Subscriptions = " +subs);
    totalExpenses += subs;
    console.log("Food = " +food);
    totalExpenses += food;
    console.log("Living Expenses = " +living);
    totalExpenses += living;
    console.log("Adult Dance = " +bigDance);
    totalExpenses += bigDance;
    console.log("Child Dance = " +lilDance);
    totalExpenses += lilDance;
    console.log("Gas = " +gas);
    totalExpenses += gas;
    console.log("Tami = " +tami);
    totalExpenses += tami;
    console.log("Other = " +other);
    totalExpenses += other;
    console.log("Income = " + income);
    console.log("Expenditure = " +totalExpenses)
    console.log("Profit = " + (income - (shopping + subs + food + living + bigDance + lilDance + other)))
});
//this function accepts the description and price from the imported csv via array,
// and compares it against a provided dataset. Then returns either undefined if it had no match
// or an the cost of the described item
function iterateDataSets(dataActivelySearching, dataActivelyCost, dataSet) {
    let spendingVar = 0;
    for (let x = 0; x < dataSet.length;x++)
    {
        //console.log(dataActivelySearching,dataActivelyCost, dataSet);
        if (dataActivelySearching.includes(dataSet[x][0])){
            //next line is just for testing and can be removed later on
            console.log(dataSet[x] + " : " + dataActivelyCost)
            dataSet[x][1] = dataActivelyCost;
            spendingVar += parseInt(dataActivelyCost);
            return spendingVar;
        }     
    }
    return spendingVar;
}

function iterateDictionary(dataSearching, dataCost, dataSetII) {

}
