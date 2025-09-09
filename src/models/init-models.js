import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _chat_rooms from  "./chat_rooms.js";
import _messages from  "./messages.js";
import _private_messages from  "./private_messages.js";
import _room_members from  "./room_members.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const chat_rooms = _chat_rooms.init(sequelize, DataTypes);
  const messages = _messages.init(sequelize, DataTypes);
  const private_messages = _private_messages.init(sequelize, DataTypes);
  const room_members = _room_members.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  messages.belongsTo(chat_rooms, { as: "room", foreignKey: "room_id"});
  chat_rooms.hasMany(messages, { as: "messages", foreignKey: "room_id"});
  room_members.belongsTo(chat_rooms, { as: "room", foreignKey: "room_id"});
  chat_rooms.hasMany(room_members, { as: "room_members", foreignKey: "room_id"});
  chat_rooms.belongsTo(users, { as: "created_by_user_user", foreignKey: "created_by_user"});
  users.hasMany(chat_rooms, { as: "chat_rooms", foreignKey: "created_by_user"});
  messages.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(messages, { as: "messages", foreignKey: "user_id"});
  private_messages.belongsTo(users, { as: "sender", foreignKey: "sender_id"});
  users.hasMany(private_messages, { as: "private_messages", foreignKey: "sender_id"});
  private_messages.belongsTo(users, { as: "receiver", foreignKey: "receiver_id"});
  users.hasMany(private_messages, { as: "receiver_private_messages", foreignKey: "receiver_id"});
  room_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(room_members, { as: "room_members", foreignKey: "user_id"});

  return {
    chat_rooms,
    messages,
    private_messages,
    room_members,
    users,
  };
}
