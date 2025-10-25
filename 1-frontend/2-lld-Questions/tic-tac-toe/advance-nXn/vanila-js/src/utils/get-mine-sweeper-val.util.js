const getMineSweeperValUtil = () => {
    let options = ["*", "+", "-"];
    const random = Math.floor(Math.random() * 10) % 3;
    return options[random];
}

export default getMineSweeperValUtil;
