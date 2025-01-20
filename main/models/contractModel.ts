import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'
import { Player } from './playerModel'
import { Season } from './seasonModel'

class Contract extends Model {
	public id!: number
	public value!: number
	public wage!: number
	public clubName!: string
	public clubNationality!: string
	public clubLeague!: number
	public idPlayer!: number
	public idSeason!: number
	public createdAt!: Date
	public updatedAt!: Date
}

Contract.init(
	{
		value: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		wage: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		clubName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		clubNationality: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		clubLeague: {
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
		modelName: 'contract',
		timestamps: true,
	}
)

Player.hasMany(Contract, { foreignKey: 'idPlayer' })
Season.hasMany(Contract, { foreignKey: 'idSeason' })
Contract.belongsTo(Player, { foreignKey: 'idPlayer' })
Contract.belongsTo(Season, { foreignKey: 'idSeason' })

export { Contract }
