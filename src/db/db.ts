import { getConnection, createConnection } from 'typeorm';
import config from '../common/ormconfig';

const connectToDB = async () => {
  let connection;

  try {
    connection = getConnection();
  } catch(err) {
    console.log(err)
  }

  try {
    if (connection) {
      if (!connection.isConnected) await connection.connect();
    } else {
      createConnection(config)
    }

    console.log('Typeorm: connected');
  } catch(err) {
    console.log('TypeormError', err);
  }
}

export const tryDBconnect = async (cb: () => void) => {
  try {
    await connectToDB();
    cb()
  } catch(err) {
    console.log(err)
  }
}
