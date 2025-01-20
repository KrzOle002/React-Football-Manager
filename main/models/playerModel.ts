import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'

class Player extends Model {
	public id!: number
	public name!: string
	public position!: string
	public rating!: number
	public season!: number
	public createdAt!: Date
	public updatedAt!: Date
}

Player.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		position: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		season: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'player',
		timestamps: true,
	}
)

export { Player }
