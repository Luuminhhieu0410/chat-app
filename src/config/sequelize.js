import dotenv from 'dotenv' ;
dotenv.config();
import Sequelize from 'sequelize';
let sequelize;
try {
    sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.MYSQL_USER,process.env.MYSQL_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'mysql',
    port: process.env.DATABASE_PORT,
    // define: {
    //   timestamps:false,
    //   freezeTableName: true, // Tránh tự động đổi tên bảng
    // }
});
} catch (error) {
  console.log("error test : " + error);
  
}
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;