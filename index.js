
let datePicker = document.getElementById('datePicker');
localStorage.getItem('datePicked') ? datePicker.value = JSON.parse(localStorage.getItem('datePicked')) : datePicker.valueAsDate = new Date();

let daySelected = moment.utc(datePicker.valueAsDate);
const locale = "en-us";

// Isolated Days, Months, and Years
let day = daySelected.format('DD');
let weekNum = daySelected.week();
let monthNum = daySelected.format('MM');
let month = daySelected.format('MMMM');
let year = daySelected.year();

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function dateObj() {
  let date = moment.utc(datePicker.valueAsDate);
  let dateSelectedFromMonthStart = moment.utc(date).startOf('month');

  let endOfCalendar = dateSelectedFromMonthStart.clone().add(12, 'months').endOf('month');

  let calendarDayLength = endOfCalendar.diff(date, 'days');
  let result = {};

  let counter = 0;
  let working = dateSelectedFromMonthStart.clone();
  for (let i = 0; i < calendarDayLength; i++) {
    let dayCog = working.format('DD');
    let weekCog = working.format('ww');
    let monthCog = working.format('MM');
    let yearCog = working.year();
    let dayOfWeek = working.format('dddd');

    if (!result.hasOwnProperty(yearCog)) result[yearCog] = {}

    if (!result[yearCog].hasOwnProperty(monthCog)) {
      result[yearCog][monthCog] = {
        //name: monthCogName
      }
    }

    if (!result[yearCog][monthCog].hasOwnProperty(weekCog)) result[yearCog][monthCog][weekCog] = {}

    if (!result[yearCog][monthCog][weekCog].hasOwnProperty(dayCog)) {
      result[yearCog][monthCog][weekCog][dayCog] = {
        dayName: dayOfWeek
      }
    }
    if (working > date) {
      counter++
      result[yearCog][monthCog][weekCog][dayCog]['count'] = counter
    } else {
      result[yearCog][monthCog][weekCog][dayCog]['count'] = ((parseInt(working.format('DD')) - parseInt(date.format('DD'))))
    }
    working = working.add(1, 'days')
  }
  return result
}

function topFill() {

  let plusThirty = daySelected.clone().add(30, 'days').format()
  let plusSixty = daySelected.clone().add(60, 'days').format()
  let plusNinety = daySelected.clone().add(90, 'days').format()

  // Pushing the current date to the BIGBOX
  document.querySelector('#thisMonth').innerHTML = month;
  document.querySelector('#thisDay').innerHTML = day;
  document.querySelector('#thisYear').innerHTML = year;

  // Pushing the set days to the NARROWBOX
  let thirtyDay = document.querySelector('.thirtyDay')
  let thirtyMonth = document.querySelector('.thirtyMonth')
  let thirtyYear = document.querySelector('.thirtyYear')

  thirtyDay.innerHTML = moment.utc(plusThirty).format('DD')
  thirtyMonth.innerHTML = moment.utc(plusThirty).format('MMMM')
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
  let yearTitle = document.querySelector('.yearTitle')
  yearTitle.innerHTML = year
}
topFill()

function deletePreviousCalendar() {
  let toDelete = document.querySelectorAll('.toDelete') || []

  for (let deleted = 0; deleted < toDelete.length; deleted++) {

    toDelete[deleted].parentElement.removeChild(toDelete[deleted])
  }
}

function htmlBuilder(months, years) {
  //clone the month
  let parent = document.querySelector('.container')
  let monthBox = document.querySelector('.monthBox')
  let newBox = monthBox.cloneNode(true)
  newBox.classList.remove('hidden')
  newBox.classList.add('toDelete')
  parent.appendChild(newBox)
}

function titles(newBox, months, years) {
  // build the titleRow
  let titleRow = document.querySelector('.titleRow')
  let titleBox = document.querySelector('.titleBox')
  for (let title of daysOfTheWeek) {
    let newTitle = titleBox.cloneNode(true)
    newTitle.innerHTML = title.slice(0, 3)
    newTitle.classList.remove('hidden')
    newBox.querySelector('.titleRow').appendChild(newTitle)
  }





  //this could be its own functions seperate from above.
  let monthText = newBox.firstElementChild.firstElementChild
  let yearText = newBox.firstElementChild.children[1]
  monthText.innerHTML = '<h1>' + moment(months, 'MM').format('MMMM') + '</h1>'
  yearText.innerHTML = '<h1>' + years + '</h1>'
}

function theFirstIs(workingDate) {
  if (workingDate['01']) {
    let theFirstIsA = workingDate['01']['dayName']
    return theFirstIsA
  }
}

function blankBuilder(theFirstIsA, newBox) {
  //build the blank boxes at the beginning of the month
  let blankBox = document.querySelector('.blankBox')
  let newWeekRow = newBox.querySelector('.weekRow')

  for (let blankMaker = 0; blankMaker < daysOfTheWeek.indexOf(theFirstIsA); blankMaker++) {
    let blankBuild = blankBox.cloneNode(true)
    blankBuild.classList.remove('hidden')
    newWeekRow.appendChild(blankBuild)
  }
}

