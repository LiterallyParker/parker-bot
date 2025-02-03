const { Item } = require("../models");

class Store {
    constructor() {
        this.items = []
    };

    async loadStore() {
        const items = await Item.findAll();

        const getRandomItems = (array, count = 4) => {
            if (array.length <= count) return array;
            return array.sort(() => 0.5 - Math.random()).slice(0, count);
        };

        this.items = [ ...getRandomItems(items), { name: "Revival Stone", tier: "common", type: "consumable", price: 20, description: "Revives you when dead. Not irl though." } ]
    };

    getStore() {
        return this.items;
    };
};

const store = new Store();
store.loadStore();

module.exports = store;