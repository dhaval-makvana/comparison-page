import {
	FETCH_COMPARISON_DATA,
	ADD_PRODUCT,
	REMOVE_PRODUCT,
	SHOW_ONLY_DIFFERENCE,
} from "./types";

const fetchComparisonData = () => async (dispatch) => {
	const URL = "http://www.mocky.io/v2/5e9ebdaa2d00007800cb7697";
	let products = [],
		error = null;

	try {
		const response = await fetch(URL).then(async (response) => response.json());
		products = response.products;
	} catch (err) {
		error = err;
	}

	return dispatch({
		type: FETCH_COMPARISON_DATA,
		payload: { products, error },
	});
};

const addProduct = (id) => async (dispatch) => {
	return dispatch({
		type: ADD_PRODUCT,
		payload: id,
	});
};

const removeProduct = (id) => async (dispatch) => {
	return dispatch({
		type: REMOVE_PRODUCT,
		payload: id,
	});
};

const showDifference = () => async (dispatch) => {
	return dispatch({
		type: SHOW_ONLY_DIFFERENCE,
	});
};

export { fetchComparisonData, addProduct, removeProduct, showDifference };
