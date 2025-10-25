import {useEffect, useState} from "react";

function Folder({ handleInsertNode = () => {}, explorer }) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false
    });

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        });
    };

    const onAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            setShowInput({ ...showInput, visible: false });
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
        }
    };

    useEffect(() => {
        console.log("explorer", explorer);
    }, []);

    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 5 }}>
                <div onClick={() => setExpand(!expand)} className="folder">
                    <span>📁 {explorer.name}</span>
                    <div>
                        <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
                        <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
                    </div>
                </div>

                <div style={{display: expand ? "block" : "none", paddingLeft: 25}}>
                    {showInput.visible && (
                        <div className="inputContainer">
                            <span>{showInput.isFolder? "📁" : "📄"}</span>
                            <input
                                type="text"
                                className="inputContainer__input"
                                autoFocus
                                onKeyDown={onAddFolder}
                                onBlur={() => setShowInput({ ...showInput, visible: false })}
                            />
                        </div>
                    )}

                    {explorer.items.map((exp) => {
                        return (
                            <Folder
                                handleInsertNode={handleInsertNode}
                                explorer={exp}
                            />
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return <span className="file">📄 {explorer.name}</span>;
    }
}

export default Folder;
