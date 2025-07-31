import {EnumStatus} from '~/types/tasks.types'
import type {IColumn, IConfigSelectOptions} from './kanban.types'

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


export const PRIORITY_DATA: IConfigSelectOptions[] = [
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

export const STATUS_DATA: IConfigSelectOptions[] = [
	{
		id: 'todo',
		name: 'Todo'
	},
	{
		id: 'in-progress',
		name: 'In progress'
	},
	{
		id: 'ready',
		name: 'Ready'
	},
	{
		id: 'testing',
		name: 'Testing'
	},
	{
		id: 'done',
		name: 'Done'
	},
]


