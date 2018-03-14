// Today Items:

// required format for moment.js that suits program purpose: 2013-02-08  # A calendar date part

let datePicker = document.getElementById('datePicker')
datePicker.valueAsDate = new Date();

let date = moment.utc(datePicker.valueAsDate)
let daySelected = date.clone()
// let daySelectedFormatted = daySelected.format();


console.log(date)

// Isolated Days, Months, and Years
let locale = "en-us"
let day = daySelected.format('DD');
let monthNum = daySelected.format('MM');
let month = daySelected.format('MMMM')
let year = daySelected.year();
// console.log(month)


// Days set X days from now:
let plusThirty = daySelected.add(30, 'days').format()
let plusSixty = daySelected.add(30, 'days').format()
let plusNinety = daySelected.add(30, 'days').format()

// Pushing the current date to the BIGBOX
document.querySelector('#thisMonth').innerHTML = month;
document.querySelector('#thisDay').innerHTML = day;
document.querySelector('#thisYear').innerHTML = year;

// Pushing the set days to the NARROWBOX
let thirtyDay = document.querySelector('.thirtyDay')
thirtyDay.innerHTML = moment.utc(plusThirty).format('DD')
let thirtyMonth = document.querySelector('.thirtyMonth')
thirtyMonth.innerHTML = moment.utc(plusThirty).format('MMMM')
let thirtyYear = document.querySelector('.thirtyYear')
thirtyYear.innerHTML = moment.utc(plusThirty).format('YYYY')

let sixtyDay = document.querySelector('.sixtyDay')
sixtyDay.innerHTML = moment.utc(plusSixty).format('DD')
let sixtyMonth = document.querySelector('.sixtyMonth')
sixtyMonth.innerHTML = moment.utc(plusSixty).format('MMMM')
let sixtyYear = document.querySelector('.sixtyYear')
sixtyYear.innerHTML = moment.utc(plusSixty).format('YYYY')

let ninetyDay = document.querySelector('.ninetyDay')
ninetyDay.innerHTML = moment.utc(plusNinety).format('DD')
let ninetyMonth = document.querySelector('.ninetyMonth')
ninetyMonth.innerHTML = moment.utc(plusNinety).format('MMMM')
let ninetyYear = document.querySelector('.ninetyYear')
ninetyYear.innerHTML = moment.utc(plusNinety).format('YYYY')

let monthTitle = document.querySelector('.monthTitle')
monthTitle.innerHTML = month




// Date Object. Organized as  {Year: {Month:{Date:}}} Where the info in Date will be several key value pairs
function dateObj() {

  let dateSelectedFromMonthStart = moment.utc(date).startOf('month')
  let result = {}
    result[year] = {}
    result[year][monthNum] = {}
    result[year][monthNum][dateSelectedFromMonthStart.format('DD')] = {dayName: dateSelectedFromMonthStart.format('dddd'), count: (parseInt(dateSelectedFromMonthStart.format('DD')) - parseInt(date.format('DD'))) }
  // console.log(result)
  let counter = 0
  // FOR LATER: see if we can swap 366 for something else.
  for(let i = 0; i < 366; i++) {

    let working = dateSelectedFromMonthStart.add(1,'days')
    let dayCog = working.format('DD');
    let monthCog = working.format('MM')
    let monthCogName = working.format('MMMM')
    let yearCog = working.year();
    let yearList = Object.entries(result)
    let dayOfWeek = working.format('dddd')
    // console.log(dayCog)

    // let dayList = Object.entries(result[yearCog][monthCog])

    if(!result.hasOwnProperty(yearCog)) {
      result[yearCog] = {}
    }

    if(!result[yearCog].hasOwnProperty(monthCog)) {
      result[yearCog][monthCog] = {name: monthCogName}

    }

    if(!result[yearCog][monthCog].hasOwnProperty(dayCog)) {
      result[yearCog][monthCog][dayCog] = {dayName: dayOfWeek}
    }

    if(working > date) {
      counter++
      result[yearCog][monthCog][dayCog]['count'] =  counter
    } else {
      result[yearCog][monthCog][dayCog]['count'] =  ((parseInt(working.format('DD')) - parseInt(date.format('DD'))))
    }
  }
  console.log(result)
  return result
}

dateObj()


// Build the calendars by cloning elements and populating the data
function CalendarBuilder() {

}

CalendarBuilder




















// Lower Calendar fill
function calendarFill(date) {
  let dayResult = []
  let monthResult = []
  let yearResult = []

  // Take the year from current date, and d+365, make 2 empty objects
  // Fill the empty objects with empty month objects
  // fill empty month objects with empty day objects
  // fill empty day objects with key value pairs
  // key value pairs: date, count from current, day of the week, holiday
  //
  //
  //
  //
  //


  for (let i = 0; i < 366; i++) {
    let dd = date.add(1, 'days').format('DD')
    let mm = date.add(1, 'days').format('MMMM')
    let yy = ''
    dayResult.push(dd)
    if (monthResult.indexOf(mm) === -1) {
      monthResult.push(mm)
    }
  }
  return monthResult
}

// console.log(calendarFill(date))









//start of super function
document.getElementById('datePicker').addEventListener('change', () => {
  let workingDate = moment.utc(document.getElementById('datePicker').valueAsDate);

  day = workingDate.format('DD');
  monthNum = workingDate.month() + 1;
  month = workingDate.format('MMMM')
  year = workingDate.year();

  plusThirty = workingDate.add(30, 'days').format()
  plusSixty = workingDate.add(30, 'days').format()
  plusNinety = workingDate.add(30, 'days').format()

  document.querySelector('#thisMonth').innerHTML = month;
  document.querySelector('#thisDay').innerHTML = day;
  document.querySelector('#thisYear').innerHTML = year;

  thirtyDay.innerHTML = moment.utc(plusThirty).format('DD')
  thirtyMonth.innerHTML = moment.utc(plusThirty).format('MMMM')
  thirtyYear.innerHTML = moment.utc(plusThirty).format('YYYY')

  sixtyDay.innerHTML = moment.utc(plusSixty).format('DD')
  sixtyMonth.innerHTML = moment.utc(plusSixty).format('MMMM')
  sixtyYear.innerHTML = moment.utc(plusSixty).format('YYYY')

  ninetyDay.innerHTML = moment.utc(plusNinety).format('DD')
  ninetyMonth.innerHTML = moment.utc(plusNinety).format('MMMM')
  thirtyYear.innerHTML = moment.utc(plusNinety).format('YYYY')

  console.log(day)
  // }
}) //end of super function
