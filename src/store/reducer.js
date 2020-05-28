import { combineReducers } from "redux";
import { FETCH_COMPARISON_DATA, ADD_PRODUCT, REMOVE_PRODUCT, SHOW_ONLY_DIFFERENCE } from "./types";
import { getProducts, getFeatures, showDifferent, showDifferentSpec } from "../utils";

const initialState = {
	filter: {
		spec: {},
		products: [],
	},
	cache: {
		spec: {},
		products: []
	},
	products: [],
	spec: {},
	productDropdown: [],
	showOnlyDifference: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COMPARISON_DATA:
			const firstTimeProducts = getProducts(action.payload.products, state.showOnlyDifference);
			const firstTimeFeatures = getFeatures(action.payload.products, state.showOnlyDifference);
			return {
				...state,
				filter: {
					spec: firstTimeFeatures,
					products: [],
				},
				cache: {
					spec: firstTimeFeatures,
					products: [],
				},
				spec: firstTimeFeatures,
				products: firstTimeProducts,
				productDropdown: firstTimeProducts
			};
		
		case ADD_PRODUCT:
			const addId = action.payload;
			const addedProducts = state.products.filter((product) => addId === product.id);
			const updatedProductIdsOnAdd = state.productDropdown.filter((product) => addId !== product.id);
			const differentProductOnAdd = showDifferent(addedProducts, state.showOnlyDifference);
			return {
				...state,
				filter: {
					...state.filter,
					products: [...state.filter.products, ...differentProductOnAdd]
				},
				cache: {
					...state.cache,
					products: [...state.cache.products, ...differentProductOnAdd]
				},
				productDropdown: [...updatedProductIdsOnAdd]
			}
		
		case REMOVE_PRODUCT:
			const removeId = action.payload;
			const removedProducts = state.filter.products.filter((product) => removeId !== product.id);
			const updatedProductIdsOnRemove = state.products.filter((product) => removeId === product.id);
			const differentProductOnRemove = showDifferent(removedProducts, state.showOnlyDifference);
			return {
				...state,
				filter: {
					...state.filter,
					products: [...differentProductOnRemove]
				},
				cache: {
					...state.cache,
					products: [...differentProductOnRemove]
				},
				productDropdown: [...state.productDropdown, ...updatedProductIdsOnRemove]
			}
		
		case SHOW_ONLY_DIFFERENCE:
			const differentProducts = showDifferent(state.cache.products, !state.showOnlyDifference);
			const differentSpec = showDifferentSpec(state.cache.spec, !state.showOnlyDifference);
			console.log("reducer old spec", state.cache.spec);
			return {
				...state,
				showOnlyDifference: !state.showOnlyDifference,
				filter: {
					...state.filter,
					products: [...differentProducts],
					spec: {...differentSpec}
				}
			};

		default:
			return state;
	}
};

export default combineReducers({
	app: reducer,
});
