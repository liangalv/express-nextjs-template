import {sequelize} from '../../db/models/index.cjs';
//This establishes the intial connection
const dbAuthenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connection Established');
  } catch (error) {
    console.error('Unable to connect to database: ', error);
  }
};

export default dbAuthenticate;
