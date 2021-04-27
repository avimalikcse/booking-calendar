import _ from 'lodash'
import React, { useEffect, useState } from "react";
import { formatDate, getDateMonthYearFromDate, isSameDate } from '../../utils/calendarDateUtility';
import { useQuery, useQueryClient } from 'react-query'
import { getSlotData } from '../../utils/apiHelper';
import BookingForm from './BookingForm';

/**
 * Main component to list down the hours of the day, in 12 hours format
 * 
 * @param {selectedDate} param0 selected date
 * @param {popupOpen} param0 popup open variable to decide whether popup should be open
 */

const DayPopup = ({ selectedDate, popupOpen }) => {
    const [showPopup, setShowPopup] = useState(false);
    let initialPeriod = 'AM' // initial period would be AM only
    if (isSameDate(selectedDate, new Date())) {
        initialPeriod = formatDate(selectedDate, 'A') // if current time is passed noon, set period to PM by default 
    }
    const [period, setPeriod] = useState(initialPeriod);
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1);

    const { isLoading, data: slotData, refetch } = useQuery('slotDetails', getSlotData) // load slots data using react-query, so that it could be cached and reused 
    const queryClient = useQueryClient()

    // function to invalidate query and refetch the api's data
    const invalidateAndUpdateQuery = (isDataSaved = null) => {
        return new Promise((resolve, reject) => {
            queryClient.invalidateQueries('slotDetails')
            return refetch().then(_ => {
                if (isDataSaved) {
                    setCurrentSelectedIndex(-1)
                }
                resolve()
            })
        })
    }

    useEffect(() => {
        if (popupOpen) setShowPopup(true)
        setCurrentSelectedIndex(-1)

    }, [selectedDate, popupOpen, period]);

    /**
     * get the details of hour from booked slot date
     * 
     * @param {number} hour 
     * 
     * slot data is an object of all slot details saved in year>month>day>hour format like
     * example {2021:{12:{01:{1:[]}}}}
     */

    const getSlotDetails = (hour) => {
        const { year, month, day } = getDateMonthYearFromDate(selectedDate)
        let selectedHour = period === 'PM' ? hour + 12 : hour // convert it 24hrs format 
        const { slots } = slotData
        if (slots && slots[year] && slots[year][month] && slots[year][month][day] && slots[year][month][day][selectedHour]) {
            return { isBooked: true, details: slots[year][month][day][selectedHour] }
        }
        return { isBooked: false, details: {} }

    }

    const handleHourOnClick = (details, index) => {
        setCurrentSelectedIndex(index)
    }

    const renderHour = () => {
        let rows = []
        _.range(1, 12, 4).forEach(rangeRow => {
            let row = []
            for (let i = rangeRow; i < rangeRow + 4; i++) {
                const { isBooked, details } = getSlotDetails(i)
                row.push(
                    <div className={`dayCol col cell ${currentSelectedIndex === i ? "selectedHour" : ''} ${isBooked ? "disabledHour" : ''}`} key={i} onClick={(e) => handleHourOnClick(details, i)}>
                        <span className="number">{i}</span>
                        <span className="bg">{`${period}`}</span>
                        <span className="hourError" hidden={!(isBooked && currentSelectedIndex === i)}>Slot Already Booked</span>
                        <BookingForm
                            selectedDate={selectedDate}
                            hour={i}
                            period={period}
                            refetch={invalidateAndUpdateQuery}
                            popupOpen={(currentSelectedIndex === i && !isBooked)}></BookingForm>
                    </div>


                )
            }
            rows.push(<div className="row" key={rangeRow}>{row}</div>)
        })
        return <div className="body">{rows}</div>;
    }
    return (

        <div className="popup-box" hidden={!showPopup}>
            <div className="box">
                <span className="close-icon" onClick={() => setShowPopup(false)}>x</span>
                <div className=" flex-middle">
                    <div className="col col-center">
                        <span>{formatDate(selectedDate, 'LL')}</span>
                    </div>
                    <div className='col-end'>
                        Choose <input type='radio' checked={period === 'AM'} onChange={() => setPeriod('AM')} />AM
                                <input type='radio' checked={period === 'PM'} onChange={() => setPeriod('PM')} />PM
                    </div>
                </div>

                <div className="calendarWrapper dayWrapper">
                    {isLoading ? (<div className="loading">loading</div>) : renderHour()}
                </div>
            </div>
        </div>
    )
}
export default DayPopup
