import React, { Component } from 'react';


/// <SeeMore heading={""} content={""}> </SeeMore>
// function SeeMore(props) {
//     return (
//         <div>

//         </div>
//     );
// }


class SeeMore extends Component {
    state = {
        isContentVisible: false
    }
    // handleSeeMore = () => {
    //     this.setState({
    //         isContentVisible: true
    //     })
    // }
    // handleSeeLess = () => {
    //     this.setState({
    //         isContentVisible: false
    //     })
    // }
    toggleContentVisibility = () => {
        // this.state.isContentVisible ? this.handleSeeLess() : this.handleSeeMore()
        this.setState({
            isContentVisible: !this.state.isContentVisible
        })
    }
    render() {
        const { heading, content } = this.props
        const { isContentVisible } = this.state
        return <div>
            <h3>{heading}</h3>
            <span onClick={this.toggleContentVisibility}>{isContentVisible ? "See Less" : "See More"}</span>
            <p>{isContentVisible ? content : null}</p>
        </div>
    }
}

export default SeeMore;