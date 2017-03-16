import React from "react";
import NoteEditor from "./NoteEditor.jsx";
import NotesGrid from "./NotesGrid.jsx";
import TagFilter from "./TagFilter.jsx";

const welcomeNotes = [
    {
        color: "#80d8ff",
        id: 1,
        tags: ["docs"],
        text: `Hello!

This is a welcoming note!
Hover over this note and press on icons to delete or edit it.
You can set note colors, add some tags to it and filter notes by tags!`
    },
    {
        color: "#ffd180",
        id: 2,
        tags: ["docs"],
        text: `You can create to-do lists, just use "+" or "-" signs at the beginning of the line:

+ Visit a gym;
+ Make a party with friends;
- Conquer the galaxy!`
    }
];

export default class NotesApp extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            notes: [],
            tagFilter: [],
            tags: [],
            editNote: {}
        }
    }

    componentDidMount () {
        let localNotes = JSON.parse(localStorage.getItem(`notes`));
        if (localNotes === null) localNotes = welcomeNotes;
        if (localNotes) {
            this.setState({
                notes: localNotes,
                tags: this.getActualTags(localNotes)
            });
        }
    }

    getActualTags (notes = this.state.notes) {
        let tags = [];
        for (let note of notes)
            for (let tag of (note.tags || []))
                if (tags.indexOf(tag) === -1)
                    tags.push(tag);
        return tags;
    }

    componentDidUpdate () {
        this.updateLocalStorage();
    }

    handleNoteDelete (note) {
        let noteId = note.id;
        let newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({
            notes: newNotes,
            tags: this.getActualTags(newNotes)
        });
    }

    handleNoteAdd (newNote, editing = false) {
        if (editing) {
            this.setState({ editNote: {} });
            this.handleNoteChange(newNote);
            return;
        }
        let newL = this.state.notes.slice();
        newL.unshift(newNote);
        this.setState({
            notes: newL,
            tags: this.getActualTags(newL)
        });
    }

    handleNoteChange (changedNote = {}) {
        let notes = this.state.notes.map((note) => note.id === changedNote.id ? changedNote : note);
        this.setState({
            notes: notes,
            tags: this.getActualTags(notes)
        });
    }

    handleLabelFilter (filter = []) {
        this.setState({
            tagFilter: filter
        });
    }

    handleNoteEdit (note) {
        this.setState({
            editNote: note
        });
    }

    render () {
        let notes = this.state.notes;
        if (this.state.tagFilter.length) {
            notes = notes.filter((note) => {
                let hasTag = false;
                for (let tag of (note.tags || [])) {
                    if (this.state.tagFilter.indexOf(tag) !== -1) {
                        hasTag = true;
                        break;
                    }
                }
                return hasTag;
            });
        }
        return (
            <div className="notes-app">
                <NoteEditor onNoteAdd={this.handleNoteAdd.bind(this)}
                            editNote={this.state.editNote}/>
                <TagFilter tags={this.state.tags} onFilter={this.handleLabelFilter.bind(this)}/>
                <NotesGrid notes={notes}
                           onNoteDelete={this.handleNoteDelete.bind(this)}
                           onNoteChange={this.handleNoteChange.bind(this)}
                           onNoteEdit={this.handleNoteEdit.bind(this)}/>
            </div>
        );
    }

    updateLocalStorage () {
        let notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }

}
