import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { formatDate, setHours } from "../../utils/calendarDateUtility";
import moment from 'moment'
import { saveBookingDetails } from '../../utils/apiHelper';

/**
 * 
 * Main function to enter booking details and save
 * this is a plug-play component, please pass following props and you can use it anywhere in your app
 * 
 * @param {selectedDate} props selected date for booking allotment 
 * @param {popupOpen} props popup trigger
 * @param {hour} props hour of the day
 * @param {period} props  period of the hour
 * @param {refetch} props  period of the hour
 */

const BookingForm = (props) => {
    const { selectedDate, popupOpen, hour, period } = props
    const [hidePopup, setHidePopup] = useState(true); // getter/setter of popup trigger
    const [message, setMessage] = useState(''); // message for saved booking
    const [reason, setReason] = useState(''); // reason provided for booking

    // clear state on opening of popup window
    useEffect(() => {
        setHidePopup(!popupOpen)
        setMessage('')
        setReason('')

    }, [popupOpen]);


    // submit handler of booking form, should be called from submit button 
    const submitHandle = () => {
        // refetch the data and check whether selected popup stills available 
        props.refetch().then(async (_) => {
            // after parent's data refresh, call the save api to save booking details
            if (popupOpen) {
                let dateWithHours = setHours(selectedDate, hour)
                await saveBookingDetails(dateWithHours.utc().format(), reason)
                // set the message for confirmation
                setMessage("Appointment Booked")
            }
        })
    }


    return (<div className="tooltip" hidden={hidePopup}>
        <div className="appointment">
            <div className="appointmentHeading">
                <span>Book an appointment on {formatDate(selectedDate, 'LL')} for {`${hour} ${period}`}</span>
                <span hidden={!message}>{message}</span>
            </div>
            <div className="appointmentClose" onClick={(e) => { setHidePopup(true); props.refetch(true) }}>
                <div className="icon" >close</div>
            </div>

        </div>
        {/* if message available, display the success message otherwise booking form  */}
        {message ? <span className='successMessage'>{message} <br />
            Reason : {reason}<br />
            Date & time : {formatDate(selectedDate, 'LL')} at {`${hour} ${period}`}
        </span> :
            <>
                <div className="row">
                    <div className="col-25">
                        <label>Reason</label>
                    </div>
                    <div className="col-75">
                        <input type="text" name="reason" onChange={(e) => setReason(e.target.value)} value={reason} placeholder="Type message"></input>
                    </div>
                </div>
                <div>
                    <input type='button' className="submitBtn" value='Confirm Call' onClick={submitHandle}></input>
                </div></>}

    </div>)
}

BookingForm.propTypes = {
    selectedDate: PropTypes.instanceOf(moment),
    popupOpen: PropTypes.bool,
    hour: PropTypes.number
}

export default BookingForm
