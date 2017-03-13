import React from "react";

export default class TagFilter extends React.Component {

    defaultProps = {
        tags: [],
        onFilter: () => { console.log(`No onFilter property specified`); }
    };

    state = {
        selectedTags: []
    };

    tagSelected (tag) {
        const index = this.state.selectedTags.indexOf(tag);
        let newTags;
        if (index === -1) {
            this.setState({selectedTags: newTags = this.state.selectedTags.concat(tag)})
        } else {
            newTags = this.state.selectedTags.slice();
            newTags.splice(index, 1);
            this.setState({selectedTags: newTags});
        }
        this.props.onFilter(newTags);
    }

    render () {
        return <div style={{
                        textAlign: "center",
                        userSelect: "none"
                    }}>{ this.props.tags.map((tag) => (
            <span key={tag}
                  className={
                      "tag selectable"
                      + (this.state.selectedTags.indexOf(tag) === -1 ? "" : " selected")
                  } onClick={this.tagSelected.bind(this, tag)}>
                { tag }
            </span>
        ))}</div>
    }

}