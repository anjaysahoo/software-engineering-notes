import { useState } from "react";

function Menu({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="menu">
            <button className="menu__trigger" onClick={() => setIsOpen(!isOpen)}>
                <div className="menu__trigger-icon"></div>
                <div className="menu__trigger-icon"></div>
                <div className="menu__trigger-icon"></div>
            </button>

            {isOpen && <div className="menu__dropdown">{children}</div>}
        </div>
    );
}

export default Menu;
