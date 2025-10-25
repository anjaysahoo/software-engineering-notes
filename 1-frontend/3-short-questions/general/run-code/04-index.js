const input = [
    {
        key: 'sample1',
        data: 'data1',
    },
    {
        key: 'sample1',
        data: 'data2'
    },
    {
        key: 'sample1',
        data: 'data3'
    },
    {
        key: 'sample2',
        data: 'data2',
    },
    {
        key: 'sample3',
        data: 'data3',
    },
]

const output =
    {
        'sample1': [
            {
                key: 'sample1',
                data: 'data1',
            },
            {
                key: 'sample1',
                data: 'data2'
            },
            {
                key: 'sample1',
                data: 'data3'
            }
        ],
        'sample2': [
            {
                key: 'sample2',
                data: 'data2',
            }
        ],
        'sample3': [
            {
                key: 'sample3',
                data: 'data3',
            }
        ]
    }



function transform(input){
    let output = {};

    for(let item of input){
        if(output[item.key]){
            output[item.key].push(item);
        }
        else{
            output[item.key] = [item];
        }
    }

    console.log("Output : ", output);
}

transform(input);
