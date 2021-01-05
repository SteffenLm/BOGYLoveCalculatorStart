import React from "react"
import Index from "../js/pages/Index"

test('Render Index page', () => {
    const wrapper = shallow(
        <Index />
    );

    expect(wrapper).toMatchSnapshot();
});