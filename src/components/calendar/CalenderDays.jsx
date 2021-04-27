import React from "react";
import PropTypes from 'prop-types'
import {
    formatDate, getStartingNode, getEndingNode,
    addToDate, getDateMonthYearFromDate, isPastDate
} from "../../utils/calendarDateUtility";
import moment from 'moment'


/**
 * Main component to print days matrix 
 * 
 * @param {selectedDate} props current selected date
 * @param {selectedMonth} props  current selected month
 * 
 */
const CalenderDays = (props) => {

    const { selectedDate, selectedMonth } = props

    // call parent calender Component function to update date
    const updateSelectedDate = (date) => { props.dateChange(date) };

    const monthStart = getStartingNode(selectedMonth, 'month'); // get starting date of month
    const monthEnd = getEndingNode(monthStart, 'month') // get ending date of selected month
    const startDate = getStartingNode(monthStart, 'week'); // week start date
    const endDate = getEndingNode(monthEnd, 'week') // week end date
    const rows = [];

    let days = [];
    let day = startDate; // start date of the first week, it could be from prev month as well
    let formattedDate = "";

    // loop till we hit the end Date, end date would be last week's end date, it could overlap the next month dates as well 
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = formatDate(day, 'DD') // format the date into date only
            const copiedDay = day;
            const isDateEnabled = isPastDate(day) // check date is not of past 
            const isSameDay = JSON.stringify(getDateMonthYearFromDate(day)) === JSON.stringify(getDateMonthYearFromDate(selectedDate)) // to highlight today's date
            days.push(
                <div
                    className={`dayCol col cell ${isDateEnabled ? "disabled" : isSameDay ? "selected" : ""}`}
                    key={day}
                    onClick={() => updateSelectedDate(copiedDay)}
                >
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                </div>
            );
            day = addToDate(day, 'days', 1) // increment date by 1
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );
        days = [];
    }

    return <div className="body">{rows}</div>;
}

CalenderDays.propTypes = {
    selectedMonth: PropTypes.instanceOf(moment),
    selectedDate: PropTypes.instanceOf(moment),
    dateChange: PropTypes.func

}

export default CalenderDays
