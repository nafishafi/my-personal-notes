import React from 'react';

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
  }

  onInputChangeHandler(event) {
    const keyword = event.target.value;
    this.setState({ keyword });
    this.props.onSearch(keyword);
  }

  render() {
    return (
      <div className="note-search" data-testid="note-search">
        <span className="note-search__icon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M14.5 14.5L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <input
          className="note-search__input"
          type="search"
          placeholder="Cari catatan..."
          value={this.state.keyword}
          onChange={this.onInputChangeHandler}
          data-testid="note-search-input"
        />
      </div>
    );
  }
}

export default NoteSearch;
