export interface IBaseField {
	$createdAt: string
	$id: string
}

export interface IPerformer extends IBaseField {
	name: string
	email: string
	avatar_url: string
}

export interface IComment extends IBaseField {
	text: string
}

export enum EnumStatus {
	'todo' = 'todo',
	'in-progress' = 'in-progress',
	'ready' = 'ready',
	'testing' = 'testing',
	'done' = 'done',
}

export interface ITask extends IBaseField {
	comments: IComment[]
	performer: IPerformer
	title: string
	description: string
	priority: number
	status: EnumStatus
}
