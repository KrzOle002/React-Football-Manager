import { Sequelize } from 'sequelize'

const isProd = process.env.NODE_ENV === 'production'

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: isProd ? process.env.PRODUCTION_DATABASE_ADDRESS : 'localhost',
	port: 5432,
	username: isProd ? process.env.PRODUCTION_DATABASE_USER : 'postgres',
	password: isProd ? process.env.PRODUCTION_DATABASE_PASSWORD : 'haslo_1234567',
	database: isProd ? process.env.PRODUCTION_DATABASE_NAME : 'postgres',
	logging: false,
})
export default sequelize
