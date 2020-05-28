import React from 'react';
import Column from '../columns';

class Table extends React.Component {
  render() {
    const { header, data, products } = this.props
    return (
      <div>
        <Column data={header} />
        {products.map(product => <Column data={product} />)}
      </div>
    )
  }
}

export default Table;