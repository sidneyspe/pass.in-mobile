import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { QRCode } from "@/components/qrcode";

export default function Ticket() {
  const [image, setImage] = useState("");
  const [expandQRCode, setExpandQRCode] = useState(false);

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });
      if (result.assets) {
        setImage(result.assets[0].uri);
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
        <Credential
          image={image}
          onChangeAvatar={handleSelectImage}
          onShowQRCode={() => setExpandQRCode(true)}
        />
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

      <Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 items-center justify-center bg-green-500">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRCode(false)}
          >
            <QRCode value="teste" size={300} />
            <Text className="font-body mt-10 text-center text-sm text-orange-500">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
