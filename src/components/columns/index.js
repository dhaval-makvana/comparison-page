import React, { useState } from "react";
import styles from "./style.module.css";
import Subtable from "../subtable";
import { addProduct, removeProduct, showDifference } from '../../store/actions';
import {connect} from 'react-redux';
import { uuid } from 'uuidv4';

const CompareSummary = (props) => {
	const { showDifference } = props;
	return (
		<div className={styles.compareSummary}>
			<input id="differenceCheck" type="checkbox" onChange={() => showDifference()} />
			<label htmlFor="differenceCheck">Show only differences</label>
		</div>
	);
};

const ResolvedCompareSummary = connect(null, {showDifference})(CompareSummary);

const Title = ({ data }) => {
	const { title, subtitle } = data;
	return (
		<div className={styles.titles}>
			<div className={styles.title}>{title}</div>
			<div className={styles.subtitle}>{subtitle}</div>
		</div>
	);
};

const PriceSummary = ({ data }) => {
	const { finalPrice, price, discount } = data;
	return (
		<div className={styles.priceSummary}>
			<span className={styles.finalPrice}>{finalPrice}</span>
			<span className={styles.price}>{price}</span>
			<span className={styles.discount}>{discount} % off</span>
		</div>
	);
};

const Preview = (props) => {
	// console.log("data preview", props.data);
	const { image, titles, productPricingSummary, id } = props.data;
	const { removeProduct } = props;
	return (
		<div className={styles.preview}>
			<div className={styles.imageContainer}>
				<div onClick={() => removeProduct(id)} className={styles.removeProduct}>X</div>
				<img src={image} alt="product" />
			</div>
			<Title data={titles} />
			<PriceSummary data={productPricingSummary} />
		</div>
	);
};

const ResolvedPreview = connect(null, { removeProduct })(Preview);

const AddProduct = (props) => {
	const { data, addProduct } = props;
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		e.preventDefault();
		setValue(e.target.value);
		addProduct(e.target.value);
	}

	return (
		<div className={styles.addProduct}>
			<select onChange={(e) => handleChange(e)} value={value} >
				<option value="" key={uuid()}>Add Product</option>
				{data.map((product) => {
					return <option value={product.id} key={uuid()} >{product.name}</option>;
				})}
			</select>
		</div>
	);
};

const ResolvedAddProduct = connect(null,{ addProduct })(AddProduct);
const RenderPreview = (props) => {
	const { type, data, productIds } = props;
	if (type === "spec") {
		return <ResolvedCompareSummary />;
	} else if (type === "add") {
		return <ResolvedAddProduct data={productIds} />;
	} else {
		return <ResolvedPreview data={data} />;
	}
};

export default (props) => {
	const { type, data, visible = true, productIds } = props;
	const { compareSummary, featuresList } = data;
	// console.log(type, "data column", data);
	return (
		<div className={styles.column}>
			{compareSummary && (
				<RenderPreview
					type={type}
					data={compareSummary}
					productIds={productIds}
				/>
			)}

			<div className={styles.subtableContainer}>
				{featuresList &&
					featuresList.map((feature) => (
						<Subtable
							type={type}
							heading={feature.featureName}
							sections={feature.list}
							visible={visible}
							key={uuid()}
						/>
					))}
			</div>
		</div>
	);
};
