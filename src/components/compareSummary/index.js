import React from "react";
import styles from "./index.module.css";

const CompareSummary = (props) => {
	const { showDifference } = props;
	return (
		<div className={styles.compareSummary}>
			<input
				id="differenceCheck"
				type="checkbox"
				onChange={() => showDifference()}
			/>
			<label htmlFor="differenceCheck">Show only differences</label>
		</div>
	);
};

export default CompareSummary;