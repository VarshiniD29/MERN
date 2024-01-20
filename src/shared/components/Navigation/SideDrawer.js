import React from "react";
import ReactDOM from 'react-dom';
import { CSSTransition } from "react-transition-group";

import './SideDrawer.css';

const SideDrawer = props => {
    const content = (
    <CSSTransition in = {props.show} timeout= {200} 
    classNames= {{
        enterActive : "slide-in-left-enter",
        enterDone: "slide-in-left-enter-active",
        exitActive: "slide-in-left-exit",
        exit : "slide-in-left-exit-active" ,
    }}
    mountOnEnter 
    unmountOnExit>
        <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
    ); 

return ReactDOM.createPortal(content, document.getElementById('side-drawer'));
};
export default SideDrawer;