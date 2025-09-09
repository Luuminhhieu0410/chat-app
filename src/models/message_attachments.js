import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class message_attachments extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        message_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "messages_room",
            key: "id",
          },
        },
        private_message_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "private_messages",
            key: "id",
          },
        },
        file_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        file_type: {
          type: DataTypes.BLOB,
          allowNull: true,
          defaultValue: "image",
        },
        file_size: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "message_attachments",
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
            name: "message_id",
            using: "BTREE",
            fields: [{ name: "message_id" }],
          },
          {
            name: "private_message_id",
            using: "BTREE",
            fields: [{ name: "private_message_id" }],
          },
        ],
      }
    );
  }
}
