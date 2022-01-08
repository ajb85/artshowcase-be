import knex from "knex";
import configs from "../knexfile.js";

const env = process.env.NODE_ENV || "development";
const db = knex(configs[env]);

export default db;

function getWithNickname(table) {
  const [lcTable, nickname] = table.toLowerCase().split(" as ");
  const tableName = table.substring(0, lcTable.length);
  const nameWithNickname = `${tableName}${nickname ? ` AS ${nickname}` : ""}`;

  return {
    getWithNickName() {
      return nameWithNickname;
    },
    filterWithNickname(obj) {
      if (!nickname) return obj;

      const withNickname = {};
      for (let key in obj) {
        withNickname[`${nickname}.${key}`] = obj[key];
      }

      return withNickname;
    },
    addNicknameToString(str) {
      return nickname ? `${nickname}.${str}` : str;
    },
    getName() {
      return tableName;
    },
  };
}

export function queryBuilder(table, requiresFilterToFind) {
  const t = getWithNickname(table);
  return {
    find(filter) {
      if (!filter && requiresFilterToFind) {
        throw new Error(`Filter required for finding within ${t.getName()}`);
      }

      const query = db(t.getWithNickName()).orderBy(
        t.addNicknameToString("created_at"),
        "desc"
      );

      return filter ? query.where(filter) : query;
    },
    add(data) {
      return db(t.getName()).insert(data, ["*"]);
    },
    edit(filter, data) {
      if (!filter) {
        const errorMessage = `Filter required for updating within ${t.getName()}`;
        throw new Error(errorMessage);
      }

      return db(t.getName()).where(filter).update(data, ["*"]);
    },
    remove(id) {
      return db(t.getName()).where({ id }).delete();
    },
    ...t,
    db,
  };
}
