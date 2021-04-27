import moment from 'moment'

/**
 *Main Date Utility helper to write common function around date like format, adding/subtracting days month etc 
 *
 */
export const formatDate = (date, format) => {
    return moment(date).format(format)
}

// check whether two dates are same
export const isSameDate = (date1, date2) => {
    return moment(date1).isSame(date2, 'day')
}

// function to check whether given date is of past 
export const isPastDate = (date) => {
    return moment(date).isBefore(moment(), 'day')
}

// set hours to the date object
export const setHours = (date, hour) => {

    const dateObj = moment(date)
    dateObj.set({ hour: hour, minute: 0, second: 0, millisecond: 0 })
    return dateObj
}

// get starting date of a week or month
export const getStartingNode = (date, type) => {
    switch (type) {
        case 'week':
            return moment(date).startOf('isoWeek')
        case 'month':
            return moment(date).startOf('month')
        default:
            return false
    }
}

//get ending date of week/month
export const getEndingNode = (date, type) => {
    switch (type) {
        case 'week':
            return moment(date).endOf('week')
        case 'month':
            return moment(date).endOf('month')
        default:
            return false
    }
}

// add days/month/year to a date
export const addToDate = (date, type, count) => {
    switch (type) {
        case 'days':
            return moment(date).add(count, 'd')
        case 'month':
            return moment(date).add(count, 'M')
        case 'year':
            return moment(date).add(count, 'y')
        default:
            return false
    }
}

// subtract days/month/year from a date
export const subtractToDate = (date, type, count) => {
    switch (type) {
        case 'days':
            return moment(date).subtract(count, 'd')
        case 'month':
            return moment(date).subtract(count, 'M')
        case 'year':
            return moment(date).subtract(count, 'y')
        default:
            return false
    }
}

// get an object of year,month, day,hour of a given date
export const getDateMonthYearFromDate = (date) => {
    const momentDate = moment(date)
    return { day: momentDate.date(), month: momentDate.month(), year: momentDate.year(), hour: parseInt(momentDate.format('hh')) }
}