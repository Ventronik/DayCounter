
//The selected date on the page. Either inputed by the user, or defaults to today
let datePicker = document.getElementById('datePicker')
localStorage.getItem('datePicked') ? datePicker.value = JSON.parse(localStorage.getItem('datePicked')) : datePicker.valueAsDate = new Date();

let daySelected = moment.utc(datePicker.valueAsDate)
const locale = "en-us"

// Isolated Days, Months, and Years
let day = daySelected.format('DD');
let weekNum = daySelected.week();
// console.log(weekNum)
let monthNum = daySelected.format('MM');
let month = daySelected.format('MMMM')
let year = daySelected.year();
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


function dateObj() {
  let date = moment.utc(datePicker.valueAsDate)
  let dateSelectedFromMonthStart = moment.utc(date).startOf('month')

  let endOfCalendar = dateSelectedFromMonthStart.clone().add(12, 'months').endOf('month')
  console.log(dateSelectedFromMonthStart)

  let calendarDayLength = endOfCalendar.diff(date, 'days')
  let result = {}
  result[year] = {}
  result[year][monthNum] = {
    name: month
  }
  result[year][monthNum][weekNum] = {}
  result[year][monthNum][weekNum][dateSelectedFromMonthStart.format('DD')] = {
    dayName: dateSelectedFromMonthStart.format('dddd'),
    count: (parseInt(dateSelectedFromMonthStart.format('DD')) - parseInt(date.format('DD')))
    // businessDayCount:
  }

  let counter = 0
  for (let i = 0; i < calendarDayLength; i++) {
    let working = dateSelectedFromMonthStart.add(1, 'days')
    let dayCog = working.format('DD');
    let weekCog = working.weeks()
    let monthCog = working.format('MM')
    let monthCogName = working.format('MMMM')
    let yearCog = working.year();
    let yearList = Object.entries(result)
    let dayOfWeek = working.format('dddd')

    if (!result.hasOwnProperty(yearCog)) result[yearCog] = {}

    if (!result[yearCog].hasOwnProperty(monthCog)) {
      result[yearCog][monthCog] = {
        name: monthCogName
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
  }
  return result
}
console.log(dateObj())

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

  // console.log(plusThirty)

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

// Date Object. Organized as  {Year: {Month:{Date:}}} Where the info in Date will be several key value pairs

// Build the calendars by cloning elements and populating the data
function CalendarBuilder() {
  let toDelete = document.querySelectorAll('.toDelete') || []

  for (let deleted = 0; deleted < toDelete.length; deleted++) {

    toDelete[deleted].parentElement.removeChild(toDelete[deleted])
  }

  let monthBox = document.querySelector('.monthBox')
  let weekRow = document.querySelector('.weekRow')
  let dayBox = document.querySelector('.dayBox')
  let dateObjCycler = dateObj()
  // console.log(dateObjCycler)
  let parent = document.querySelector('.container')
  let titleRow = document.querySelector('.titleRow')
  let titleBox = document.querySelector('.titleBox')
  let blankBox = document.querySelector('.blankBox')
  let blankBuilder = blankBox.cloneNode(true)


  // Pick out the years
  for (let years in dateObjCycler) {
    // Pick out the months, and order them properly
    let monthArr = Object.keys(dateObjCycler[years]).sort()

    // cycle through the months and build a new calendar month for each
    for (let months of monthArr) {
      let theFirstIsA = dateObjCycler[years][months]['01']['dayName']

      //clone the month
      let newBox = monthBox.cloneNode(true)
      newBox.classList.remove('hidden')
      newBox.classList.add('toDelete')
      // add month title and insert weeks
      let weekInsert = newBox.querySelector('.insertRows')
      let monthText = newBox.firstElementChild.firstElementChild
      monthText.innerHTML = '<h1>' + moment(months, 'MM').format('MMMM') + '</h1>'
      let yearText = newBox.firstElementChild.children[1]
      yearText.innerHTML = '<h1>' + years + '</h1>'
      //Put month at the bottom of the page
      parent.appendChild(newBox)

      //the week object we will be cloning
      let newWeekRow = newBox.querySelector('.weekRow')

      // build the titleRow
      for (let title of daysOfTheWeek) {
        let newTitle = titleBox.cloneNode(true)
        newTitle.innerHTML = title.slice(0, 3)
        newTitle.classList.remove('hidden')
        newBox.querySelector('.titleRow').appendChild(newTitle)
      }
      // build the weeks of the month

      //build the blank boxes at the beginning of the month
      for (let blankMaker = 0; blankMaker < daysOfTheWeek.indexOf(theFirstIsA); blankMaker++) {

        let blankBuilder = blankBox.cloneNode(true)

        blankBuilder.classList.remove('hidden')
        newWeekRow.appendChild(blankBuilder)
      }

      //build days that aren't blank, and subsequent weekDays
      let dayArr = Object.keys(dateObjCycler[years][months]).sort()
      if (dayArr.length > 27) {
        for (let contentMaker of dayArr) {
          // console.log(dateObjCycler[years][months])
          let dayInQuestion = dateObjCycler[years][months][contentMaker].dayName
          let contentBox = document.querySelector('.fillBox')
          let contentBuilder = contentBox.cloneNode('true')
          let calendarContent = contentBuilder.querySelector('.calendarDate')
          let countContent = contentBuilder.querySelector('.dayDisplay')
          calendarContent.innerHTML = contentMaker
          countContent.innerHTML = dateObjCycler[years][months][contentMaker].count
          contentBuilder.classList.remove('hidden')
          if (countContent.innerHTML % 15 === 0) {
            contentBuilder.classList.add('yellow')
          }
          if (countContent.innerHTML % 30 === 0) {
            contentBuilder.classList.add('blue')
          }
          if (countContent.innerHTML == 0) {
            contentBuilder.classList.add('green')
          }

          if (dayInQuestion && dayInQuestion === daysOfTheWeek[0]) {

            let nextWeekRow = weekRow.cloneNode(true)
            nextWeekRow.appendChild(contentBuilder)
            weekInsert.appendChild(newWeekRow)
            weekInsert.appendChild(nextWeekRow)
            newWeekRow = nextWeekRow
          } else {
            if (contentMaker === 'name') {
              let contentBoxesSoFar = newWeekRow.children
              for (let soFar = contentBoxesSoFar.length; soFar < 9; soFar++) {
                let newBlankBuilder = blankBox.cloneNode(true)

                newBlankBuilder.classList.remove('hidden')
                newWeekRow.appendChild(newBlankBuilder.cloneNode(true))

              }
            } else {
              newWeekRow.appendChild(contentBuilder)
            }
          }
        }
      } else {
        let last = parent.children[parent.children.length - 1]
        last.parentElement.removeChild(last)

      }
    }
  }
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
