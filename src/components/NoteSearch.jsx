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
        <input
          className="note-search__input"
          type="search"
          placeholder="Cari catatan ..."
          value={this.state.keyword}
          onChange={this.onInputChangeHandler}
          data-testid="note-search-input"
        />
      </div>
    );
  }
}

export default NoteSearch;
