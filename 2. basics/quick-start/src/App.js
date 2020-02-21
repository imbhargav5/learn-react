import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './Counter'
import TodoList from './TodoList'
import SeeMore from './SeeMore'
/** 
 * Img  --- name
 * Designation
 * Tech stack that I have used
 *   - React
 *   - Node
 *   - HTML
 * 
*/

// const Header = (props) => {
//   const text = props.text
//   const content = props.content
//   return <div>
//     <h3>{text}</h3>
//     <p> {content} </p>
//   </div>
// }

class Header extends Component {
  componentDidMount = () => {
    console.log("Header rendered with " + this.props.text)
  }
  handleClick = () => {
    console.log(this.props)
  }
  render() {
    // const text = this.props.text
    // const content = this.props.content
    const { text, content } = this.props;

    return <div onClick={this.handleClick}>
      <h3>{text}</h3>
      <p> {content} </p>
    </div>
  }
}




const someDynamicValue = { name: "Genisys", number: 15 }

function App() {
  return <div className="App" >
    <img src="https://imbhargav5.com/static/profile.jpg" />
    <Header text="My Name" content="Bhargav" />
    {/* {someDynamicValue.name}
    {someDynamicValue.number}
    {true} */}
    {/* <div>
      <Header text="Tech I Like" content="Here is a list" />
      <ol>
        <li>React</li>
        <li>Redux</li>
        <li>Angular</li>
      </ol>
    </div> */}
    {/* <Counter initialValue={5} />
    <Counter initialValue={9000} /> */}
    {/* <TodoList /> */}
    <SeeMore heading="Heading 1" content="In nibh est vestibulum vestibulum mus lobortis purus nisl ad convallis eros facilisi tristique a neque fermentum curae pretium eros ultricies eleifend fames est vivamus vitae mauris.Potenti et a vestibulum posuere risus ullamcorper enim ac viverra feugiat consectetur magnis urna quisque curabitur.Inceptos platea nam ad a a ad cubilia ad a parturient a ac." />
    {/* <Header text="Rules of components" ></Header>
    <p>Return at least one element</p>
    <p>Return null</p> */}
  </div>
}

export default App;
