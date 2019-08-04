//display details when a stock is selected in the stocks grid
import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import _ from "lodash"; //TODO: use lodash/fp

function StockDetailRow({stockDetail, colSpan}) {
  const styleData = {
    color: "green"
  }
  const styleCol = {
    width: "50%"
  }
  return ( //todo: refactor this into a component
    stockDetail && _.map(stockDetail, (value, key)=>(
    <React.Fragment>
    <tr colSpan={colSpan}>
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
