import React from "react";

function isEventSupported (eventName) {
    let el = document.createElement("body"[eventName] || "div");
    let isSupported = "on" + eventName.toLowerCase() in el || top.Event && typeof top.Event == "object" && eventName.toUpperCase() in top.Event;
    el = null;
    return isSupported;
}

const touchDevice = isEventSupported("touchstart");

function spliceSlice(str, index, count, add) {
    if (index < 0) {
        index = str.length + index;
        if (index < 0) {
            index = 0;
        }
    }
    return str.slice(0, index) + (add || "") + str.slice(index + count);
}

export default class Note extends React.Component {

    static defaultProps = {
        note: {
            text: "Empty note"
        },
        onChange: () => {}
    };

    changeNoteCheckBox (pos) {
        let newNote = Object.assign({}, this.props.note);
        newNote.text = spliceSlice(newNote.text, pos, 1, newNote.text[pos] === "+" ? "-" : "+");
        this.props.onChange(newNote);
    }

    render () {
        const note = this.props.note,
              style = {
                  backgroundColor: note.color
              };
        let pos = 0;
        return (
            <div className={ touchDevice ? "note touch" : "note" } style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                <span className="edit-note" onClick={this.props.onEdit}> ✎ </span>
                <div>{ (note.text.match(/(?!\n)[+\-].*\n?|.*(?:\n|$)/g) || []).map((part) => {
                    let p = pos;
                    pos += part.length;
                    if (["+", "-"].indexOf(part[0]) === -1) {
                        return <div key={p}>{ part }</div>;
                    }
                    return <div key={p}>
                        <input id={this.props.note.id + "-" + p}
                               type="checkbox"
                               checked={ part[0] === "+" }
                               className={ part[0] === "+" ? "checked" : "" }
                               onChange={ this.changeNoteCheckBox.bind(this, p) }
                        />
                        <label htmlFor={this.props.note.id + "-" + p}>
                            { part.slice(part[1] === " " ? 2 : 1) }
                        </label>
                    </div>
                }) }</div>
                <div className="tagline">{ (note.tags || []).map((tag) =>
                    <span key={tag} className="tag">{ tag }</span>
                )}</div>
            </div>
        );
    }

}