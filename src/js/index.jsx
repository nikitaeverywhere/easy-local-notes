import React from "react";
import ReactDom from "react-dom";
import NotesApp from "./NotesApp.jsx";

ReactDom.render(
    <NotesApp/>,
    document.getElementById('mount-point')
);