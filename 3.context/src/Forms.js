import React from 'react';
import Tabs from './components/Tabs'
import Slider from './components/Slider';

function Forms(props) {
    const tabs = [{
        tabHeading: "One",
        tabContent: "Content One"
    }, {
        tabHeading: "Two",
        tabContent: <p>Content Two</p>
    }, {
        tabHeading: "Three",
        tabContent: "Content Three"
    }]
    return (
        <div>
            Forms
            <Tabs tabs={tabs} />
            <hr />
            <Slider images={[
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRPs-Jm1WbPxxwOhtc6_h9MlwMRVeivnglaIikZHvv4oMiyG5D",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQG_pTGRdHilXXaYpiV1BuQCusUu2GrenxlVCutnhfERO0Xo7Yb",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0XYAEmFQxGK1rnEJg3TN_CN8lFAHsFsJ6sYMY1KGqKSp150ld",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1rg6kBhYQhoWqoUZnSVM_Hhdtzehu_40aiP1U7RZ7-ObBuG4Y"
            ]} />
            <br />
            <br />
            <br />
            <br />
            {/* <select>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
            </select> */}
        </div>
    );
}

export default Forms;