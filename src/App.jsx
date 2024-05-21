import Table from "@/components/Table";

import useWebsiteVisitNotifier from "@/hooks/useWebsiteVisitNotifier";
import { TABLE_COLUMN_NAMES } from "@/constants";
import data from "@/assets/data.json";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@/styles/global.scss";

const App = () => {
	useWebsiteVisitNotifier();

	return (
		<>
			<div className="app">
				<Table data={data.rows} columns={TABLE_COLUMN_NAMES} />
			</div>
		</>
	);
};

export default App;
