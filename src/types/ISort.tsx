export interface ISort<T> {
	key: keyof T;
	id: number;
	value: null | 'asc' | 'des';
}
