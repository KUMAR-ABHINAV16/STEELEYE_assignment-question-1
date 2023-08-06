import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows, timestamps, selectedCurrency, onClick }) => {
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {selectedCurrency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row, id) => {
         
          const orderTimestamps = timestamps.find(
            (timestamp) => timestamp["&id"] === row["&id"]
          );
        
          const orderSubmittedDate = orderTimestamps
            ? orderTimestamps.timestamps.orderSubmitted
            : "N/A";

          return (
            <ListRow key={id} onClick={onClick} rowId = {row["&id"]}>
              <ListRowCell>{row["&id"]}</ListRowCell>
              <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
              <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
              <ListRowCell>
                {orderSubmittedDate && new Date(orderSubmittedDate).toLocaleString()}
                

              </ListRowCell>
             
              <ListRowCell>{row.bestExecutionData.orderVolume[selectedCurrency]}</ListRowCell>
            </ListRow>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;










