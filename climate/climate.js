var carbonemissions = [
  {year: 1990, co2: 5121.1794396362200},
  {year: 1991, co2: 5071.563914129350},
  {year: 1992, co2: 5174.670600727450},
  {year: 1993, co2: 5281.386608386350},
  {year: 1994, co2: 5375.033803130700},
  {year: 1995, co2: 5436.697985645710},
  {year: 1996, co2: 5625.041884958040},
  {year: 1997, co2: 5701.920919441470},
  {year: 1998, co2: 5749.8930563288700},
  {year: 1999, co2: 5829.519951154610},
  {year: 2000, co2: 5997.298912247080},
  {year: 2001, co2: 5899.855484554800},
  {year: 2002, co2: 5942.421409609990},
  {year: 2003, co2: 5991.190934561650},
  {year: 2004, co2: 6105.444109771080},
  {year: 2005, co2: 6130.552416529040},
  {year: 2006, co2: 6050.3846037128900},
  {year: 2007, co2: 6127.8882211166200},
  {year: 2008, co2: 5928.256328994960},
  {year: 2009, co2: 5493.547908151850},
  {year: 2010, co2: 5700.108336541930},
  {year: 2011, co2: 5572.584775486280},
  {year: 2012, co2: 5371.777170152370},
  {year: 2013, co2: 5522.908365433170},
  {year: 2014, co2: 5572.106312157080},
  {year: 2015, co2: 5422.965677347360},
  {year: 2016, co2: 5306.66245700516},
  {year: 2017, co2: 5270.74852543583},
  {year: 2018, co2: 5269},
  {year: 2019, co2: 5260}
];


var CURRENT_YEAR_CO2_ESTIMATIONS = 5300;
var US_POPULATION = 327200000;
var MILION = 1000000;
var MS_PER_YEAR = 31557600000;
var TAX_AMOUNT = 71;
var START_YEAR = 1990;


function TotalEmissionsFromYear(year) {
  var untilNow = carbonemissions.filter(function(emissions) {
        return year <= emissions.year;
      })
  .map(obj => obj.co2)
  .reduce((total, current) => total + current, 0) * MILION;

  var now = new Date();
  var yearStart = new Date();
  yearStart.setMonth(0, 1);
  yearStart.setHours(0, 0, 0, 0);
  var diff = now.getTime() - yearStart.getTime();
  return untilNow + CURRENT_YEAR_CO2_ESTIMATIONS * MILION * (diff / MS_PER_YEAR);
};


function TaxGatherSinceYear(taxAmount, year) {
  return TotalEmissionsFromYear(year) * taxAmount;
};


function TaxPerPersonSinceYear(taxAmount, year) {
  return TaxGatherSinceYear(taxAmount, year) / US_POPULATION;
};


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function recalculate() {
  $("#totalEmissions").text(numberWithCommas(TotalEmissionsFromYear(START_YEAR).toFixed(3)));
  $("#totalTax").text(numberWithCommas(TaxGatherSinceYear(TAX_AMOUNT, START_YEAR).toFixed(3)));
  $("#profit").text(numberWithCommas(TaxPerPersonSinceYear(TAX_AMOUNT, START_YEAR).toFixed(3)));
};


$("#yearSelect").change(function() {
  START_YEAR = parseInt($("#yearSelect").val());
});


$("#taxSelect").change(function() {
  TAX_AMOUNT = parseInt($("#taxSelect").val());
});


// Run every half a second
var intervalID = window.setInterval(recalculate, 100);
