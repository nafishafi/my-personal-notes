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
    const remaining = TITLE_MAX_LENGTH - title.length;
    const bodyTooShort = body.length > 0 && body.length < BODY_MIN_LENGTH;

    return (
      <div className="note-input" data-testid="note-input">
        <div className="note-input__header">
          <div className="note-input__header-icon">✏️</div>
          <h2>Buat Catatan</h2>
        </div>

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <div className="note-input__title-row">
            <span
              className={`note-input__title__char-limit${remaining < 10 ? ' note-input__title__char-limit--low' : ''}`}
              data-testid="note-input-title-remaining"
            >
              {remaining} karakter tersisa
            </span>
            <input
              className="note-input__title"
              type="text"
              placeholder="Judul catatan..."
              value={title}
              onChange={this.onTitleChangeEventHandler}
              required
              data-testid="note-input-title-field"
            />
          </div>

          <textarea
            className="note-input__body"
            placeholder="Tulis catatanmu di sini..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />

          {bodyTooShort && (
            <p className="note-input__feedback note-input__feedback--error">
              Isi catatan minimal 10 karakter
            </p>
          )}

          <div className="note-input__form-footer">
            <span className="note-input__autosave-hint">
              {title || body ? '● Sedang mengetik...' : ''}
            </span>
            <button type="submit" data-testid="note-input-submit-button">
              + Simpan Catatan
            </button>
          </div>
        </form>
      </div>
    );
  }

}

export default NoteInput;
