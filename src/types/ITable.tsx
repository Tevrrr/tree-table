export interface ITableItem<T extends DataType<T>> {
	id: number;
	data: DataType<T>;
	children?: ITableItem<T>[];
}

export interface ITable<T extends DataType<T>> {
	head: DataType<T, IHeadItem>;
	body: ITableItem<T>[];
}

export interface IHeadItem {
	id: number;
	title: string;
	filter?: boolean;
	search?: boolean;
	hidden?: boolean;
	required?: boolean;
}

export type DataType<T, V = string> = { [K in keyof T]: V };
