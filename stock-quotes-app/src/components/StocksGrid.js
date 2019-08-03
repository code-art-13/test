//Add Stocks Grid to display
import React from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import socketIOClient from "socket.io-client";

const stockQuotesData = require('../server/mockData'); 

const columns = [
    {
        name: "symbol",
        label: "Symbol",
        options: {
         filter: false,
         sort: true,
        }
       },
       {
        name: "name",
        label: "Name",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "price",
        label: "Price",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "day_high",
        label: "high",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "day_low",
        label: "low",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "day_change",
        label: "Day change",
        options: {
         filter: true,
         sort: true,
         setCellProps: (value) => {
            return {
              styles: { color: parseFloat(value) > 0? 'green': 'red'}
            };
          }
        },
       },
       {
        name: "last_trade_time",
        label: "Last updated",
        options: {
         filter: true,
         sort: true,
        }
       },
];
const options = {
      responsive: 'scroll',
      expandableRows: true,
      expandableRowsOnClick: true,
      renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              Custom expandable row option. Data: {JSON.stringify(rowData)}
            </TableCell>
          </TableRow>
        );
      },
};

let theme = createMuiTheme({
    typography: { useNextVariants: true },
    palette: {
        type: 'dark',
        primary: purple,
        secondary: green,
      },
      status: {
        danger: 'orange',
      },
  });
  theme = responsiveFontSizes(theme);

const getStockQuotesApi = async(context) =>{
  const stockQuotesData = await axios.get("http://localhost:4000/api/getStocks");
  context.setState({ data: stockQuotesData });
}

class StocksGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            endpoint: "http://localhost:4000",
        }
    }
    componentDidMount() {
      const {endpoint} = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("receiveStocksDataFromAPI", data => this.setState({ data }));
      // this.setState({ data: stockQuotesData });
    }
  render(){
    // const state = this.state;
    const Wrapper = styled.div`
     margin: 20px;
    `;
    return (
        <Wrapper>
            <MuiThemeProvider theme={theme}>
                <MUIDataTable
                        title={"Real-time stocks data"}
                        data={this.state.data}
                        columns={columns}
                        options={options}
                />
            </MuiThemeProvider>
        </Wrapper>
    );
  }
}

export default StocksGrid;