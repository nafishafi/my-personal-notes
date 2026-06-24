import React from 'react';

const TITLE_MAX_LENGTH = 50;
const BODY_MIN_LENGTH = 10;

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const value = event.target.value;
    // Batasi maksimal 50 karakter via state (bukan atribut maxLength)
    if (value.length <= TITLE_MAX_LENGTH) {
      this.setState({ title: value });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    // Advanced: tolak submit jika body < 10 karakter
    if (body.trim().length < BODY_MIN_LENGTH) {
      return;
    }

    this.props.addNote({ title, body });

    // Reset form setelah submit
    this.setState({ title: '', body: '' });
  }

  render() {
    const { title, body } = this.state;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {body.length < 10 && body.length > 0 && (
          <p className="note-input__feedback--error">
            Isi catatan minimal harus 10 karakter
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <span
            className={`note-input__title__char-limit${TITLE_MAX_LENGTH - title.length < 10 ? ' note-input__title__char-limit--low' : ''}`}
            data-testid="note-input-title-remaining"
          >
            {TITLE_MAX_LENGTH - title.length} karakter tersisa
          </span>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
