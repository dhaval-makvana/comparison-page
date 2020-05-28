const getFeaturesList = (data, difference) => {
	const featuresList = [];
	for (let key in data) {
		const featureObject = {};
		featureObject.featureName = data[key]["title"];
		featureObject.list = [];
		for (let i = 0; i < data[key]["features"].length; i++) {
			const listObject = {};
			listObject.name = data[key]["features"][i]["featureName"];
			if (data[key]["features"][i]["properties"]) {
				listObject.properties = data[key]["features"][i]["properties"];
			}

			if (difference) {
				if (listObject.properties && listObject.properties.isDifferent) {
					featureObject.list.push(listObject);
				}
			} else {
				featureObject.list.push(listObject);
			}
		}
		featuresList.push(featureObject);
	}
	return featuresList;
};

const getFeatures = (data, difference = false) => {
	const outputObject = {
		compareSummary: [],
	};
	const { featuresList } = data;
	outputObject.featuresList = getFeaturesList(featuresList, difference);
	return outputObject;
};

const getProductIds = (data) => {
	const { compareSummary } = data;
	const productIds = [];
	for (let key in compareSummary.images) {
		productIds.push(key);
	}
	return productIds;
};

const getProducts = (data, difference) => {
	const outputArray = [];
	const { compareSummary, featuresList } = data;
	const productIds = getProductIds(data);
	for (let i = 0; i < productIds.length; i++) {
		const productObject = {
			featuresList: [],
			id: productIds[i],
			name: compareSummary.titles[productIds[i]]["title"],
		};

		const compareSummaryObject = {
			image: compareSummary.images[productIds[i]],
			titles: {
				title: compareSummary.titles[productIds[i]]["title"],
				subtitle: compareSummary.titles[productIds[i]]["subtitle"],
			},
			productPricingSummary: {
				finalPrice:
					compareSummary.productPricingSummary[productIds[i]]["finalPrice"],
				price: compareSummary.productPricingSummary[productIds[i]]["price"],
				totalDiscount:
					compareSummary.productPricingSummary[productIds[i]]["totalDiscount"],
			},
			id: productIds[i],
		};

		productObject.compareSummary = compareSummaryObject;

		for (let key in featuresList) {
			const featureObject = {};
			featureObject.featureName = featuresList[key]["title"];
			featureObject.list = [];
			for (let j = 0; j < featuresList[key]["features"].length; j++) {
				const listObject = {};
				listObject.name = featuresList[key]["features"][j]["featureName"];
				if (featuresList[key]["features"][i]["properties"]) {
					listObject.properties =
						featuresList[key]["features"][j]["properties"];
				}
				listObject.value =
					featuresList[key]["features"][j]["values"][productIds[i]];
				if (difference) {
					if (listObject.properties && listObject.properties.isDifferent) {
						featureObject.list.push(listObject);
					}
				} else {
					featureObject.list.push(listObject);
				}
			}

			productObject.featuresList.push(featureObject);
		}

		outputArray.push(productObject);
	}

	return outputArray;
};

const showDifferent = (products, difference) => {
	// looping over all products
	const newProductsList = [];

	for (let i = 0; i < products.length; i++) {
		const oldProduct = products[i];
		const { featuresList } = oldProduct;
		//creating a new product object
		const newProduct = {
			id: oldProduct.id,
			name: oldProduct.name,
			compareSummary: {
				id: oldProduct.compareSummary.id,
				image: oldProduct.compareSummary.image,
				titles: {
					title: oldProduct.compareSummary.titles.title,
					subtitle: oldProduct.compareSummary.titles.subtitle,
				},
				productPricingSummary: {
					price: oldProduct.compareSummary.productPricingSummary.price,
					finalPrice:
						oldProduct.compareSummary.productPricingSummary.finalPrice,
					totalDiscount:
						oldProduct.compareSummary.productPricingSummary.totalDiscount,
				},
			},
			featuresList: [],
		};

		// looping over features list
		for (let j = 0; j < featuresList.length; j++) {
			const oldFeatureObject = featuresList[j];
			const { list } = oldFeatureObject;
			const newFeatureObject = {
				featureName: oldFeatureObject.featureName,
				list: [],
			};

			// looping over feature list
			for (let k = 0; k < list.length; k++) {
				const oldListItem = list[k];
				const newListItem = {
					name: oldListItem.name,
					value: oldListItem.value,
				};

				if (oldListItem.properties) {
					newListItem.properties = oldListItem.properties;
				}

				if (difference) {
					if (oldListItem.properties && oldListItem.properties.isDifferent) {
						newFeatureObject.list.push(newListItem);
					}
				} else {
					newFeatureObject.list.push(newListItem);
				}
			}

			newProduct.featuresList.push(newFeatureObject);
		}

		newProductsList.push(newProduct);
	}

	return newProductsList;
};

const showDifferentSpec = (spec, difference) => {
	const { featuresList } = spec;
	const newSpec = {
		compareSummary: [],
		featuresList: [],
	};
	//looping over featuresList
	for (let i = 0; i < featuresList.length; i++) {
		const oldFeatureObject = featuresList[i];
		const { list } = oldFeatureObject;
		const newFeatureObject = {
			featureName: oldFeatureObject.featureName,
			list: [],
		};

		for (let j = 0; j < list.length; j++) {
      const oldListItem = list[j];
			const newListItem = {
				name: oldListItem.name,
			};
			if (newListItem.properties) {
				newListItem.properties = oldListItem.properties;
      }

      if (difference) {
        if (oldListItem.properties && oldListItem.properties.isDifferent) {
          newFeatureObject.list.push(newListItem);
        }
      } else {
        newFeatureObject.list.push(newListItem);
      }
			
		}

		newSpec.featuresList.push(newFeatureObject);
  }
  // console.log("oldSpec", spec);
  console.log("newSpec", newSpec);

	return newSpec;
};

export {
	getFeatures,
	getProducts,
	getProductIds,
	showDifferent,
	showDifferentSpec,
};
