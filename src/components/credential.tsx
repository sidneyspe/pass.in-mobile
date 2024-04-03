import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  image?: string;
  onChangeAvatar?: () => void;
};

export function Credential({ image, onChangeAvatar }: Props) {
  return (
    <View className="w-full items-center self-stretch">
      <Image
        source={require("@/assets/ticket/band.png")}
        className=" z-10 h-52 w-24"
      />
      <View className="mx-3 -mt-5 items-center self-stretch rounded-2xl border border-white/10 bg-black/20 pb-6">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="h-40 items-center self-stretch overflow-hidden border-b border-white/10 px-6 py-8"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-sm font-bold text-zinc-50 ">
              Unite Submit
            </Text>
            <Text className="text-sm font-bold text-zinc-50 ">#123</Text>
          </View>

          <View className="h-40 w-40 rounded-full bg-black/40" />
        </ImageBackground>

        {image ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <Image
              source={{ uri: image }}
              className="-mt-24 h-36 w-36 rounded-full"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            className="-mt-24 h-36 w-36 items-center justify-center rounded-full bg-gray-400"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="mt-4 text-2xl font-bold text-zinc-50 ">
          Sidney Pimentel
        </Text>
        <Text className="mb-4 font-regular text-base text-zinc-300 ">
          sidneyspe@gmail.com
        </Text>

        <Image
          source={require("@/assets/ticket/qrcode.png")}
          className="h-32 w-32"
        />

        <TouchableOpacity activeOpacity={0.7} className="mt-6">
          <Text className="font-body text-sm text-orange-500">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
