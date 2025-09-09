import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: "email",
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        avatar: {
          type: DataTypes.STRING(50),
          allowNull: true,
          defaultValue: "default_user.jpg",
        },
        is_online: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
        last_seen: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        connection_count: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "users",
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
            name: "email",
            unique: true,
            using: "BTREE",
            fields: [{ name: "email" }],
          },
        ],
      }
    );
  }
}
