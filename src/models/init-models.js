import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _chat_rooms from  "./chat_rooms.js";
import _message_attachments from  "./message_attachments.js";
import _messages_room from  "./messages_room.js";
import _private_messages from  "./private_messages.js";
import _room_members from  "./room_members.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const chat_rooms = _chat_rooms.init(sequelize, DataTypes);
  const message_attachments = _message_attachments.init(sequelize, DataTypes);
  const messages_room = _messages_room.init(sequelize, DataTypes);
  const private_messages = _private_messages.init(sequelize, DataTypes);
  const room_members = _room_members.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  messages_room.belongsTo(chat_rooms, { as: "room", foreignKey: "room_id"});
  chat_rooms.hasMany(messages_room, { as: "messages_rooms", foreignKey: "room_id"});
  room_members.belongsTo(chat_rooms, { as: "room", foreignKey: "room_id"});
  chat_rooms.hasMany(room_members, { as: "room_members", foreignKey: "room_id"});
  message_attachments.belongsTo(messages_room, { as: "message", foreignKey: "message_id"});
  messages_room.hasMany(message_attachments, { as: "message_attachments", foreignKey: "message_id"});
  message_attachments.belongsTo(private_messages, { as: "private_message", foreignKey: "private_message_id"});
  private_messages.hasMany(message_attachments, { as: "message_attachments", foreignKey: "private_message_id"});
  chat_rooms.belongsTo(users, { as: "created_by_user_user", foreignKey: "created_by_user"});
  users.hasMany(chat_rooms, { as: "chat_rooms", foreignKey: "created_by_user"});
  messages_room.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(messages_room, { as: "messages_rooms", foreignKey: "user_id"});
  private_messages.belongsTo(users, { as: "sender", foreignKey: "sender_id"});
  users.hasMany(private_messages, { as: "private_messages", foreignKey: "sender_id"});
  private_messages.belongsTo(users, { as: "receiver", foreignKey: "receiver_id"});
  users.hasMany(private_messages, { as: "receiver_private_messages", foreignKey: "receiver_id"});
  room_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(room_members, { as: "room_members", foreignKey: "user_id"});

  return {
    chat_rooms,
    message_attachments,
    messages_room,
    private_messages,
    room_members,
    users,
  };
}
