import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@/components/Card";

const Home: React.FC = () => {
  return (
    <SafeAreaView className="bg-blue">
      <ScrollView
        className="bg-blue h-full p-[5%] space-y-[5%]"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between">
          <View className="w-[45%]">
            <Card title="Do spłacenia">
              <Text
                numberOfLines={1}
                className="text-2xl text-danger font-semibold"
              >
                -454.42zł
              </Text>
              <Text
                numberOfLines={1}
                className="text-2xl text-danger font-semibold"
              >
                -450zł
              </Text>
              <Text
                numberOfLines={1}
                className="text-2xl text-danger font-semibold"
              >
                -450zł
              </Text>
            </Card>
          </View>
          <View className="w-[45%]">
            <Card title="Do odebrania">
              <Text
                numberOfLines={1}
                className="text-2xl text-danger font-semibold"
              >
                -450zł
              </Text>
            </Card>
          </View>
        </View>
        <View>
          <Card title="Termin najbliszej spłaty">
            <Text className="text-2xl text-black font-semibold">
              19.04.2016
            </Text>
          </Card>
        </View>
        <View>
          <Card title="Termin najbliższego odbioru">
            <Text className="text-2xl text-black font-semibold">
              19.04.2016
            </Text>
          </Card>
        </View>
        <View>
          <Card title="Termin najbliższego odbioru">
            <Text className="text-2xl text-black font-semibold">
              19.04.2016
            </Text>
          </Card>
        </View>
        <View>
          <Card title="Termin najbliższego odbioru">
            <Text className="text-2xl text-black font-semibold">
              19.04.2016
            </Text>
          </Card>
        </View>
        <View className="h-[120px]" />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
