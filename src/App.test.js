import React from "react"
import { shallow } from "enzyme"
import App from "./App"
import BookingCalendar from "./components/calendar/BookingCalendar"

describe("App", () => {
    let container
    beforeEach(() => (container = shallow( < App / > )))
    it("should render a <div />", () => {
        expect(container.find(".App").length).toEqual(1)
    })
    it("should render the Booking Component", () => {
        expect(container.containsMatchingElement( < BookingCalendar / > )).toEqual(true)
    })
})