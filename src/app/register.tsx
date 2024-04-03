import { View, Image, Alert, StatusBar } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";
import { api } from "@/server/api";
import axios from "axios";
import { useBadgeStore } from "@/store/badge-store";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const badgeStore = useBadgeStore();

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim())
        return Alert.alert("Inscrição", "Preencha todos os campos!");

      setIsLoading(true);

      const { data } = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      if (data.attendeeId) {
        const { data: badgeResponse } = await api.get(
          `/attendees/${data.attendeeId}/badge`,
        );

        badgeStore.save(badgeResponse.badge);

        Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
          {
            text: "Ok",
            onPress: () => {
              router.push("/ticket");
            },
          },
        ]);
      }
    } catch (error) {
      console.log("🚀 ~ handleRegister ~ error:", error);

      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes("already registered")
        ) {
          return Alert.alert("Inscrição", "Este e-mail já está cadastrado!");
        }
      }

      Alert.alert("Inscrição", "Não possível fazer a inscrição!");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <View className="flex flex-1 items-center justify-center bg-green-500 p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="mt-12 w-full gap-3">
        <Input>
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>
        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>
        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        />
        <Link href="/" className="mt-8 text-center text-base text-gray-100">
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
