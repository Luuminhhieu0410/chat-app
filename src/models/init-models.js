import chat_rooms from "./chat_rooms.js";
import messages from "./messages.js";
import private_messages from "./private_messages.js";
import room_members from "./room_members.js";
import users from "./users.js";
import { DataTypes } from "sequelize";

export default function initModels(sequelize) {
  const chatRooms = chat_rooms(sequelize, DataTypes);
  const Messages = messages(sequelize, DataTypes);
  const PrivateMessages = private_messages(sequelize, DataTypes);
  const RoomMembers = room_members(sequelize, DataTypes);
  const Users = users(sequelize, DataTypes);

  Messages.belongsTo(chatRooms, { as: "room", foreignKey: "room_id" });
  chatRooms.hasMany(Messages, { as: "messages", foreignKey: "room_id" });
  RoomMembers.belongsTo(chatRooms, { as: "room", foreignKey: "room_id" });
  chatRooms.hasMany(RoomMembers, { as: "room_members", foreignKey: "room_id" });
  chatRooms.belongsTo(Users, { as: "created_by_user_user", foreignKey: "created_by_user" });
  Users.hasMany(chatRooms, { as: "chat_rooms", foreignKey: "created_by_user" });
  Messages.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(Messages, { as: "messages", foreignKey: "user_id" });
  PrivateMessages.belongsTo(Users, { as: "sender", foreignKey: "sender_id" });
  Users.hasMany(PrivateMessages, { as: "private_messages", foreignKey: "sender_id" });
  PrivateMessages.belongsTo(Users, { as: "receiver", foreignKey: "receiver_id" });
  Users.hasMany(PrivateMessages, { as: "receiver_private_messages", foreignKey: "receiver_id" });
  RoomMembers.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(RoomMembers, { as: "room_members", foreignKey: "user_id" });

  return {
    chatRooms,
    Messages,
    PrivateMessages,
    RoomMembers,
    Users,
  };
}
