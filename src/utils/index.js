export const sendTelegramAlert = async (message) => {
	try {
		const { VITE_APP_TELEGRAM_BOT_TOKEN, VITE_APP_TELEGRAM_BOT_CHAT_ID } =
			import.meta.env;

		if (!VITE_APP_TELEGRAM_BOT_TOKEN || !VITE_APP_TELEGRAM_BOT_CHAT_ID) {
			throw new Error("Missing Telegram Bot Token or Chat ID");
		}

		const BOT_CONFIG = {
			token: VITE_APP_TELEGRAM_BOT_TOKEN,
			chatId: VITE_APP_TELEGRAM_BOT_CHAT_ID,
		};

		await fetch(
			`https://api.telegram.org/bot${BOT_CONFIG.token}/sendMessage?chat_id=${BOT_CONFIG.chatId}&text=${message}`,
			{ method: "GET" }
		);
		// console.log("TELEGRAM API SUCCESS **");
	} catch (err) {
		console.log("TELEGRAM API ERROR ::", err);
	}
};
