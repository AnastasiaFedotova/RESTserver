import User from "../resources/users/user.model";
import Task from "../resources/tasks/tasks.model"
import Board from "../resources/boards/board.model"

interface Entity {
    id: string;
}

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
class Table<T extends Entity> {

    name: string;
    data: Array<T>;

    constructor(name: string) {
        this.name = name;
        this.data = [];
    }

    async getItems() {
        return this.data;
    }

    async find(predicator: (value: T) => boolean) {
        return this.data.filter(predicator);
    }

    async removeItems(predicator: (value: T) => boolean) {
        this.data = this.data.filter(t => !predicator(t));
        return this.data;
    }

    async getItem(id: string) {
        const items = await this.getItems();
        const item = items.find((elem) => elem.id === id);

        return item;
    }

    async addItem(item: T) {
        this.data.push(item);

        return item;
    }

    async updateItem(itemId: string, newItem: T) {
        const items = await this.getItems();
        const index = items.findIndex((item) => item.id === itemId);
        items[index] = newItem;

        return newItem;
    }

    async removeItem(id: string) : Promise<T | undefined> {
        const items = await this.getItems();
        const index = items.findIndex((item) => item.id === id);

        if (index === -1) throw Error("Item not found");

        const result = items[index];
        items.splice(index, 1);

        return result;
    }
}

class Context {
    boardsTable: Table<Board>;
    usersTable: Table<User>;
    tasksTable: Table<Task>;

    constructor(){
        this.boardsTable = new Table<Board>("boards");
        this.boardsTable.addItem(new Board('1', 'board1', [{
          id: '1',
          title: 'colum1',
          order: 1
        }]));

        this.boardsTable.addItem(new Board('2', 'board2', [{
          id: '2',
          title: 'colum2',
          order: 2
        }]));
        this.tasksTable = new Table<Task>("tasks");
        this.usersTable = new Table<User>("users");
    }

    getBoardsTable() : Table<Board> {
        return this.boardsTable;
    }

    getUsersTable() : Table<User> {
        return this.usersTable;
    }

    getTasksTable() : Table<Task> {
        return this.tasksTable;
    }
}

const currentMemoryDbContex = new Context();

export default currentMemoryDbContex;
