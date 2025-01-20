import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

interface Player {
	id: number
	name: string
	rating: number
	season: number
}

export default function HomePage() {
	const [message, setMessage] = React.useState('No message found')
	const [players, setPlayers] = React.useState<Player[]>([])
	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			window.ipc.on('message', (message: string) => {
				setMessage(message)
			})
		}
	}, [])

	// Funkcja do tworzenia piłkarza
	// const createPlayer = async () => {
	// 	if (typeof window !== 'undefined') {
	// 		const newPlayer = {
	// 			name: 'Lionel Messi',
	// 			position: 'Forward',
	// 			rating: 93,
	// 			season: 1,
	// 		}
	// 		const response = await window.ipc.invoke('player:create', newPlayer)
	// 		console.log(response)
	// 	}
	// }

	// Funkcja do pobierania piłkarzy
	const fetchPlayers = async () => {
		if (typeof window !== 'undefined') {
			const filters = { position: 'Forward' }
			const response = await window.ipc.invoke('player:list', {
				page: 1,
				pageSize: 10,
				filters,
			})
			setPlayers(response.players)
		}
	}
	const fetchPlayer = async () => {
		if (typeof window !== 'undefined') {
			const response = await window.ipc.invoke('player:get', 1)
			return await response
		}
	}

	// const updatePlayer = async (playerId: number, updatedPlayer: { name: string; position: string; rating: number; season: number }) => {
	// 	if (typeof window !== 'undefined') {
	// 		try {
	// 			// Wywołanie IPC do aktualizacji zawodnika
	// 			const response = await window.ipc.invoke('player:update', { playerId, updatedPlayer })

	// 			// Sprawdzamy, czy odpowiedź zawiera success
	// 			if (response) {
	// 				if (response) {
	// 					console.log('Player updated successfully:', response as Player)
	// 					// Zaktualizuj stan, jeśli zawodnik został zaktualizowany
	// 					setPlayers(prevPlayers => prevPlayers.map(player => (player.id === playerId ? { ...player, ...updatedPlayer } : player)))
	// 				} else {
	// 					console.log('Failed to update player:', response.error || 'Unknown error')
	// 				}
	// 			} else {
	// 				console.error('Invalid response format:', response)
	// 			}
	// 		} catch (error) {
	// 			console.error('Error updating player:', error)
	// 		}
	// 	}
	// }

	React.useEffect(() => {
		fetchPlayers()
	}, [])
	return (
		<React.Fragment>
			<Head>
				<title>Home - Nextron (basic-lang-typescript)</title>
			</Head>
			<div>
				<p>
					⚡ Electron + Next.js ⚡ -<Link href='/next'>Go to next page</Link>
				</p>
				<Image src='/images/logo.png' alt='Logo image' width={256} height={256} />
			</div>
			<div>
				<button
					onClick={() => {
						fetchPlayers()
					}}>
					Fetch Players
				</button>
				<button
					onClick={() => {
						fetchPlayer().then(response => {
							console.log(response)
						})
					}}>
					Fetch Player
				</button>

				<p>{message}</p>
				<ul>
					{players.length > 0 ? (
						players.map((player: any, index: number) => (
							<li key={index}>
								{player.name} - {player.position} - Rating: {player.rating} - Season: {player.season}
							</li>
						))
					) : (
						<p>No players found.</p>
					)}
				</ul>
			</div>
		</React.Fragment>
	)
}
