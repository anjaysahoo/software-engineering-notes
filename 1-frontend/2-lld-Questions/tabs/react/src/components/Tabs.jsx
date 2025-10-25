import { useState } from 'react';

let selectedPanel = "";


export default function Tabs({tabsInfo, defaultValue}) {
    const [selectedTabLabel, setSelectedTabLabel] = useState();
    // const [selectedPanel, setSelectedPanel] = useState();

    const updateActiveTabInfo = (label) => {
        setSelectedTabLabel(label);
        console.log("panel : ", tabsInfo.filter((item) => item.label == label)[0].panel);
        selectedPanel = tabsInfo.filter((item) => item.label == label)[0].panel;
    }

    return (
        <div>
            <div>
                {
                    tabsInfo.map(({label}) => (
                        <button
                            className={
                                selectedTabLabel === label ? "active" : null
                            }
                            onClick={() => updateActiveTabInfo(label)}
                        >{label}</button>
                    ))
                }
            </div>
            <div>
                <p>
                    {selectedPanel}
                </p>
            </div>
        </div>
    );
}
