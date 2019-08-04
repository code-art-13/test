//display details when a stock is selected in the stocks grid
import React from 'react';
import _ from "lodash"; //TODO: use lodash/fp

function StockDetailRow({stockDetail, colSpan}) {
  const styleData = {
    color: "green"
  }

  return ( //todo: refactor this into a component
    stockDetail && _.map(stockDetail, (value, key)=>(
    <React.Fragment>
    <tr colSpan={colSpan} key={key}>
      <td> 
        {key.toUpperCase()}
      </td>
      <td>
          <span style={styleData}>{value}</span>
      </td>
    </tr>
    </React.Fragment>
    )
  )
  )
};

export default StockDetailRow;
