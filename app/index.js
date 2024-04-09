import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import StockButton from "../component/StockButton";
import useFetch from "./api";
import { useState, useEffect } from "react";
import axios from "axios";

const indexCodes = [
  { name: "Apple", indexCode: "SPX" },
  { name: "Google", indexCode: "SPX" },
  { name: "Microsoft", indexCode: "IXIC" },
  { name: "Facebook", indexCode: "DJI" },
  { name: "Alibaba", indexCode: "SSEC" },
  { name: "Tesla", indexCode: "NI225" },
  { name: "Coca Cola", indexCode: "HSI" },
  { name: "Pepsi", indexCode: "TWII" },
  { name: "KFC", indexCode: "STOXX50E" },
];

export default function App() {
  const [selectedStockData, setSelectedStockData] = useState(null);

  const handlePress = async (name, indexCode) => {
    try {
      const options = {
        method: "GET",
        url: "https://real-time-finance-data.p.rapidapi.com/search",
        params: {
          query: name,
          language: "en",
        },
        headers: {
          "X-RapidAPI-Key":
            "6f9e8a08b0mshdb42def68fe4ae7p12308ejsn185a565481ec",
          "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setSelectedStockData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTextColor = (changePercent) => {
    if (changePercent < 0) {
      return "red";
    } else if (changePercent > 0) {
      return "green";
    } else {
      return "yellow";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stockName}>
          {selectedStockData?.stock[0]?.name}
        </Text>

        <Text style={styles.stockIndex}>
          {selectedStockData?.stock[0]?.price}
        </Text>
        <Text
          style={[
            styles.stockChange,
            {
              color: getTextColor(selectedStockData?.stock[0]?.change_percent),
            },
          ]}
        >
          {selectedStockData?.stock[0]?.change.toFixed(2)}
          {"   "}
          {selectedStockData?.stock[0]?.change_percent.toFixed(2)}%
        </Text>
      </View>

      <View style={styles.footer}>
        {indexCodes.map((item, index) => (
          <StockButton
            name={item.name}
            indexCode={item.indexCode}
            onPress={handlePress}
            key={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#68b38a",
  },
  stockName: {
    fontSize: 30,
  },
  stockIndex: {
    fontSize: 80,
  },
  stockChange: {
    fontSize: 40,
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  button: {
    margin: 10,
    borderWidth: 1,
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
});
