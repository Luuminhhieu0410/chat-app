import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class messages_room extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        room_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "chat_rooms",
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        message_type: {
          type: DataTypes.ENUM("text", "media", "mixed"),
          allowNull: true,
          defaultValue: "text",
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "messages_room",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "room_id",
            using: "BTREE",
            fields: [{ name: "room_id" }],
          },
          {
            name: "user_id",
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
        ],
      }
    );
  }
}
