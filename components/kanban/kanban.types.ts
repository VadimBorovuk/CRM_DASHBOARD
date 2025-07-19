import type { EnumStatus } from '~/types/tasks.types'

export interface ICard {
	id: string
	title: string
	description: string
	priority: number
	status: string
	performer: string
	$createdAt: string
}

export interface IColumn {
	id: EnumStatus
	name: string
	items: ICard[]
}

export interface DropResult {
	removedIndex: number | null
	addedIndex: number | null
	payload?: undefined
}
