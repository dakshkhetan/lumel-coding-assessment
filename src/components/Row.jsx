import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Row = ({
	level,
	row,
	handleInputChange,
	updateByPercentage,
	updateByValue,
}) => {
	return (
		<>
			<tr>
				<td>{"--".repeat(level) + " " + row.label}</td>
				<td>{row.value}</td>
				<td>
					<TextField
						placeholder="Enter value or %"
						onChange={(e) =>
							handleInputChange(row.id, e.target.value)
						}
					/>
				</td>
				<td>
					<Button
						variant="outlined"
						onClick={() => updateByPercentage(row.id)}
					>
						Apply
					</Button>
				</td>
				<td>
					<Button
						variant="outlined"
						onClick={() => updateByValue(row.id)}
					>
						Apply
					</Button>
				</td>
				<td>{row.variance ?? 0}%</td>
			</tr>
		</>
	);
};

export default Row;