function dayBuilder(workingDate, newBox) {
  //build days that aren't blank, and subsequent weekDays
  let newWeekRow = newBox.querySelector('.weekRow')
  // console.log(workingDate)
  let dayArr = Object.keys(workingDate).sort()
  for (let thisDay of dayArr) {

    let dayInQuestion = workingDate[thisDay].dayName
    let contentBox = document.querySelector('.fillBox')
    let contentBuilder = contentBox.cloneNode('true')
    let calendarContent = contentBuilder.querySelector('.calendarDate')
    let countContent = contentBuilder.querySelector('.dayDisplay')
    calendarContent.innerHTML = thisDay
    countContent.innerHTML = workingDate[thisDay].count
    //HIDDEN COULD BE A FUNCTION
    contentBuilder.classList.remove('hidden')
    //COULD BE A FUNCTION
    if (countContent.innerHTML % 15 === 0) {
      contentBuilder.classList.add('yellow')
    }
    if (countContent.innerHTML % 30 === 0) {
      contentBuilder.classList.add('blue')
    }
    if (countContent.innerHTML == 0) {
      contentBuilder.classList.add('green')
    }
    //THIS COULD BE ITS OWN FUNCTION
    //If Sunday make a new row

    let weekInsert = newBox.querySelector('.insertRows')
    let weekRow = document.querySelector('.weekRow')
    let nextWeekRow = weekRow.cloneNode(true)
    let blankBox = document.querySelector('.blankBox')
    if (dayInQuestion === daysOfTheWeek[0] && dayArr.length < 7 && dayInQuestion === workingDate[dayArr[dayArr.length-1]].dayName && dayArr[dayArr.length - 1] > 27){
      nextWeekRow.appendChild(contentBuilder)
      weekInsert.appendChild(nextWeekRow)
      newWeekRow = nextWeekRow
      newWeekRow.appendChild(contentBuilder)
      let daysMadeInLastWeek = newWeekRow.children
      for (let soFar = daysMadeInLastWeek.length; soFar < 9; soFar++) {
        let newBlankBuilder = blankBox.cloneNode(true)
        newBlankBuilder.classList.remove('hidden')
        newWeekRow.appendChild(newBlankBuilder.cloneNode(true))
      }
    } else if(dayInQuestion === daysOfTheWeek[0]) {
      nextWeekRow.appendChild(contentBuilder)
      weekInsert.appendChild(nextWeekRow)
      newWeekRow = nextWeekRow
    } else if (dayArr.length < 7 && dayInQuestion === workingDate[dayArr[dayArr.length-1]].dayName && dayArr[dayArr.length - 1] > 27) {
        newWeekRow.appendChild(contentBuilder)
        let daysMadeInLastWeek = newWeekRow.children
        for (let soFar = daysMadeInLastWeek.length; soFar < 9; soFar++) {
          let newBlankBuilder = blankBox.cloneNode(true)
          newBlankBuilder.classList.remove('hidden')
          newWeekRow.appendChild(newBlankBuilder.cloneNode(true))
      }
    } else {
        newWeekRow.appendChild(contentBuilder)
    }
  }
}

function removeIncompleteMonth () {
  let parent = document.querySelector('.container')
  let last = parent.children[parent.children.length - 1]
  last.parentElement.removeChild(last)
}












// Build the calendars by cloning elements and populating the data
function CalendarBuilder() {
  deletePreviousCalendar()

  let dateObjCycler = dateObj()


  // Pick out the years
  for (let years in dateObjCycler) {
    // Pick out the months, and order them properly
    let monthArr = Object.keys(dateObjCycler[years]).sort()
    // cycle through the months and build a new calendar month for each
    for (let months of monthArr) {

      htmlBuilder(months, years)
      const newBox = document.querySelector('.container').lastElementChild;
      titles(newBox, months, years)

      let weekArr = Object.keys(dateObjCycler[years][months]).sort()
      if(weekArr[0] === '01' && weekArr[weekArr.length-1] > 50) {
        let yearEndWeekAdjustment = weekArr.shift()
        weekArr.push(yearEndWeekAdjustment)
      }
      for(let weeks of weekArr) {

        const workingDate = dateObjCycler[years][months][weeks]

        let theFirst = theFirstIs(workingDate)

        // build the weeks of the month
        blankBuilder(theFirst, newBox)
        dayBuilder(workingDate, newBox)
      }
    }
  }
  removeIncompleteMonth ()
}
CalendarBuilder()










function reset() {

  let replacementDate = new Date();
  datePicker.valueAsDate = replacementDate
  date = moment.utc(datePicker.valueAsDate)
  daySelected = date.clone()
  localStorage.removeItem('datePicked')

  let day = daySelected.format('DD');
  let monthNum = daySelected.format('MM');
  let month = daySelected.format('MMMM')
  let year = daySelected.year();
  let plusThirty = daySelected.clone().add(30, 'days').format()
  let plusSixty = daySelected.clone().add(60, 'days').format()
  let plusNinety = daySelected.clone().add(90, 'days').format()
  topFill()
  CalendarBuilder()
}

//start of update function
document.getElementById('datePicker').addEventListener('change', () => {

  date = moment.utc(datePicker.valueAsDate)
  daySelected = moment.utc(date.clone())
  localStorage.setItem('datePicked', JSON.stringify(moment(date).format('YYYY-MM-DD')))
  // console.log('brand new',moment.utc(daySelected.add(30,'days ')).format('ddd'))

  day = daySelected.format('DD');
  monthNum = daySelected.format('MM');
  month = daySelected.format('MMMM')
  year = daySelected.year();

  plusThirty = daySelected.clone().add(30, 'days').format()
  plusSixty = daySelected.clone().add(60, 'days').format()
  plusNinety = daySelected.clone().add(90, 'days').format()

  topFill()

  CalendarBuilder()

})
