import { toast } from "react-toastify";

export async function displayToastAfterFetch(
	res: Response,
	data: any,
	callback?: any
) {
	if (res.status === 200) {
		toast.success(data.message, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 2000,
			theme: "dark",
			style: {
				backgroundColor: "gray",
			},
		});
		if (callback) callback();
	} else {
		toast.error(data.message, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 2000,
			theme: "dark",
			style: {
				backgroundColor: "gray",
			},
		});
	}
}
