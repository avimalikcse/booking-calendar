import React from "react"
import { shallow, mount, render } from "enzyme"
import moment from 'moment'
import DayPopup from "../DayPopup";
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const handleUp = jest.fn()
const calenderHeaderProps = {
    popupOpen: true,
    selectedDate: moment(),

}

const headerWrapper = mount( < QueryClientProvider client = { queryClient } > < DayPopup {...calenderHeaderProps }
    /></QueryClientProvider > )
let container, daysCell, loader;

describe("Test Hour selector popup", () => {
    beforeEach(() => {
        container = headerWrapper.find(".popup-box");

        loader = headerWrapper.find('.loading')
        jest.spyOn(React, 'useEffect').mockImplementation(f => f())
    });
    it("should have a hours row", () => {
        expect(container).toHaveLength(1);
    });
    it("should have a loader in initial load", () => {
        expect(loader).toHaveLength(1);
    });

});