import { getDateMonthYearFromDate } from "./calendarDateUtility"

// main function to convert the list of all booked slots into an object of keys for Year,Month,Day,Hour
// trade of :its one time cost to calculate the saved the data in while writing, but instead reading would be very fast

const mergeSlotsOnDateTimeBases = (slots) => {
        let mySlotsObject = {}
        slots.forEach(slot => {
            const { year, month, day, hour } = getDateMonthYearFromDate(slot.dateTime)

            mySlotsObject[year] = mySlotsObject[year] ? mySlotsObject[year] : {}
            mySlotsObject[year][month] = mySlotsObject[year][month] ? mySlotsObject[year][month] : {}
            mySlotsObject[year][month][day] = mySlotsObject[year][month][day] ? mySlotsObject[year][month][day] : {}
            mySlotsObject[year][month][day][hour] = mySlotsObject[year][month][day][hour] ? mySlotsObject[year][month][day][hour] : []
            mySlotsObject[year][month][day][hour].push(slot)

        })
        return mySlotsObject
    }
    // concat internal+external data in a unified format and club them to a object in year,month,day bases
    // by clubbing them to object would make searching very easy

const clubMentorAppointmentData = (externalSlotDetails = null, internalSlots = null) => {
        const { mentor: { name: mentorName, time_zone: mentorTimeZone }, calendar: externalSlots } = externalSlotDetails
        const unifiedExternalSlots = externalSlots.map(row => { return {...row, dateTime: row.date_time, external: true, reason: null } })
        const unifiedInternalSlots = internalSlots.map(row => { return {...row, dateTime: row.dateTime, external: false, reason: row.reason } })

        const combinedSlots = unifiedExternalSlots.concat(unifiedInternalSlots)
        const mergedSlots = mergeSlotsOnDateTimeBases(combinedSlots)
        const data = {
            mentorName,
            mentorTimeZone,
            slots: mergedSlots
        }
        return data
    }
    // API calling wrapper, it could be a separate service file as well 
export const fetchFromApi = async(url, method = 'get', postData = null) => {
        let data;
        if (method === 'get') {
            data = await fetch(url).then(res => res.json())
        }
        return data;

    }
    // get the internal slots from localStorage or might call an API as well in future
export const getInternalSlots = () => {
    return JSON.parse(localStorage.getItem('bookedSlots')) || []
}

// get all slots data, internal or external and club them to a unified format
export const getSlotData = async() => {
    const externalData = await fetchFromApi('https://private-anon-9c6f3e299d-cfcalendar.apiary-mock.com/mentors/1/agenda')
    const internalData = getInternalSlots()
    const clubbedData = clubMentorAppointmentData(externalData, internalData)
    return clubbedData
}


// method to save Booking details
// it could be saved in local storage or we post the data over some API also instead of that in future
export const saveBookingDetails = (dateTime, reason) => {
    return new Promise((resolved, rejected) => {
        try {
            let oldData = getInternalSlots()
            let data = { dateTime: dateTime, external: false, reason: reason }
            oldData.push(data)
            localStorage.setItem('bookedSlots', JSON.stringify(oldData))
            resolved(data)
        } catch (e) {
            rejected(e)
        }
    })
}