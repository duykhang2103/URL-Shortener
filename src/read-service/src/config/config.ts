import * as fs from 'node:fs';
import dotenv from 'dotenv';
import * as Joi from 'joi';

let root = `${process.cwd()}`;

let pathENV = `${root}/.env.local`;
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case 'production':
    pathENV = `${root}/.env.production`;
    break;
  case 'development':
    pathENV = `${root}/.env.dev`;
    break;
}

console.log('pathENV: ', pathENV);

if (fs.existsSync(pathENV)) {
  // get from file env
  dotenv.config({ path: pathENV });
} else {
  console.log('DOES NOT exist:');
  // get env from config map and secret
}
// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  KAFKA_BROKER: Joi.string().required(),
  KAFKA_GROUP_ID: Joi.string().required(),
  KAFKA_URL_CREATED_TOPIC: Joi.string().default('url-created'),
  KAFKA_URL_DELETED_TOPIC: Joi.string().default('url-deleted'),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = () => ({
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT || 3000,
  DB_HOST: envVars.DB_HOST,
  DB_PORT: envVars.DB_PORT,
  DB_USERNAME: envVars.DB_USERNAME,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_NAME: envVars.DB_NAME,
  KAFKA_BROKER: envVars.KAFKA_BROKER,
  KAFKA_GROUP_ID: envVars.KAFKA_GROUP_ID,
  KAFKA_URL_CREATED_TOPIC: envVars.KAFKA_URL_CREATED_TOPIC || 'url-created',
  KAFKA_URL_DELETED_TOPIC: envVars.KAFKA_URL_DELETED_TOPIC || 'url-deleted',
});
