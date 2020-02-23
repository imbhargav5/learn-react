/**
 * tabs = [{
 *      tabHeading: "Tab one",
 *      tabContent: "lasdjfalksdjf"},
 *      {tabHeading: "Tab one",
 *      tabContent: "lasdjfalksdjf"}
 *
 *]
*/

import React, { Component } from 'react';

class Tabs extends Component {
    state = {
        currentTabIndex: 0
    }
    render() {
        const { tabs } = this.props;
        const { currentTabIndex } = this.state;
        const headingElements = tabs.map((tabObj, index) => {
            return <button type="button" onClick={event => {
                this.setState({
                    currentTabIndex: index
                })
            }} key={tabObj.tabHeading}>{tabObj.tabHeading}</button>
        })
        return <div>
            <h3>Headings</h3>
            <div>{headingElements}</div>
            <h3>Selected Tab Content</h3>
            <div>
                {tabs[currentTabIndex].tabContent}
            </div>
        </div>
    }
}

export default Tabs;