import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Ticket() {
  const [image, setImage] = useState("");

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });
      if (result.assets) {
        console.log(result.assets);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Foto", "Não foi possível selecionar a imagem.");
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />
      <ScrollView
        className="-z-10 -mt-28"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential image={image} onChangeAvatar={handleSelectImage} />
        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="my-6 self-center"
        />
        <Text className="mt-4 text-2xl font-bold text-white">
          Compartilhar Credencial
        </Text>
        <Text className="mb-6 mt-1 font-regular text-base text-white">
          Mostre ao mundo que você vai participar do Unite Summit!
        </Text>

        <Button title="Compartilhar" />
        <TouchableOpacity activeOpacity={0.7} className="mt-10">
          <Text className="text-center text-base font-bold text-white">
            Remover ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
