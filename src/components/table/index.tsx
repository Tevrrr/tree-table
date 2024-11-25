import { Head } from './head';
import { Body } from './body';
import { DataType, ITable } from '../../types/ITable';
import Provider, { Context } from './context';
import { useContext, useEffect } from 'react';
import { ISort } from '../../types/ISort';

interface TableProps<T extends DataType<T>> {
	data: ITable<T>;
	onSort?: (sorts: ISort<T>[]) => void;
}

const Table = <T extends DataType<T>>({ data, onSort }: TableProps<T>) => {
	const { setData, sorts } = useContext(Context);

	useEffect(() => {
		setData(data);
	}, [data]);

	useEffect(() => {
		onSort?.(sorts);
	}, [sorts]);

	return (
		<table className=' w-96 border border-gray-300 bg-gray-50 border-collapse table-auto  '>
			<Head />
			<Body />
		</table>
	);
};

export const withProvider = <T extends DataType<T>>(
	Component: React.ComponentType<TableProps<T>>
) => {
	return (props: TableProps<T>) => (
		<Provider>
			<Component {...props} />
		</Provider>
	);
};

export default withProvider(Table);
