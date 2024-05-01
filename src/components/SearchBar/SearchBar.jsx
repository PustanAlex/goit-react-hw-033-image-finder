import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(e);
    this.setState({ submitted: true });
  }

  render() {
    const { handleSearchInput } = this.props;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span>Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            placeholder="Search images and photos"
            onChange={handleSearchInput}
          />
        </form>
      </header>
    );
  }
}
