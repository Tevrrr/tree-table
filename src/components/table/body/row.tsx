import Cell from './cell';
import { DataType, ITableItem } from '../../../types/ITable';
import clsx from 'clsx';
import { useContext } from 'react';
import { Context } from '../context';

interface RowProps<T extends DataType<T>> {
	data: ITableItem<T>;
	isParent?: boolean;
	isOpen?: boolean;
	onClick?: () => void;
	depth?: number;
}

const Row = <T extends DataType<T>>({
	data,
	isParent = false,
	isOpen,
	depth = 0,
	onClick,
}: RowProps<T>) => {
	const { valueOrder } = useContext(Context);

	return (
		<tr
			onClick={onClick}
			style={{
				gridTemplateColumns: `repeat(${valueOrder.length}, minmax(0, 1fr))`,
			}}
			className={clsx(
				' relative  bg-gray-200 odd:bg-gray-100 hover:opacity-80 transition-all duration-150 grid  px-2 pl-4',
				isParent && ' cursor-pointer'
			)}>
			{isParent && (
				<div
					style={{
						paddingLeft: `${depth ? 8 * depth : 0}px`,
					}}
					className=' absolute left-1 top-0 bottom-0 flex items-center justify-center'>
					{' '}
					<span
						className={clsx(
							' transition-all duration-100',
							!isOpen && ' rotate-90',
							isOpen && ' -rotate-90'
						)}>
						{'>'}
					</span>
				</div>
			)}
			{(valueOrder as (keyof DataType<object>)[]).map((item, index) => {
				if (!index && depth && depth > 0)
					return (
						<Cell
							style={{
								paddingLeft: `${8 * depth}px`,
							}}
							title={data.data[item]}
						/>
					);
				return <Cell title={data.data[item]} />;
			})}
		</tr>
	);
};

const drawRow = <T extends DataType<T>>({
	data,
	depth,
}: Omit<RowProps<T>, 'isOpen' | 'isParent' | 'onClick'>): JSX.Element => {
	if (!data.children || !data.children.length) {
		return <Row depth={depth} data={data} />;
	}
	const { opennedRows, toggleRow } = useContext(Context);

	const isOpen = opennedRows ? opennedRows.includes(data.id) : false;
	return (
		<>
			<Row
				onClick={() => {
					toggleRow(data.id);
				}}
				isParent
				depth={depth}
				isOpen={isOpen}
				data={data}
			/>
			{isOpen &&
				data.children.map((data) =>
					drawRow({
						data,
						depth: depth ? depth + 1 : 1,
					})
				)}
		</>
	);
};

export default drawRow;
