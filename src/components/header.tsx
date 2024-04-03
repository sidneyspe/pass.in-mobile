import { Text, View } from "react-native";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <View className="h-28 w-full flex-row items-end border-b border-white/10 bg-black/20 px-8 pb-4">
      <Text className="flex-1 text-center text-lg font-medium text-white">
        {title}
      </Text>
    </View>
  );
}
