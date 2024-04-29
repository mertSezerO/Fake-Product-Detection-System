import { View, Text, ImageBackground, TouchableOpacity } from "react-native"
import React, { useContext, useEffect, useRef, useState } from "react"
import tailwindConfig from "../tailwind.config"
import { StatusBar } from "expo-status-bar"
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import { useNavigation } from "@react-navigation/native"
import { CoreContext } from "../contexts/CoreContext"
import { Camera } from "expo-camera"

const CheckScreen = () => {
  const navigation = useNavigation()
  const coreContext = useContext(CoreContext)
  const scanned = useRef(false)
  const [cameraRef, setCameraRef] = useState(null)

  useEffect(() => {
    ;(async () => {
      await Camera.requestCameraPermissionsAsync()
      if (cameraRef) {
        const photo = await cameraRef.resumePreview()
      }
    })()
  }, [cameraRef])

  onScan = async (e) => {
    const response = await fetch(
      "http://192.168.41.60:3000/product/" + e.data,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!scanned.current) {
      scanned.current = true
      if (response.status !== 200) {
        navigation.navigate("Counterfeit")
        return
      }
      const { product } = await response.json()
      coreContext.setFoundProduct(product)
      navigation.navigate("ProductFound")
    }
  }

  return (
    <View className=" items-center">
      <Camera
        ref={(ref) => setCameraRef(ref)}
        className="flex justify-center"
        style={{ width: 200, height: 200 }}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={onScan}
      />
    </View>
  )
}
export default CheckScreen
