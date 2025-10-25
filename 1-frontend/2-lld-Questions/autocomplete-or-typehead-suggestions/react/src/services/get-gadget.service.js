import gadgetDb from "../db/gadget.db.js";

const getGadgetService = async (searchInput) => {
    const list = gadgetDb;
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    return list.filter((item) => item.toLowerCase().includes(searchInput.toLowerCase()));
}

export default getGadgetService;
