import React from "react"
import { shallow, mount, render } from "enzyme"
import BookingCalendar from "./../BookingCalendar"
import CalenderHeader from "./../CalendarHeader";
import CalendarWeekDays from "./../CalendarWeekDays";
import CalenderDays from "./../CalenderDays";




describe("Booking Calendar", () => {
    let container
    beforeEach(() => (container = shallow( < BookingCalendar / > )))

    it("Main wrapper rendered", () => {
        expect(container.find('.calendarWrapper').length).toEqual(1)
    })

    it("should render the Calendar Header", () => {
        expect(container.containsMatchingElement( < CalenderHeader /
            >
        )).toEqual(true)
    })

    it("should contain Week Header", () => {
        expect(container.containsMatchingElement( < CalendarWeekDays / > )).toEqual(true)
    })

    it("should render Day Matrix", () => {
        expect(container.containsMatchingElement( < CalenderDays / > )).toEqual(true)
    })



})