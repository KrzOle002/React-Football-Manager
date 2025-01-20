import { Season } from '../models/seasonModel'

const seasons = [
	'2023/2024',
	'2024/2025',
	'2025/2026',
	'2026/2027',
	'2027/2028',
	'2028/2029',
	'2029/2030',
	'2030/2031',
	'2031/2032',
	'2032/2033',
	'2033/2034',
	'2034/2035',
	'2035/2036',
	'2036/2037',
	'2037/2038',
	'2038/2039',
	'2039/2040',
]

// Funkcja do sortowania po pierwszych 4 znakach (rok początkowy)
const sortSeasons = (a, b) => {
	// Porównanie pierwszych czterech znaków (rok początkowy)
	return a.substring(0, 4) - b.substring(0, 4)
}

export const createSeasons = async () => {
	try {
		// Sortowanie sezonów przed dodaniem do bazy danych
		const sortedSeasons = seasons.sort(sortSeasons)

		const seasonPromises = sortedSeasons.map(season => {
			return Season.findOrCreate({
				where: { name: season },
				defaults: { name: season },
			})
		})
		await Promise.all(seasonPromises)
		console.log('Seasons checked and added successfully if they did not exist.')
	} catch (error) {
		console.error('Error processing seasons:', error)
	}
}
