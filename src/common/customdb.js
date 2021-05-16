const Tables = [];

class Table {
    constructor(name) {
        this.name = name;
        this.data = [];
    }

    async getItems() {
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

const getTable = () => Tables

module.exports = { 
    createTable,
    getTable
};
