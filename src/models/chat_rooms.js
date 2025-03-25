import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('chat_rooms', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "name"
    },
    created_by_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'chat_rooms',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "created_by_user",
        using: "BTREE",
        fields: [
          { name: "created_by_user" },
        ]
      },
    ]
  });
};
