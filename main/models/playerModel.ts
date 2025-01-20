import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'

class Player extends Model {
	public id!: number
	public firstName!: string
	public lastName!: string
	public birthday!: Date
	public nationality!: string
	public foot!: string
	public height!: number
	public weight!: number
	public minPotential!: number
	public maxPotential!: number
	public createdAt!: Date
	public updatedAt!: Date
}

Player.init(
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		birthday: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		nationality: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		foot: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		height: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		weight: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		minPotential: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		maxPotential: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'players',
		timestamps: true,
	}
)

export { Player }
