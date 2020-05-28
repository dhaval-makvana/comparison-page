import React from "react";
import styles from "./App.module.css";
import { connect } from "react-redux";
import { fetchComparisonData } from "./store/actions";
import Column from "./components/columns";
import { uuid } from "uuidv4";

class App extends React.Component {
	componentDidMount() {
		this.props.fetchComparisonData();
	}
	render() {
		const { products, spec, productDropdown } = this.props;
		return (
			<div>
				<h2>Compare Page</h2>
				<div className={styles.grid}>
					<Column type="spec" data={spec} />
					{products.map((product) => {
						return <Column key={uuid()} type="product" data={product} />;
					})}
					{products.length === 4 ? null : (
						<Column
							type="add"
							data={spec}
							productIds={productDropdown}
							visible={false}
						/>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { filter, productDropdown } = state.app;
	const { products, spec } = filter;
	console.log("mapStateToProps", state.app);
	return {
		products,
		spec,
		productDropdown,
	};
};

export default connect(mapStateToProps, { fetchComparisonData })(App);
