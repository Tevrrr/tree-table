import { useState } from 'react';
import Table from './components/table';
import { IHeadItem, ITable, ITableItem } from './types/ITable';
import { ISort } from './types/ISort';
interface TableItemType {
	id: string;
	name: string;
	age: string;
}

type AnyObject = Record<string, string>;

function sortByRules<T extends AnyObject>(
	arr: ITableItem<TableItemType>[],
	sortRules: ISort<T>[]
): ITableItem<TableItemType>[] {
	return arr.sort((a, b) => {
		for (const rule of sortRules) {
			const { key, value } = rule;

			// Пропускаем ключи с null-значением порядка
			if (!value) continue;

			//@ts-ignore
			if (a.data[key] && b.data[key]) {
				//@ts-ignore
				const comparison = a.data[key].localeCompare(b.data[key]);
				// Учитываем порядок сортировки
				if (comparison !== 0) {
					return value === 'asc' ? comparison : -comparison;
				}
				//@ts-ignore
			} else if (a.data[key] && !b.data[key]) {
				return value === 'asc' ? -1 : 1;
				//@ts-ignore
			} else if (!a.data[key] && b.data[key]) {
				return value === 'asc' ? 1 : -1;
			}
		}
		return 0; // Если объекты равны по всем правилам сортировки
	});
}

function App() {
	const [data, setData] = useState<ITable<TableItemType>>({
		head: {
			id: { id: 1, title: 'ID', required: true, filter: true },
			name: { id: 2, title: 'Имя', filter: true },
			age: { id: 3, title: 'Возраст' },
		},
		body: [
			{
				id: 1,
				data: {
					id: '1',
					name: 'ABOBA',
					age: '11',
				},
			},
			{
				id: 3,
				data: {
					id: '3',
					name: 'ABOBA 2',
					age: '22',
				},
				children: [
					{
						id: 30,
						data: {
							id: '2.1',
							name: 'ABOBA 2.1',
							age: '13',
						},
						children: [
							{
								id: 111,
								data: {
									id: '2.1.1',
									name: 'ABOBA',
									age: '11',
								},
							},
							{
								id: 1222,
								data: {
									id: '2.1.2',
									name: 'ABOBA',
									age: '11',
								},
							},
							{
								id: 133,
								data: {
									id: '2.1.3',
									name: 'ABOBA',
									age: '11',
								},
							},
						],
					},
					{
						id: 4,
						data: {
							id: '2.2',
							name: 'ABOBA 2.2',
							age: '14',
						},
					},
				],
			},
			{
				id: 2,
				data: {
					id: '2',
					name: 'ABOBA',
					age: '33',
				},
			},
		],
	});

	const click = () => {
		setData({
			...data,
			head: {
				name: { id: 2, title: 'Имя' },
				id: { id: 1, title: 'ID', required: true },
				age: { id: 3, title: 'Возраст' },
			},
		});
	};

	const toggleHidden = (key: keyof TableItemType, value: boolean) => {
		setData({
			...data,
			head: {
				...data.head,
				[key]: {
					...data.head[key],
					hidden: value,
				},
			},
		});
	};

	return (
		<div className='  p-5'>
			<button onClick={click}>Click</button>
			<div className='flex gap-2'>
				{(
					Object.entries(data.head) as [
						keyof TableItemType,
						IHeadItem
					][]
				).map(([key, value]) => {
					return (
						<label>
							{' '}
							<input
								disabled={value.required}
								type='checkbox'
								checked={!(value.hidden || false)}
								onChange={(e) =>
									toggleHidden(key, !e.target.checked)
								}
							/>{' '}
							{value.title}
						</label>
					);
				})}
			</div>
			<Table
				data={data}
				onSort={(value) =>
					setData({ ...data, body: sortByRules(data.body, value) })
				}
			/>
		</div>
	);
}

export default App;
