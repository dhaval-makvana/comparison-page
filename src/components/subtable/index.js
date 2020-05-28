import React from "react";
import styles from "./style.module.css";
import { uuid } from 'uuidv4';

export default (props) => {
	const { heading, sections, type, visible } = props;
	const headingDisplay = visible ? type === 'product' ? '' : heading : '';
	return (
		<>
			<div className={styles.heading}>{headingDisplay}</div>
			{sections.map((section) => {
				const value = visible ? type === "product" ? section.value : section.name : ''
				return <div key={uuid()} className={styles.section}>{value}</div>;
			})}
		</>
	);
};
