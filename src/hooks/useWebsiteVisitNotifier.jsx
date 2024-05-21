import { useEffect } from "react";
import { sendTelegramAlert } from "@/utils";

const useWebsiteVisitNotifier = () => {
	useEffect(() => {
		const userAgentProp = {
			platform: `${
				navigator.platform + " | " + navigator.userAgentData?.platform
			}`,
			vendor: `${
				navigator.vendor +
				" | " +
				navigator.userAgentData?.brands[0]?.brand
			}`,
		};

		sendTelegramAlert(
			"Someone just visited the 'Lumel Coding Assement' website   ::   " +
				JSON.stringify(userAgentProp)
		);
	}, []);

	return null;
};

export default useWebsiteVisitNotifier;
