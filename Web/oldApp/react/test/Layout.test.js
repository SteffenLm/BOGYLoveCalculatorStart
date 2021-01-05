import React from "react"
import Layout from "../js/pages/Layout"
import welcomeTextStore from "../js/stores/welcomeTextStore"

test('Render Layout', () => {
    const wrapper = shallow(
        <Layout welcomeTextStore={welcomeTextStore}/>
    );

    expect(wrapper).toMatchSnapshot();
});
