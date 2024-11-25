import { FC, useContext, useMemo } from 'react';
import { IHeadItem } from '../../../types/ITable';
import clsx from 'clsx';
import { Context } from '../context';

interface CellProps extends IHeadItem {}

const Cell: FC<CellProps> = ({ title, filter, id }) => {
	const { sorts, setSorts } = useContext(Context);
	const sort = useMemo(() => {
		return sorts.find((item) => item.id === id);
	}, [sorts]);
	return (
		<th
			onClick={() => {
				setSorts(
					sorts.map((item) => {
						if (item.id !== id) return item;
						if (!item.value) return { ...item, value: 'asc' };
						return {
							...item,
							value: item.value === 'asc' ? 'des' : 'asc',
						};
					})
				);
			}}
			className={clsx('', filter && ' cursor-pointer')}>
			{title}{' '}
			{filter && sort && <span>{sort.value === 'des' ? '^' : 'v'}</span>}
		</th>
	);
};

export default Cell;
