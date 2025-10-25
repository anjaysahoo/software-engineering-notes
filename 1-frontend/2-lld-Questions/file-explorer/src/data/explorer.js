const explorer = {
    id: 1,
    name: "root",
    isFolder: true,
    items: [
        {
            id: 11,
            name: "subRoot",
            isFolder: true,
            items: [
                {
                    id: 111,
                    name: "file111.js",
                    isFolder: false
                },
                {
                    id: 112,
                    name: "file112.js",
                    isFolder: false
                }
            ]
        },
        {
            id: 12,
            name: "file12.js",
            isFolder: false
        },
        {
            id: 13,
            name: "file13.js",
            isFolder: false
        }
    ]
}

export default explorer;
