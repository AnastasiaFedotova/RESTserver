export default {
  PORT: Number(process.env['API_PORT']) ?? 5000,
  HOST: process.env['API_HOST'] ?? 'localhost',
  NODE_ENV: process.env['NODE_ENV'],
  POSTGRES : {
    HOST: process.env['POSTGRES_HOST'] ?? 'localhost',
    USER: process.env['POSTGRES_USER'] ?? "postgres",
    PASSWORD: process.env['POSTGRES_PASSWORD'] ?? 'mysecretpassword',
    DB: process.env['POSTGRES_DB'] ?? 'postgres',
  }
};
