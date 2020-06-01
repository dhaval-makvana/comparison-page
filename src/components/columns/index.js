import React from "react";
import styles from "./style.module.css";
import Subtable from "../subColumn";
import { addProduct, removeProduct, showDifference } from '../../store/actions';
import {connect} from 'react-redux';
import { uuid } from 'uuidv4';
import CompareSummary from '../compareSummary';
import Preview from '../preview';
import AddProduct from '../AddProduct';

const ResolvedCompareSummary = connect(null, {showDifference})(CompareSummary);

const ResolvedPreview = connect(null, { removeProduct })(Preview);

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
