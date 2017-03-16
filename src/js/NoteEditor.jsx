import React from "react";
import { RadioGroup, Radio } from "react-radio-group";

export default class NoteEditor extends React.Component {

    static defaultProps = {
        editNote: {}
    };

    state = {
        text: this.props.editNote.text || "",
        selectedColor: this.props.editNote.color || "#ffff8d",
        tagsText: (this.props.editNote.tags || []).join(", ")
    };

    constructor (props) {
        super(props);
    }

    textChanged (event) {
        this.setState({ text: event.target.value });
    }

    tagsChanged (event) {
        this.setState({ tagsText: event.target.value });
    }

    handleNoteAdd () {
        let newNote = {
            text: this.state.text,
            color: this.state.selectedColor,
            id: this.props.editNote.id || Date.now(),
            tags: this.state.tagsText.match(/\w+/g)
        };
        this.props.onNoteAdd(newNote, !!this.props.editNote.id);
        this.setState({ text: ``, tagsText: `` });
    }

    componentWillReceiveProps (newProps) {
        if (!newProps.editNote || newProps.editNote.id === this.props.editNote.id)
            return;
        this.setState({
            text: newProps.editNote.text || "",
            selectedColor: newProps.editNote.color || "#ffff8d",
            tagsText: (newProps.editNote.tags || []).join(", ")
        });
    }

    colorChanged (color) {
        this.setState({
            selectedColor: color
        });
    }

    render () {
        return (
            <div className="note-editor" style={{ backgroundColor: this.state.selectedColor }}>
                <textarea
                    placeholder="Enter your note here. Use &quot;-&quot; or &quot;+&quot; marks to create to-do lists"
                    rows={(this.state.text.match(/\r?\n/g) || []).length + 4}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.textChanged.bind(this)}
                />
                <div className="note-editor-controls">
                    <button disabled={this.state.text.length === 0} className="add-button" onClick={this.handleNoteAdd.bind(this)}>{
                        this.props.editNote.id ? "Change" : "Add"
                    }</button>
                    <RadioGroup className="color-picker" name="color" selectedValue={this.state.selectedColor} onChange={this.colorChanged.bind(this)}>
                        <Radio id="a" value="#ffff8d"/><label htmlFor="a" style={{background:"#ffff8d"}}/>
                        <Radio id="b" value="#ff8a80"/><label htmlFor="b" style={{background:"#ff8a80"}}/>
                        <Radio id="c" value="#fff"/><label htmlFor="c" style={{background:"#fff"}}/>
                        <Radio id="d" value="#ffd180"/><label htmlFor="d" style={{background:"#ffd180"}}/>
                        <Radio id="e" value="#80d8ff"/><label htmlFor="e" style={{background:"#80d8ff"}}/>
                        <Radio id="f" value="#ccff90"/><label htmlFor="f" style={{background:"#ccff90"}}/>
                        <Radio id="g" value="#cfd8dc"/><label htmlFor="g" style={{background:"#cfd8dc"}}/>
                    </RadioGroup>
                </div>
                <input type="text" className="tag-editor"
                       placeholder="Add tags here: poems, quotes, todos, etc"
                       onChange={this.tagsChanged.bind(this)}
                       value={this.state.tagsText}/>
            </div>
        );
    }
}