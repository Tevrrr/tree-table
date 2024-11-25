import Row from './row';
import { useContext } from 'react';
import { Context } from '../context';

const Body = () => {
	const { data } = useContext(Context);
	return (
		<tbody>
			{data?.body.map((item) => (
				<Row data={item} />
			))}
		</tbody>
	);
};

export default Body;
