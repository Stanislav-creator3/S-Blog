
export function formatDate(
	dateString: string | Date,
	includeTime: boolean = false
) {
	const date = new Date(dateString)

	const day = date.getDate()
	const month = date.getMonth()
	const year = date.getFullYear()

	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')



	let formattedDate = `${day}.${month}.${year}`

	if (includeTime) {
		formattedDate += `, ${hours}:${minutes}`
	}

	return formattedDate
}
