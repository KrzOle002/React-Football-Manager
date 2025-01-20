import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import sequelize from './database'
import './ipc/playerHandler'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
	serve({ directory: 'app' })
} else {
	app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
	await app.whenReady()
	// Inicjalizacja bazy danych
	try {
		await sequelize.sync() // Synchronizacja modeli z bazą
		console.log('Database connected successfully')
	} catch (error) {
		console.error('Failed to connect to the database:', error)
	}

	const mainWindow = createWindow('main', {
		width: 1000,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	})

	if (isProd) {
		await mainWindow.loadURL('app://./home')
	} else {
		const port = process.argv[2]
		await mainWindow.loadURL(`http://localhost:${port}/home`)
		mainWindow.webContents.openDevTools()
	}
})()

app.on('window-all-closed', () => {
	app.quit()
})

ipcMain.on('message', async (event, arg) => {
	event.reply('message', `${arg} World!`)
})
