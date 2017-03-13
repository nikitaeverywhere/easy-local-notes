import React from "react";
import Note from "./Note.jsx";
import { XMasonry, XBlock } from "react-xmasonry";

export default class NotesGrid extends React.Component {

    static defaultProps = {
        onNoteChange: () => {},
        onNoteEdit: () => {}
    };

    handleNoteChanged (note) {
        this.props.onNoteChange(note);
    }

    render () {
        return <XMasonry>{ this.props.notes.map((note) =>
            <XBlock key={note.id}>
                <Note
                    onDelete={this.props.onNoteDelete.bind(null, note)}
                    onEdit={this.props.onNoteEdit.bind(null, note)}
                    note={note}
                    onChange={this.handleNoteChanged.bind(this)}/>
            </XBlock>
        )}</XMasonry>
    }

}