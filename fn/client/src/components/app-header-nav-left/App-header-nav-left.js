import React from 'react';
import {Link} from 'react-router-dom';
import './App-header-nav-left.css';
import CategoriesNav from "../categories-nav";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

export default class AppHeaderNavLeft extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      menDropdownOpen: false,
      womenDropdownOpen: false,
      kidsDropdownOpen: false
    };
  }

  toggle(key) {
    this.updateState(key, !this.state[key]);
  }

  onMouseEnter(key) {
    this.updateState(key, true);
  }

  onMouseLeave(key) {
    this.updateState(key, false);
  }

  updateState(key, value) {
    let newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <Dropdown className="d-inline-block" onMouseOver={() => this.onMouseEnter('menDropdownOpen')}
                  onMouseLeave={() => this.onMouseLeave('menDropdownOpen')}
                  isOpen={this.state.menDropdownOpen} toggle={() => this.toggle('menDropdownOpen')}>

          <DropdownToggle caret>
            <Link to="/catalogs/men">Men</Link>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem> <CategoriesNav catalog={'men'}/> </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown className="d-inline-block" onMouseOver={() => this.onMouseEnter('womenDropdownOpen')}
                  onMouseLeave={() => this.onMouseLeave('womenDropdownOpen')}
                  isOpen={this.state.womenDropdownOpen} toggle={() => this.toggle('womenDropdownOpen')}>
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
