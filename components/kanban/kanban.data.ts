import {EnumStatus} from '~/types/tasks.types'
import type {IColumn, IPriority} from './kanban.types'

export const KANBAN_DATA: IColumn[] = [
	{
		id: EnumStatus.todo,
		name: 'Todo',
		items: [],
	},
	{
		id: EnumStatus['in-progress'],
		name: 'In progress',
		items: [],
	},
	{
		id: EnumStatus.ready,
		name: 'Ready',
		items: [],
	},
	{
		id: EnumStatus.testing,
		name: 'Testing',
		items: [],
	},
	{
		id: EnumStatus.done,
		name: 'Done',
		items: [],
	},
]


export const PRIORITY_DATA: IPriority[] = [
	{
		id: 1,
		name: 'Low'
	},
	{
		id: 2,
		name: 'Medium'
	},
	{
		id: 3,
		name: 'High'
	},
]

