import type {EnumStatus, IPerformer} from '~/types/tasks.types'


export interface ICard {
	id: string
	title: string
	description: string
	priority: number
	status: string
	performer: IPerformer
	$createdAt: string
}

export interface IColumn {
	id: EnumStatus
	name: string
	items: ICard[]
}


export interface IConfigSelectOptions {
	id: number | string
	name: string
}
