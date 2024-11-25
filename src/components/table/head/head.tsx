import { FC, useContext, useMemo } from 'react';
import Cell from './cell';
import { Context } from '../context';

const Head: FC = () => {
	const { data } = useContext(Context);
	const filteredData = useMemo(() => {
		if (data?.head)
			return Object.entries(data?.head).filter(
				([, value]) => !value.hidden
			);
		else return [];
	}, [data]);
	return (
		<thead className=' border-b border-gray-300 text-left text-lg font-medium'>
			<tr
				style={{
					gridTemplateColumns: `repeat(${filteredData.length}, minmax(0, 1fr))`,
				}}
				className=' grid px-2  pl-4'>
				{filteredData.map(([, value]) => {
					return <Cell {...value} />;
				})}
			</tr>
		</thead>
	);
};

export default Head;
