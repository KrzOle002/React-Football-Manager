import { ipcMain } from 'electron'
import { Player } from '../models/playerModel'

// Tworzenie nowego piłkarza
ipcMain.handle('player:create', async (_event, playerData) => {
	const player = await Player.create(playerData)
	return player
})

// Pobieranie listy piłkarzy z paginacją i filtrowaniem
ipcMain.handle('player:list', async (_event, { page = 1, pageSize = 10, filters = {} }) => {
	const offset = (page - 1) * pageSize
	const where = {}

	if (filters.name) {
		where['name'] = { $like: `%${filters.name}%` }
	}
	if (filters.position) {
		where['position'] = filters.position
	}
	if (filters.season) {
		where['season'] = filters.season
	}

	const { rows, count } = await Player.findAndCountAll({
		where,
		offset,
		limit: pageSize,
		order: [['rating', 'DESC']], // Sortuj np. po ratingu
	})

	// Przekształcamy dane na format JSON (usuwając metadane)
	const players = rows.map(player => player.toJSON())

	return { players, total: count }
})

// Pobieranie szczegółów piłkarza
ipcMain.handle('player:get', async (_event, id) => {
	const player = await Player.findByPk(id)
	return player || { error: 'Player not found' }
})

// Aktualizacja piłkarza
ipcMain.handle('player:update', async (event, { playerId, updatedPlayer }) => {
	try {
		const player = await Player.findByPk(playerId)
		if (!player) {
			return { success: false, error: 'Player not found' } // Błąd, jeśli nie znaleziono zawodnika
		}

		// Aktualizacja zawodnika
		await player.update(updatedPlayer)

		return { success: true, updatedPlayer: player } // Sukces
	} catch (error) {
		console.error('Error updating player:', error)
		return { success: false, error: 'Failed to update player' } // Błąd, jeśli wystąpił problem
	}
})

// Usuwanie piłkarza
ipcMain.handle('player:delete', async (_event, id) => {
	const player = await Player.findByPk(id)
	if (!player) {
		return { error: 'Player not found' }
	}

	await player.destroy()
	return { success: true }
})
