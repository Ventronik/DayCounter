// Today Items:

// required format for moment.js that suits program purpose: 2013-02-08  # A calendar date part
console.log('this', JSON.parse(localStorage.getItem('datePicked')))
let datePicker = document.getElementById('datePicker')

JSON.parse(localStorage.getItem('datePicked')) ? datePicker.value = JSON.parse(localStorage.getItem('datePicked')): datePicker.valueAsDate = new Date();

let date = moment.utc(datePicker.valueAsDate)
console.log(datePicker.valueAsDate)
let daySelected = date.clone()

// console.log(moment(date).isHoliday())


// Isolated Days, Months, and Years
let locale = "en-us"
let day = daySelected.format('DD');
let monthNum = daySelected.format('MM');
let month = daySelected.format('MMMM')
let year = daySelected.year();
let daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

// Days set X days from now:
// function sunOrHol (hat) {
//   let day = hat.add(30, 'days').format('ddd')
//   let ifHol= moment(hat).isHoliday()
//   console.log(ifHol, hat)
//   if(day === 'Sun') {
//     console.log('!!!')
//   }
//   if (moment(hat).isHoliday()) {
//     console.log('???')
//   }
// }
// sunOrHol(daySelected)

let plusThirty = daySelected.clone().add(30, 'days').format()
let plusSixty = daySelected.clone().add(60, 'days').format()
let plusNinety = daySelected.clone().add(90, 'days').format()


function topFill() {
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
function dateObj() {

  let dateSelectedFromMonthStart = moment.utc(date).startOf('month')
  // console.log(date + " " + dateSelectedFromMonthStart)
  let result = {}
    result[year] = {}
    result[year][monthNum] = {name: month}
    result[year][monthNum][dateSelectedFromMonthStart.format('DD')] = {
      dayName: dateSelectedFromMonthStart.format('dddd'),
      count: (parseInt(dateSelectedFromMonthStart.format('DD')) - parseInt(date.format('DD'))) }
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
  return result
}
// dateObj()





// Build the calendars by cloning elements and populating the data
function CalendarBuilder() {
  let toDelete = document.querySelectorAll('.toDelete') || []

  for( let deleted = 0; deleted < toDelete.length; deleted++ ) {

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
  for(let years in dateObjCycler) {
    // Pick out the months, and order them properly
    let monthArr = Object.keys(dateObjCycler[years]).sort()

    // cycle through the months and build a new calendar month for each
    for(let months of monthArr) {
      // console.log(dateObjCycler[years][months]['01'])
      let theFirstIsA = dateObjCycler[years][months]['01']['dayName']
      // console.log(theFirstIsA + ' ' + JSON.stringify(dateObjCycler[years][months]['01']) + ' ' + months)
        //clone the month
      let newBox = monthBox.cloneNode(true)
      newBox.classList.remove('hidden')
      newBox.classList.add('toDelete')
      let weekInsert = newBox.querySelector('.insertRows')

      let monthText = newBox.firstElementChild.firstElementChild
      monthText.innerHTML = '<h1>'+moment(months, 'MM').format('MMMM')+'</h1>'

      let yearText = newBox.firstElementChild.children[1]
      yearText.innerHTML = '<h1>'+years+'</h1>'
      //Put month at the bottom of the page
      parent.appendChild(newBox)



      //the week object we will be cloning
      let newWeekRow = newBox.querySelector('.weekRow')

      // build the titleRow
      for(let title of daysOfTheWeek) {
        let newTitle = titleBox.cloneNode(true)
        newTitle.innerHTML = title.slice(0,3)
        newTitle.classList.remove('hidden')
        newBox.querySelector('.titleRow').appendChild(newTitle)
      }
        // build the weeks of the month

          //build the blank boxes at the beginning of the month
      for(let blankMaker = 0; blankMaker < daysOfTheWeek.indexOf(theFirstIsA); blankMaker++) {

        let blankBuilder = blankBox.cloneNode(true)

        blankBuilder.classList.remove('hidden')
        newWeekRow.appendChild(blankBuilder)
      }

          //build days that aren't blank, and subsequent weekDays

      let dayArr = Object.keys(dateObjCycler[years][months]).sort()
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
        if(countContent.innerHTML % 15 === 0) {
          contentBuilder.classList.add('yellow')
        }
        if(countContent.innerHTML % 30 === 0) {
          contentBuilder.classList.add('blue')
        }
        if(countContent.innerHTML == 0) {
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
              for(let soFar = contentBoxesSoFar.length; soFar < 9; soFar++) {
                let newBlankBuilder = blankBox.cloneNode(true)

                newBlankBuilder.classList.remove('hidden')
                newWeekRow.appendChild(newBlankBuilder.cloneNode(true))

              }
          } else {
          newWeekRow.appendChild(contentBuilder)
          }
        }
      }
    }
  }
}
CalendarBuilder ()


//start of update function
document.getElementById('datePicker').addEventListener('change', () => {

// console.log(daySelected)

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
// console.log("actual:", z)

  topFill()

  // console.log(day)
  // dateObj ()
  // console.log(dateObj())
  CalendarBuilder()

  // console.log(daySelected.add(30, 'days'))
  // sunOrHol(daySelected.clone())

  // }
}) //end of super function
