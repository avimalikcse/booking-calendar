import React from "react"
import { shallow } from "enzyme"
import CalenderDays from "../CalenderDays";
import moment from 'moment'

const calenderHeaderProps = {
    selectedMonth: moment(),
    selectedDate: moment(),
    dateChange: jest.fn(),
}

const headerWrapper = shallow( < CalenderDays {...calenderHeaderProps }
        />);
        let container, containerButton;

        describe("Days Cell of calendar app", () => {
            beforeEach(() => {
                container = headerWrapper.find(".body");
                containerButton = container.find('.dayCol');
                calenderHeaderProps.dateChange.mockClear();
            });
            it("should Main Body", () => {
                expect(container).toHaveLength(1);
            });
            it("Total Days col should", () => {
                expect(containerButton).toHaveLength(35);
            });
        });

        describe("Next Month behaviour", () => {
            it("should call Date Change", () => {
                expect(calenderHeaderProps.dateChange).not.toHaveBeenCalled();
                containerButton.first().simulate('click');
                expect(calenderHeaderProps.dateChange).toHaveBeenCalled();
            });
        });