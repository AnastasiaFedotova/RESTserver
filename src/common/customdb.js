const Tables = [];

/**
 * A table object with name, data, methods: getItems, filterByParam, clearByParam,
 * getItem, addItem, updateItem, removeItem
 * @typedef {Class} Table
 * @property {string} name a table's name.
 * @property {Array} data a table's data.
 * @property {Function} getItems the methods return a table's data.
 * @property {Function} filterByParam the methods return filtered a table's data.
 * @property {Function} clearByParam the methods return creared a table's data by filter.
 * @property {Function} getItem the methods return a table's item by param.
 * @property {Function} addItem the methods return a new table's item.
 * @property {Function} updateItem the methods return a updated table's item by id.
 * @property {Function} removeItem the methods return a removed table's item by id.
 */
class Table {
    constructor(name) {
        this.name = name;
        this.data = [];
    }

    async getItems() {
        return this.data;
    }

    async filterByParam(param, equals) {
        return this.data.filter((item) => item[param] === equals);
    }

    async clearByParam(param, equals) {
        this.data = this.data.filter((item) => item[param] === equals);
        return this.data;
    }

    async getItem(itemId) {
        const items = await this.getItems();
        const item = items.find((elem) => elem.id === itemId);

        return item;
    }

    async addItem (item) {
        this.data.push(item);

        return item;
    }

    async updateItem(itemId, newItem) {
        const items = await this.getItems();
        const index = items.findIndex((item) => item.id === itemId);
        items[index] = newItem;

        return newItem;
    }

    async removeItem(itemId) {
        const items = await this.getItems();
        const index = items.findIndex((item) => item.id === itemId);
        if (index === -1) return null;
        const coontRemove = 1;

        return items.splice(index, coontRemove);
    }
}

const createTable = (name) => {
    const indexTable = Tables.push(new Table(name)) - 1;
    return Tables[indexTable];
}

const getTables = () => Tables

module.exports = {
    createTable,
    getTables
};
