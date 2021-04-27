import React from "react"
import { shallow, mount, render } from "enzyme"
import BookingForm from "../BookingForm";




const calenderHeaderProps = {
    popupOpen: true,
    refetch: jest.fn()

}

const headerWrapper = shallow( < BookingForm {...calenderHeaderProps }
        />)
        let container, submitButton; describe("Test Booking Form Popup", () => {
            beforeEach(() => {
                container = headerWrapper.find(".tooltip");
                submitButton = container.find('.submitBtn')
                jest.spyOn(calenderHeaderProps, 'refetch').mockImplementation(() => Promise.resolve({ data: {} }))
            });

            it("should have a loader in initial load", () => {
                expect(container).toHaveLength(1);
            });

            describe("Test Submit Button", () => {
                it("should call the refetch method of parent first", () => {
                    expect(calenderHeaderProps.refetch).not.toHaveBeenCalled();
                    submitButton.simulate('click');
                    expect(calenderHeaderProps.refetch).toHaveBeenCalled();
                });
            });

        });