import "./styles.css";
import { useState } from "react";
import Menu from "./components/Menu";
import MenuItem from "./components/MenuItem";

export default function App() {
    const [menuItems] = useState([
        {
            id: 1,
            label: "New Tab",
            fn: () => {},
            keys: "⌘T",
        },
        {
            id: 2,
            label: "New Window",
            fn: () => {},
            keys: "⌘N",
        },
        {
            id: 3,
            label: "Open Closed Tab",
            fn: () => {},
            keys: "⌘⇧N",
        },
        {
            id: 4,
            label: "Open File...",
            fn: () => {},
            keys: "⌘O",
        }
    ]);

    return (
        <div className="App">
            <Menu>
                {menuItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </Menu>
        </div>
    );
}
