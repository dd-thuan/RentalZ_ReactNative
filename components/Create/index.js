import axios from "axios";
import qs from "qs";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function Create({ navigation }) {
  const [property, setProperty] = useState(); 
  const [furniture, setFurniture] = useState();
  const [date, setDate] = useState();

  function Create(values) {
    const URL_UPDATE_BY_ID =
    "https://6177aba89c328300175f5a90.mockapi.io/thuanapi/thuandd";
    axios
      .post(
        URL_UPDATE_BY_ID,
        qs.stringify(
          {
            name: values.name,
            date:  values.date,
            furniture: values.furniture,
            price: values.price,
            bedroom: values.bedroom,
            note: values.note,
            property: values.property,
          }
        ),
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
  }

  return (
    <View style={{top: 40}}>
      <KeyboardAwareScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={50}
        enableOnAndroid={true}
      >
        <Formik
          initialValues={defaultForm}
          onSubmit={(values) => Create(values)}
          validationSchema={validationSchemaForm}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={{ paddingHorizontal: 30 }}>
              <View style={{top: 20, borderWidth: 1, width: '50%', left: 100, height: 30}} >
              <RNPickerSelect
                onValueChange={(value) => {
                  values.property = value;
                  setProperty(value);
                }}
                items={[
                  { label: "Flat", value: "Flat" },
                  { label: "House", value: "House" },
                  { label: "Bungalow", value: "Bungalow" },
                ]}
                placeholder={{label: "Select...", value: ""}}
                style={{ inputAndroid: { color: "black" , top: 15} }}
              />
              </View>
              <Text style={{bottom: 10, fontWeight: "bold"}}>
                  Property:
              </Text> 
              
               {!property && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    paddingHorizontal: 100,
                    top: 1
                  }}
                >
                  {errors.property}
                </Text>
              )}
          
              <View style={{top: 10, borderWidth: 1, width: '50%', left: 100, height: 30}} >
              <RNPickerSelect
                onValueChange={(value) => {
                  values.furniture = value;
                  setFurniture(value);
                }}
                items={[
                  { label: "Furnished", value: "Furnished" },
                  { label: "Unfurnished", value: "Unfurnished" },
                  { label: "Part Furnished", value: "Part Furnished" },
                ]}
                placeholder={{ label: "Select...", value: "" }}
                style={{
                  inputAndroid: { color: "black" },
                  marginBottom: 10,
                }}
              />
              </View>
              <View>
              <Text style={{bottom: 20, fontWeight:'bold'}}>
                Furniture:
              </Text>
              </View>

              <View style={{top: 10, width: '50%', left: 100, height: 30, marginBottom: 10}}>
              <DatePicker
                style={{width: 180}}
                date={date}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2015"
                maxDate="16-11-2021"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
              position: 'absolute',
              left: 0,
    
              top: 4,
              marginLeft: 210
            },
            dateInput: {
              marginLeft: 0,
            }
            }}
            onDateChange={(value) => {
              values.date = value;
              setDate(value);
            }}
          />
              </View>
              <Text style={{bottom: 15, fontWeight:'bold'}}>
                Date:
              </Text>     

              {touched.date && errors.date && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    paddingHorizontal: 100,
                    bottom: 10,
                  }}
                >
                  {errors.date}
                </Text>
              )}

             <Text style={{fontWeight: "bold", top: 5}}>
                  Bedroom:
              </Text>
              <TextInput
                style={{bottom: 20, borderWidth: 1, width: '50%', left: 100, height: 30}}
                value={values.bedroom}
                onChangeText={handleChange("bedroom")}
                onBlur={() => setFieldTouched("bedroom")}
                placeholder="Bedrooms..."
              />
              {touched.bedroom && errors.bedroom && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    paddingHorizontal: 100,
                    bottom: 20,
                  }}
                >
                  {errors.bedroom}
                </Text>
              )}

              <Text style={{fontWeight:"bold", top: 1}}>
                  Price:
              </Text>
              <TextInput
                style={{bottom: 20, borderWidth: 1, width: '50%', left: 100, height: 30}}
                value={values.price}
                onChangeText={handleChange("price")}
                onBlur={() => setFieldTouched("price")}
                keyboardType="number-pad"
                placeholder="Price..."
              />
              {touched.price && errors.price && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    paddingHorizontal: 100,
                    bottom: 20,
                  }}
                >
                  {errors.price}
                </Text>
              )}

              <Text style={{fontWeight: "bold", top: 10}}>
                  Note:
              </Text>
              <TextInput
                style={{bottom: 20, borderWidth: 1, width: '50%', left: 100, height: 50}}
                value={values.note}
                onChangeText={handleChange("note")}
                onBlur={() => setFieldTouched("note")}
                numberOfLines={10}
                multiline={true}
                underlineColorAndroid="transparent"
                placeholder="Notes..."
              />
          

              <Text style={{fontWeight: "bold", top: 1}}>
                Name:
              </Text>
              <TextInput
                style={{bottom: 20, borderWidth: 1, width: '50%', left: 100, height: 30}}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                placeholder="Name..."
              />
              {touched.name && errors.name && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    paddingHorizontal: 100,
                    bottom: 20,
                  }}
                >
                  {errors.name}
                </Text>
              )}
              <View style={{width: 80, left: 100, top: 1 }}>
              <Button
                title="Submit"
                disabled={!isValid && date?.length < 0}
                onPress={handleSubmit}
              />
              </View>
          
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      </View>
  );
}

export const defaultForm = {
  name: "",
  furniture: "",
  price: "",
  date:"",
  bedroom: "",
  note: "",
  property: "",
};


export const validationSchemaForm = yup.object().shape({
  name: yup.string().required("Name is required")
  .min(0, "At least contains 0 character!")
  .max(30, "Max character 28"),
  price: yup
    .number()
    .required("Number is required")
    .typeError("You Must Specify a Number!")
    .min(0, "Invalid Price!"),
  bedroom: yup.string().required("Bedroom is required"),
  property: yup.string().required("Property is required"),
  date: yup.string().required('Date is required')
});


export default Create;

