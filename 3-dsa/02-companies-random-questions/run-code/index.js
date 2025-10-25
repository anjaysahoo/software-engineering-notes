// function convert12to24Hour(time) {
//     const isAM = time.slice(-2, 8) === 'AM';
//     const hour = time.slice(0, 2);
//
//     if(isAM && hour === '12'){
//         return '00:' + time.slice(3, 5);
//     }
//
//     if(!isAM && hour !== '12'){
//         const newHour = String(Number(hour) + 12);
//         return newHour + ':' + time.slice(3, 5);
//     }
//
//
//     //12:00 AM -> 00:00
//     //12:53 AM -> 00:53
//     //01:00 AM -> 01:00
//     //01:05 AM -> 01:05
//     //12:00 PM -> 12:00
//     //12:05 PM -> 12:05
//     //01:53 PM -> 13:53
//
//     return time.slice(0, 6);
// }

function convert12to24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hour, min] = time.split(':');

    if(modifier === 'PM')
        hour = 12 + Number(hour);

    return `${hour}:${min}`;
}

console.log("24 Hour time : ", convert12to24Hour('12:00 AM'));
console.log("24 Hour time : ", convert12to24Hour('12:53 AM'));
console.log("24 Hour time : ", convert12to24Hour('01:00 AM'));
console.log("24 Hour time : ", convert12to24Hour('01:05 AM'));
console.log("24 Hour time : ", convert12to24Hour('12:00 PM'));
console.log("24 Hour time : ", convert12to24Hour('12:05 PM'));
console.log("24 Hour time : ", convert12to24Hour('01:53 PM'));
