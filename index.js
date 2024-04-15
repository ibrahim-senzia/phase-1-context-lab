/* Your Code Here */

//createEmployeeRecord
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}
function createEmployeeRecords(employeeData) {
  return employeeData.map(data => createEmployeeRecord(data))
}

//createTimeInEvent
function createTimeInEvent(dateStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(8, 10)),
    date: dateStamp.slice(0, 10)
  })
  return this
}

//createTimeOutEvent
function createTimeOutEvent(dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(8, 10)),
    date: dateStamp.slice(0, 10)
  })
  return this
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(event => event.date === date)
  const timeOut = this.timeOutEvents.find(event => event.date === date)
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => {
    if (event.type === "TimeOut") {
      const date = event.date
      const timeIn = employee.timeInEvents.find(e => e.date === date)
      total += wagesEarnedOnDate.call(employee, date)
    }
    return total
  }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

