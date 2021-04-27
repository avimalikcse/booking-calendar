import React from "react";
import PropTypes from 'prop-types'
import { formatDate,addToDate, subtractToDate } from "../../utils/calendarDateUtility";
import moment from 'moment'


/**
 * 
 * Main header section of calender
 * @param {selectedMonth} props selected Month from lifted State
 * * @param {monthChange} props parent function to update month in lifted state
 */

const CalenderHeader = (props) => {

  const { selectedMonth } = props
  
  // update month to next month
  const nextMonth = () => {
    props.monthChange(addToDate(selectedMonth,'month',1))
  };

  //update month to prev month
  const prevMonth = () => {
    props.monthChange(subtractToDate(selectedMonth,'month',1))
  };
  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={prevMonth}>
          chevron_left
          </div>
      </div>
      <div className="col col-center">
        <span>{formatDate(selectedMonth, 'MMMM yyyy')}</span>
      </div>
      <div className="col col-end nxtMnth" onClick={nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
}

CalenderHeader.propTypes = {
  selectedMonth: PropTypes.instanceOf(moment),
  monthChange: PropTypes.func
}

export default CalenderHeader
