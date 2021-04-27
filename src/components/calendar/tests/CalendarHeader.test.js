import React from "react"
import { shallow, mount, render } from "enzyme"
import CalenderHeader from "./../CalendarHeader";
import moment from 'moment'
const calenderHeaderProps = {
    selectedMonth: moment(),
    monthChange: jest.fn()
}

const headerWrapper = shallow( < CalenderHeader {...calenderHeaderProps }
        />);
        let container, containerButton;

        describe("ChildComponent", () => {
            beforeEach(() => {
                container = headerWrapper.find(".header");
                containerButton = container.find('.nxtMnth');
                calenderHeaderProps.monthChange.mockClear();
            });

            it("should have a Month Header", () => {
                expect(container).toHaveLength(1);
            });
            it("should have a Next Button", () => {
                expect(containerButton).toHaveLength(1);
            });


            describe("Next Month behaviour", () => {
                it("should call onSubmit", () => {
                    expect(calenderHeaderProps.monthChange).not.toHaveBeenCalled();
                    containerButton.simulate('click');
                    expect(calenderHeaderProps.monthChange).toHaveBeenCalled();
                });
            });
        });