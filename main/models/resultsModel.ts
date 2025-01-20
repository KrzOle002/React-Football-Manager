import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'
import { Player } from './playerModel'
import { Season } from './seasonModel'

class Results extends Model {
	public id!: number
	public matches!: number
	public goals!: number
	public assists!: number
	public cleanSheets!: number
	public yellowCards!: number
	public redCards!: number
	public idPlayer!: number
	public idSeason!: number
	public createdAt!: Date
	public updatedAt!: Date
}

Results.init(
	{
		matches: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		goals: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		assists: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		cleanSheets: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		yellowCards: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		redCards: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idPlayer: {
			type: DataTypes.INTEGER,
			references: {
				model: Player,
				key: 'id',
			},
			allowNull: false,
		},
		idSeason: {
			type: DataTypes.INTEGER,
			references: {
				model: Season,
				key: 'id',
			},
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'results',
		timestamps: true,
	}
)

Player.hasMany(Results, { foreignKey: 'idPlayer' })
Season.hasMany(Results, { foreignKey: 'idSeason' })
Results.belongsTo(Player, { foreignKey: 'idPlayer' })
Results.belongsTo(Season, { foreignKey: 'idSeason' })

export { Results }
