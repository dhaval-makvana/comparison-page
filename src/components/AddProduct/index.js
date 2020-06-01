import React, { useState } from 'react';
import styles from './index.module.css';
import uuid from 'uuidv4';

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
			<select className={styles.dropdown} onChange={(e) => handleChange(e)} value={value} >
				<option value="" key={uuid()}>Add Product</option>
				{data.map((product) => {
					return <option value={product.id} key={uuid()} >{product.name}</option>;
				})}
			</select>
		</div>
	);
};

export default AddProduct;