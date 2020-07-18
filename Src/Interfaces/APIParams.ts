
export interface IAPIParams {
	endpoint: string
	method: 'GET' | 'POST' | 'DELETE' | 'PUT'
	content?: string
}
