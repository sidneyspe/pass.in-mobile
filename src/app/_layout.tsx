import "@/styles/global.css"

import { Slot } from 'expo-router'

import { Loading } from "@/components/loading";

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_500Medium
} from '@expo-google-fonts/roboto'
import { StatusBar } from "react-native";

export default function Layout() {

  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium
  })

  return (
    <>
      <StatusBar barStyle="light-content" />
      {fontsLoaded ? <Slot /> : <Loading />}
    </>
  )
}
