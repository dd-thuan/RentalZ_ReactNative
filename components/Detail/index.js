import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { View, Text, TextInput, Button } from "react-native";


function Detail({ route, navigation }) {
  const { item } = route.params;
  const [getDetail, setgetDetail] = useState({
    name: item.name,
    date: item.date,
    furniture: item.furniture,
    price: item.price,
    bedroom: item.bedroom,
    note: item.note,
    property: item.property,
  });

  const onChangeName = (value) => {
    setgetDetail({ ...getDetail, name: value });
  };

  const onChangedatetime = (value) => {
    setgetDetail({ ...getDetail, date: value });
  };

  const onChangefurnitureTypes = (value) => {
    setgetDetail({ ...getDetail, furniture: value });
  };

  const onChangeprice = (value) => {
    setgetDetail({ ...getDetail, price: value });
  };

  const onChangebedroom = (value) => {
    setgetDetail({ ...getDetail, bedroom: value });
  };

  const onChangenote = (value) => {
    setgetDetail({ ...getDetail, note: value });
  };

  const onChangeprototypes = (value) => {
    setgetDetail({ ...getDetail, property: value });
  };

  const Update = () => {
    const URL_UPDATE_BY_ID =
    "https://6177aba89c328300175f5a90.mockapi.io/thuanapi/thuandd/";

    axios
      .put(
        URL_UPDATE_BY_ID + item.id,
        qs.stringify({
          name: getDetail.name,
          date: getDetail.date,
          furniture: getDetail.furniture,
          price: getDetail.price,
          bedroom: getDetail.bedroom,
          note: getDetail.note,
          property: getDetail.property,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        navigation.push("Home");
      });
  };

  const deleteData = () => {
    const URL_DELETE_BY_ID =
    "https://6177aba89c328300175f5a90.mockapi.io/thuanapi/thuandd/";
    fetch(URL_DELETE_BY_ID + item.id, {
      method: "DELETE",
    })
      .then((response) => {
        response.text();
        navigation.push("Home");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  return (
    <>
        <View style={{top: 40, paddingHorizontal: 30}}>
         <View style={{top: 20, borderWidth: 1, width: '50%', left: 100, height: 30}} >
            <TextInput
              value={getDetail.property}
              onChangeText={(value) => onChangeprototypes(value)}
            />
            </View>
            <Text style={{bottom: 10, fontWeight: "bold"}}>
                Property:
            </Text> 
      
            <View style={{top: 10, borderWidth: 1, width: '50%', left: 100, height: 30}} >
            <TextInput
            value={getDetail.furniture}
            onChangeText={(value) => onChangefurnitureTypes(value)}
            />
              </View>
              <View>
              <Text style={{bottom: 20, fontWeight:'bold'}}>
                Furniture:
              </Text>
              </View>


              <View style={{top: 10, borderWidth: 1, width: '50%', left: 100, height: 30}}>
              <TextInput
              value={getDetail.date}
              onChangeText={(value) => onChangedatetime(value)}
            />
              </View>
              <Text style={{bottom: 15, fontWeight:'bold'}}>
                Date:
              </Text>     

             <Text style={{fontWeight: "bold", top: 5}}>
                  Bedroom:
              </Text>
              <TextInput
                style={{bottom: 20, borderWidth: 1, width: '50%', left: 100, height: 30}}
                value={getDetail.bedroom}
                onChangeText={(value) => onChangebedroom(value)}
              />

              <Text style={{fontWeight:"bold", top: 1}}>
                  Price:
              </Text>
              <TextInput
                style={{bottom: 20, borderWidth: 1, width: '50%', left: 100, height: 30}}
                value={getDetail.price}
                onChangeText={(value) => onChangeprice(value)}
              />
  
                <Text style={{fontWeight: "bold", top: 10}}>
                  Note:
              </Text>
              <TextInput
                style={{bottom: 20, borderWidth: 1, width: '50%', left: 100, height: 50}}
                value={getDetail.note}
                onChangeText={(value) => onChangenote(value)}
              />
          

              <Text style={{fontWeight: "bold", top: 1}}>
                Name:
              </Text>
              <TextInput
                style={{bottom: 20, borderWidth: 1, width: '50%', left: 100, height: 30}}
                 value={getDetail.name}
                 onChangeText={(value) => onChangeName(value)}
              />

              <View style={{width: 80, left: 70, top:20 }}>
              <Button
                title="Update"
                onPress={Update}
              />
              </View>

              <View style={{width: 80, left: 200, bottom: 15 }}>
              <Button
                title="Delete"
                onPress={deleteData}
              />
              </View>
          </View>
  
            
    </>
  );
}


export default Detail;
