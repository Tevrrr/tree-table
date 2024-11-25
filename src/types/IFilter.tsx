import { DataType } from './ITable';

export interface IFilter<T> {
	key: keyof T;
	value: string;
}
