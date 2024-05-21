import { Fragment, useState, useEffect } from "react";

import Row from "./Row";

const Table = ({ data: initialData, columns }) => {
	const [data, setData] = useState(initialData ?? []);
	const [inputValue, setInputValue] = useState({});

	useEffect(() => {
		setData(initialData);
	}, [initialData]);

	const handleInputChange = (id, value) => {
		setInputValue((prev) => ({ ...prev, [id]: value }));
	};

	const updateByPercentage = (id) => {
		const percentage = parseInt(inputValue[id], 10);

		setData((prevData) =>
			prevData.map((row) => {
				if (
					row.id === id ||
					row.children.some((child) => child.id === id)
				) {
					const updatedRow = { ...row };
					if (row.id === id) {
						const increase = row.value * (percentage / 100);
						updatedRow.variance = (
							(increase / row.value) *
							100
						).toFixed(2);
						updatedRow.value += increase;
					}
					updatedRow.children = row.children.map((child) => {
						if (child.id === id) {
							const increase = child.value * (percentage / 100);
							child.variance = (
								(increase / child.value) *
								100
							).toFixed(2);
							child.value += increase;
						}
						return child;
					});
					return updatedRow;
				}
				return row;
			})
		);

		refreshParent(id);
	};

	const updateByValue = (id) => {
		const newValue = parseInt(inputValue[id], 10);

		setData((prevData) =>
			prevData.map((row) => {
				if (
					row.id === id ||
					row.children.some((child) => child.id === id)
				) {
					const updatedRow = { ...row };
					if (row.id === id) {
						const increase = newValue - row.value;
						updatedRow.variance = (
							(increase / row.value) *
							100
						).toFixed(2);
						updatedRow.value = newValue;
					}
					updatedRow.children = row.children.map((child) => {
						if (child.id === id) {
							const increase = newValue - child.value;
							child.variance = (
								(increase / child.value) *
								100
							).toFixed(2);
							child.value = newValue;
						}
						return child;
					});
					return updatedRow;
				}
				return row;
			})
		);

		refreshParent(id);
	};

	const refreshParent = (id) => {
		setData((prevData) =>
			prevData.map((row) => {
				if (row.children.some((child) => child.id === id)) {
					const updatedRow = { ...row };
					updatedRow.value = updatedRow.children.reduce(
						(sum, child) => sum + child.value,
						0
					);
					// const originalValue = initialData.find(
					// 	(r) => r.id === row.id
					// ).value;
					const originalValue = row.value;

					updatedRow.variance = (
						((updatedRow.value - originalValue) / originalValue) *
						100
					).toFixed(2);
					return updatedRow;
				}
				return row;
			})
		);
	};

	return (
		<>
			<table>
				<thead>
					<tr className="row__heading">
						{columns.map((column, index) => (
							<th key={index}>{column}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<Fragment key={index}>
							<Row
								level={0}
								row={row}
								handleInputChange={handleInputChange}
								updateByPercentage={updateByPercentage}
								updateByValue={updateByValue}
							/>

							{row.children.map((child) => (
								<Row
									key={child.id}
									level={1}
									row={child}
									handleInputChange={handleInputChange}
									updateByPercentage={updateByPercentage}
									updateByValue={updateByValue}
								/>
							))}
						</Fragment>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Table;
