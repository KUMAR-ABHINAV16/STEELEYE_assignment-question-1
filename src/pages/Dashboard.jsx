import { useEffect, useState } from "react";


import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";


import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";


import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    setTotalOrders(timestamps.results.length);
  }, []);

  const filterRows = (searchText) => {
    if (searchText.trim() === "") {
     
      return mockData.results;
    }
    
    const searchTextLowerCase = searchText.toLowerCase()
   
    return mockData.results.filter(
      (row) => row["&id"].toLowerCase() === searchTextLowerCase
    );
  }

  

  const clickRow = (id) => {
    for (let index = 0; index < mockData.results.length; index++) {
      if (id === mockData.results[index]["&id"]) {
        const {executionDetails} = mockData.results[index];
        setSelectedOrderDetails(executionDetails);
        break;
      } 
    }
    for (let index = 0; index < timestamps.results.length; index++) {
      if (id === timestamps.results[index]["&id"]) {
        const timestampData = timestamps.results[index].timestamps;
        setSelectedOrderTimeStamps(timestampData);
       
        break;
      } 
    }
   
  }


  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={`${styles.section} card-container`}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
     
        <List rows={filterRows(searchText)} timestamps={timestamps.results} selectedCurrency={currency} onClick={clickRow} />
      </div>
    </div>
  );
};

export default Dashboard;
