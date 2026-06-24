import React from 'react';

function NoteActionButton({ variant, onClick }) {
  const config = {
    delete: {
      label: 'Delete',
      className: 'note-item__delete-button',
      testId: 'note-item-delete-button',
    },
    archive: {
      label: 'Arsip',
      className: 'note-item__archive-button',
      testId: 'note-item-archive-button',
    },
    unarchive: {
      label: 'Pindahkan',
      className: 'note-item__archive-button',
      testId: 'note-item-archive-button',
    },
  };

  const { label, className, testId } = config[variant] ?? config.delete;

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      data-testid={testId}
    >
      {label}
    </button>
  );
}

export default NoteActionButton;
