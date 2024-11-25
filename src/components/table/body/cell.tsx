interface CellProps {
	title: string;
	style?: React.CSSProperties;
}

const Cell = ({ title, style }: CellProps) => {
	return <td style={style}>{title}</td>;
};

export default Cell;
