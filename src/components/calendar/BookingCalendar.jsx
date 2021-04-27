import React from "react";
import CalenderHeader from "./CalendarHeader";
import CalendarWeekDays from "./CalendarWeekDays";
import CalenderDays from "./CalenderDays";
import DayPopup from "./DayPopup";
import moment from 'moment'

/**
 * Main Calender Component, its work as parent component only
 * 
 * state.selectedMonth : current selected month 
 * state.selectedDate : SelectedDate 
 * Use Moment.js throughout the app to make inconsistency of date object 
 * 
 */
class BookingCalendar extends React.Component {
  state = {
    selectedMonth: moment(),
    selectedDate: moment(),
    showPopup:false
  };
  
  // main calender function to update month, would take updateMonth from anywhere it is being called from the comp/sub component 
  monthChange = (updatedMonth) => {
    this.setState({
      selectedMonth: updatedMonth });
  }
// main calender function to update selected Date, would take selectedDate from anywhere it is being called from the comp/sub component 
  dateChange = (updatedDate) => {
    this.setState({
      selectedDate: updatedDate,showPopup :true });
  }


  render() {
    const {selectedMonth,selectedDate,showPopup} = this.state
    return (
      <div className="calendarWrapper">
        {/* Header Section of Calender */}
        <CalenderHeader selectedMonth={selectedMonth} monthChange={this.monthChange}></CalenderHeader> 
        
        {/* Week row of calender, where each day of week is attached on top of days matrix */}
        <CalendarWeekDays selectedMonth={selectedMonth}></CalendarWeekDays>
        
        {/* Days Matrix of Month(overlapping dates of adjucent months as well) */}
        <CalenderDays selectedMonth={selectedMonth} selectedDate={selectedDate} dateChange={this.dateChange}></CalenderDays>
        
        {/* Day Popup, list down all the available/booked hours */}
        <DayPopup selectedDate={selectedDate} popupOpen={showPopup}></DayPopup>
      </div>
    );
  }
}

export default BookingCalendar;