import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("kaliaa.db");

export const initTables = async (): Promise<void> => {
  return db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists debt (id integer primary key not null, person text, description text, value real, currency text, start int, end int);"
    );
    tx.executeSql(
      "create table if not exists due (id integer primary key not null, person text, description text, value real, currency text, start int, end int);"
    );
    tx.executeSql(
      "create table if not exists done (id integer primary key not null, person text, description text, value real, currency text, type text);"
    );
  });
};

export const addItem = async (
  item: Omit<Item, "id">,
  type: ItemType
): Promise<void> => {
  return db.transaction((tx) => {
    if (type === "debt") {
      tx.executeSql(
        "insert into debt (person, description, value, currency, start, end) values (?, ?, ?, ?, ?, ?)",
        [
          item.person,
          item.description,
          item.value,
          item.currency,
          item.start,
          item.end,
        ]
      );
    }
    if (type === "due") {
      tx.executeSql(
        "insert into due (person, description, value, currency, start, end) values (?, ?, ?, ?, ?, ?)",
        [
          item.person,
          item.description,
          item.value,
          item.currency,
          item.start,
          item.end,
        ]
      );
    }
  });
};

export const getItems = async (type: ItemType): Promise<Item[]> => {
  return new Promise<Item[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        if (type === "debt") {
          tx.executeSql("SELECT * FROM debt", [], (_, { rows }) =>
            resolve(rows._array)
          );
        }
        if (type === "due") {
          tx.executeSql("SELECT * FROM due", [], (_, { rows }) =>
            resolve(rows._array)
          );
        }
      },
      (err) => reject(err.message)
    );
  });
};

export const deleteItem = async (id: number, type: ItemType): Promise<void> => {
  return db.transaction((tx) => {
    if (type === "debt") {
      tx.executeSql(`delete from debt where id = ?;`, [id]);
    }
    if (type === "due") {
      tx.executeSql(`delete from due where id = ?;`, [id]);
    }
  });
};

export const setItemDone = async (
  item: Omit<DoneItem, "id">
): Promise<void> => {
  return db.transaction((tx) => {
    tx.executeSql(
      "insert into done (person, description, value, currency, type) values (?, ?, ?, ?, ?)",
      [item.person, item.description, item.value, item.currency, item.type]
    );
  });
};

export const getDoneItems = async (): Promise<DoneItem[]> => {
  return new Promise<DoneItem[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("SELECT * FROM done", [], (_, { rows }) =>
          resolve(rows._array)
        );
      },
      (err) => reject(err.message)
    );
  });
};
