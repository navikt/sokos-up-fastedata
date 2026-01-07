import dayjs from "dayjs";

export function formatDate(value?: string) {
	return dayjs(value).format("DD.MM.YYYY");
}
