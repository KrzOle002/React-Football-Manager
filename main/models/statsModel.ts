import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index'
import { Player } from './playerModel'
import { Season } from './seasonModel'

class Stats extends Model {
	public id!: number
	public shirtNumber!: number
	public age!: number
	public position!: string
	public rating!: number
	public skills!: number
	public weakFoot!: number
	public pace!: number
	public shooting!: number
	public passing!: number
	public dribbling!: number
	public defending!: number
	public physical!: number
	public idPlayer!: number
	public idSeason!: number
	public createdAt!: Date
	public updatedAt!: Date
}

Stats.init(
	{
		shirtNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		age: {
			type: DataTypes.INTEGER,
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
		skills: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		weakFoot: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		pace: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		shooting: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		passing: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		dribbling: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		defending: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		physical: {
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
		modelName: 'stats',
		timestamps: true,
	}
)

Player.hasMany(Stats, { foreignKey: 'idPlayer' })
Season.hasMany(Stats, { foreignKey: 'idSeason' })
Stats.belongsTo(Player, { foreignKey: 'idPlayer' })
Stats.belongsTo(Season, { foreignKey: 'idSeason' })

export { Stats }
