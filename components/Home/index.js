import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity,StyleSheet, Button, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const TEXT = {
  color: "#fff",
  textAlign: "center",
};
function Home({ navigation }) {
  
  const [getdata, setGetData] = useState([]);
  const [searchdata, setSearchData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    GetList();
  }, []);

  const GetList = () => {
    const URL_GET_List =
      "https://6177aba89c328300175f5a90.mockapi.io/thuanapi/thuandd";

    fetch(URL_GET_List)
      .then((response) => response.json())
      .then((responseJson) => {
        setGetData(responseJson);
        setSearchData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = searchdata.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setGetData(newData);
      setSearch(text);
    } else {
      setGetData(searchdata);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Text style={styles.itemStyle} onPress={() => detailItem(item)}>
          {item.id.toUpperCase()}
        </Text>
        <Text style={styles.itemStyleName} onPress={() => detailItem(item)}>
          {item.name}
        </Text>
        <Text style={styles.itemStyleDateTime} onPress={() => detailItem(item)}>
          {item.date}
        </Text>
        <Text style={styles.itemStyleDateTime} onPress={() => detailItem(item)}>
          {item.price}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };
  const detailItem = (item) => {
    navigation.navigate("Detail", { item: item });
  };
  return (
    <>
      <View>
                <View style={{width: 50, left: 10, top: 30  }}>
                <Button
                 title="Add"
                 onPress={() => navigation.push('Create')}>
                  </Button>
                  </View>
                   
        <View style={{left: 20, bottom: 6}}>
          <View style={{paddingHorizontal: 60}}>
            <TextInput
              style={{ height: 40,
                paddingHorizontal: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#202020",
                width: "80%",
                marginRight: 5,}}
              placeholder="Search Something"
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
            />
            <Ionicons
              name="search"
              size={18}
              color={"black"}
              style={{position: "absolute", left: 70, top: 10}}
            />
          </View>
        </View>

        <View style={styles.list}>
          <FlatList
            data={getdata}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
 
  list: {
    height: 600,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  itemStyle: {
    padding: 10,
    width: "10%",
  },
  itemStyleName: {
    padding: 10,
    width: 86,
  },
  itemStyleDateTime: {
    padding: 10,
    marginLeft: 14,
  },
});

export default Home;
