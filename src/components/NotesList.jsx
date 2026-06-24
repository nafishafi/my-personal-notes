import React from 'react';
import NoteItem from './NoteItem';

function toGroupKey(label) {
  return label.toLowerCase().replace(/\s+/g, '-');
}

function formatGroupHeader(groupKey) {
  return groupKey
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function groupNotesByMonthYear(notes) {
  const groups = {};

  notes.forEach((note) => {
    const date = new Date(note.createdAt);
    const label = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    const groupKey = toGroupKey(label);
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(note);
  });

  // Urutkan grup dari terbaru ke terlama berdasarkan catatan pertama tiap grup
  return Object.fromEntries(
    Object.entries(groups).sort(([, aList], [, bList]) => {
      return new Date(bList[0].createdAt) - new Date(aList[0].createdAt);
    })
  );
}

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list', searchKeyword = '' }) {
  const hasNotes = notes && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <div
          data-testid={`${dataTestId}-empty`}
          className="notes-list__empty-message"
        >
          Tidak ada catatan
        </div>
      </div>
    );
  }

  const groupedNotes = groupNotesByMonthYear(notes);

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
        <section key={groupKey} data-testid={`${groupKey}-group`} className="notes-group">
          <h3 className="notes-group__header">{formatGroupHeader(groupKey)}</h3>
          <span data-testid={`${groupKey}-group-count`} className="notes-group__count">
            {groupNotes.length} catatan
          </span>
          {groupNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={onDelete}
              onArchive={onArchive}
              searchKeyword={searchKeyword}
            />
          ))}
        </section>
      ))}
    </div>
  );
}

export default NotesList;
