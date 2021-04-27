import React from "react";
import PropTypes from 'prop-types'
import { formatDate , getStartingNode,addToDate} from "../../utils/calendarDateUtility";
import _ from 'lodash'
import moment from 'moment'

/**
 * Main component to to list out days matrix 
 * 
 * @param {selectedMonth} props current selected month
 */

const CalendarWeekDays = (props) => {
    const {selectedMonth} = props
    const days = [];
    
    // print day as header on top of days matrix 
    let weekStartDate = getStartingNode(selectedMonth,'week')
    _.range(0,7).forEach(day=>{
        days.push(
            <div className="col col-center dayCell" key={day}>
              {formatDate(addToDate(weekStartDate, 'days',day), 'dddd')}
            </div>
          );
    })
    return <div className="days row">{days}</div>;    
    
}

CalendarWeekDays.propTypes = {
    selectedMonth: PropTypes.instanceOf(moment)
}

export default CalendarWeekDays
