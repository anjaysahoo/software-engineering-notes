import { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/explorer.js";
import useTraverseTree from "./hooks/use-traverse-tree.jsx";
export default function App() {
    const [explorerData, setExplorerData] = useState(explorer);

    const { insertNode } = useTraverseTree();

    const handleInsertNode = (folderId, item, isFolder) => {
        const finalTree = insertNode(explorerData, folderId, item, isFolder);
        setExplorerData(finalTree);
    };

    return (
        <div className="App">
            <h1>File Explorer</h1>
            <Folder
                handleInsertNode={handleInsertNode}
                explorer={explorerData}
            />
        </div>
    );
}
