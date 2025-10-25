import Tabs from "./components/Tabs.jsx";


export default function App() {
    return <Tabs tabsInfo = {
        [
            {
                "value": "html",
                "label": "HTML",
                "panel": `The HyperText Markup Language or HTML is the
          standard markup language for documents designed to
          be displayed in a web browser.`
            },
            {
                "value": "css",
                "label": "CSS",
                "panel": `The CSS is the
          standard markup language for documents designed to
          be displayed in a web browser.`
            }
        ]
    } />;
}
