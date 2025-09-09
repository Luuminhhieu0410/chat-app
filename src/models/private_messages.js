import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class private_messages extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        sender_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        receiver_id: {
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
        is_read: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
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
        tableName: "private_messages",
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
            name: "sender_id",
            using: "BTREE",
            fields: [{ name: "sender_id" }],
          },
          {
            name: "receiver_id",
            using: "BTREE",
            fields: [{ name: "receiver_id" }],
          },
        ],
      }
    );
  }
}
