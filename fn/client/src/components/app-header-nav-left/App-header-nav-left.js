import React from 'react';
import {Link} from 'react-router-dom';
import './App-header-nav-left.css';
import CategoriesNav from "../categories-nav";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default class AppHeaderNavLeft extends React.Component {
  constructor(props) {
    super(props);

    this.toggle1 = this.toggle1.bind(this);
    this.onMouseEnter1 = this.onMouseEnter1.bind(this);
    this.onMouseLeave1 = this.onMouseLeave1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.onMouseEnter2 = this.onMouseEnter2.bind(this);
    this.onMouseLeave2 = this.onMouseLeave2.bind(this);
    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false

    };
  }

  toggle1() {
    this.setState(prevState => ({
      dropdownOpen1: !prevState.dropdownOpen1
    }));
  }

  onMouseEnter1() {
    this.setState({
      dropdownOpen1: true
    });
  }

  onMouseLeave1(event) {
    this.setState({
      dropdownOpen1: false,
      value1: event.target.innerText
    });
  }

  toggle2() {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen1
    }));
  }

  onMouseEnter2() {
    this.setState({
      dropdownOpen2: true
    });
  }

  onMouseLeave2() {
    this.setState({
      dropdownOpen2: false
    });

  }



  render() {
    return (
      <div>
        <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter1} onMouseLeave={this.onMouseLeave1}
                  isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>

          <DropdownToggle caret>
            <Link to="/catalogs/men">Men</Link>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem> <CategoriesNav catalog={'men'}/> </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter2} onMouseLeave={this.onMouseLeave2}
                  isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
          <DropdownToggle caret>
            <Link to="/catalogs/women">Women</Link>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem> <CategoriesNav catalog={'women'}/> </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
