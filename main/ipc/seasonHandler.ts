import { ipcMain } from 'electron'
import { Season } from '../models/seasonModel'
import { Player } from '../models/playerModel'
import { Stats } from '../models/statsModel'

ipcMain.handle('season:players', async (_event, { seasonId }) => {
	try {
		// Znajdujemy sezon na podstawie ID
		const season = await Season.findByPk(seasonId)
		if (!season) {
			return { success: false, error: 'Season not found' }
		}

		// Pobieramy zawodników powiązanych z sezonem poprzez `Stats`
		const players = await Player.findAll({
			include: [
				{
					model: Stats,
					where: { idSeason: seasonId }, // Łączymy przez `Stats` i filtrujemy po `idSeason`
					attributes: [], // Nie pobieramy danych z `Stats`, tylko ich używamy do połączenia
				},
			],
			order: [['createdAt', 'ASC']], // Opcjonalne sortowanie po dacie utworzenia
		})

		const playerList = players.map(player => player.toJSON())
		return { success: true, players: playerList }
	} catch (error) {
		console.error('Error fetching players for season:', error)
		return { success: false, error: 'Failed to fetch players for the season' }
	}
})
