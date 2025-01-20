import { IpcHandler } from '../main/preload'

declare global {
	interface Window {
		ipc: {
			send: (channel: string, data: unknown) => void
			on: (channel: string, callback: (...args: unknown[]) => void) => void
			invoke: (channel: string, data?: unknown) => Promise<any>
		}
	}
}
