import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'

class Season extends Model {
	public id!: number
	public name!: string
	public createdAt!: Date
	public updatedAt!: Date
}

Season.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'season',
		timestamps: true,
	}
)

export { Season }
