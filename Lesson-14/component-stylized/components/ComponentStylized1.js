import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

const ComponentStylized1 = () => {
  return (
    <View>
      {/* <Button title="Klik Saya" onPress={() => console.log("Tombol diklik!")} /> */}
      {/* <Button
        title="Klik Saya"
        buttonStyle={{ backgroundColor: "blue", borderRadius: 10 }}
        onPress={() => console.log("Tombol diklik!")}
      /> */}
      <Button
        title="Klik Saya"
        icon={{ name: "heart", type: "font-awesome" }}
        onPress={() => console.log("Tombol diklik!")}
      />
    </View>
  );
};

export default ComponentStylized1;
