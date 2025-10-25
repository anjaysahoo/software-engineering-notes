import GADGETS from "../db/gadget.db.js";

const getGadgets = async (prefix) => {
    const filteredArray = GADGETS.filter(
        word => word.toLowerCase().startsWith(prefix.toLowerCase())
        );

    await new Promise(resolve => setTimeout(resolve, 1000));

    return filteredArray;
}

export default getGadgets;
