import React from "react"
import { shallow, mount, render } from "enzyme"
import CalenderHeader from "./../CalendarHeader";
import CalendarWeekDays from "../CalendarWeekDays";
import moment from 'moment'

const calenderHeaderProps = {
    selectedMonth: moment(),
}

const headerWrapper = shallow( < CalendarWeekDays {...calenderHeaderProps }
        />);
        let container, daysCell;

        describe("Week Row of calender", () => {
            beforeEach(() => {
                container = headerWrapper.find(".days");
                daysCell = headerWrapper.find('.dayCell')
            });
            it("should have a days row", () => {
                expect(container).toHaveLength(1);
            });
            it("should have a 7 cells of week days", () => {
                expect(daysCell).toHaveLength(7);
            });
        });