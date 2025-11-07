const app = require('./app');
const { sequelize } = require('./models');
const logger = require('./utils/logger');

const PORT = Number(process.env.API_PORT || process.env.PORT || 3000);

async function bootstrap() {
  try {
    await sequelize.authenticate();
    logger.info('Connected to MySQL');
  } catch (error) {
    logger.error('Database connection failed', error.message);
  }

  app.listen(PORT, () => {
    logger.info(`API server listening on port ${PORT}`);
  });
}

bootstrap();
