import React from 'react';
import styles from './index.module.css';

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

export default Preview;