import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
	// Wysyła wiadomość do main procesu
	send(channel: string, value: unknown) {
		ipcRenderer.send(channel, value)
	},

	// Nasłuchuje na wiadomości z main procesu
	on(channel: string, callback: (...args: unknown[]) => void) {
		const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args)
		ipcRenderer.on(channel, subscription)

		return () => {
			ipcRenderer.removeListener(channel, subscription)
		}
	},

	// Wywołuje metodę w main procesie i zwraca wynik
	invoke(channel: string, data?: unknown) {
		return ipcRenderer.invoke(channel, data)
	},
}

// Udostępnia ipc renderer w procesie renderera (browser window)
contextBridge.exposeInMainWorld('ipc', handler)

export type IpcHandler = typeof handler
