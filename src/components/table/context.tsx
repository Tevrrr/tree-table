import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { DataType, IHeadItem, ITable } from '../../types/ITable';
import { ISort } from '../../types/ISort';

interface InitialStateType {
	data: ITable<any> | null;
	valueOrder: string[];
	opennedRows: number[];
	sorts: ISort<any>[];
	setSorts: (sorts: ISort<any>[]) => void;
	setData: (value: ITable<any>) => void;
	toggleRow: (id: number) => void;
}

const initialState: InitialStateType = {
	data: null,
	valueOrder: [],
	opennedRows: [],
	sorts: [],
	setSorts() {},
	setData() {},
	toggleRow() {},
};

export const Context = createContext<InitialStateType>(initialState);

interface ProviderProps<T extends DataType<T>> {
	children: ReactNode;
	initData?: ITable<T>;
}

const Provider = <T extends DataType<T>>({
	children,
	initData,
}: ProviderProps<T>) => {
	const [data, setData] = useState<ITable<T> | null>(initData || null);
	const [opennedRows, setOpennedRows] = useState<number[]>([]);
	const [sorts, setSorts] = useState<ISort<T>[]>([]);

	useEffect(() => {
		if (data?.head && !sorts.length) {
			const sorts: ISort<T>[] = (
				Object.entries(data?.head) as [keyof T, IHeadItem][]
			)
				.map(([key, value]) => {
					if (value.filter)
						return {
							key,
							id: value.id,
							value: null,
						};
				})
				.filter((item) => !!item);
			setSorts(sorts);
		}
	}, [data?.head, opennedRows, sorts]);

	const toggleRow = (id: number) => {
		if (opennedRows.includes(id)) {
			setOpennedRows(opennedRows.filter((item) => item !== id));
		} else {
			setOpennedRows([...opennedRows, id]);
		}
	};

	const valueOrder = useMemo(() => {
		if (data) {
			return (Object.entries(data.head) as [string, IHeadItem][])
				.filter(([, value]) => !value.hidden)
				.map(([key]) => key);
		} else return [];
	}, [data]);
	return (
		<Context.Provider
			value={{
				data,
				valueOrder,
				sorts,
				setSorts,
				setData,
				opennedRows,
				toggleRow,
			}}>
			{children}
		</Context.Provider>
	);
};

export default Provider;
