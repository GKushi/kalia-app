import React, { useEffect, ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface ModalProps {
  modal: {
    title: string;
    isShowing: boolean;
    toggleIsShowing: () => void;
  };
  height?: number;
  children: ReactNode;
}

type Context = {
  translateY: number;
};

const Modal: React.FC<ModalProps> = ({ modal, height, children }) => {
  // make slide in effect
  const initTranslateY = 200;
  const translateY = useSharedValue(initTranslateY);

  useEffect(() => {
    if (modal.isShowing === false) translateY.value = initTranslateY;
    if (modal.isShowing === true) translateY.value = withTiming(0);

    return () => {
      translateY.value = initTranslateY;
    };
  }, [modal.isShowing]);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      height: height,
    };
  }, []);

  // dismiss modal with trasition
  const dismissModal = () => {
    translateY.value = withTiming(2000);
    modal.toggleIsShowing();
  };
  // dismiss at sliding down the modal
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (_, ctx) => {
      ctx.translateY = translateY.value;
    },
    onActive: (e, ctx) => {
      if (e.translationY + ctx.translateY > 0)
        translateY.value = e.translationY + ctx.translateY;
    },
    onEnd: () => {
      if (translateY.value > 150) {
        runOnJS(dismissModal)();
      } else {
        translateY.value = withTiming(0, { duration: 200 });
      }
    },
  });

  if (!modal.isShowing) return null;
  return (
    <View className="absolute inset-0 w-full h-full justify-end">
      <TouchableOpacity
        activeOpacity={0.2}
        onPress={dismissModal}
        className="h-full bg-black opacity-20 absolute inset-0"
      />

      <Animated.View
        className="bg-white z-10 rounded-t-3xl p-6 pt-0"
        style={reanimatedStyle}
      >
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View className="w-full h-10 justify-center items-center">
            <View className="bg-black opacity-60 w-1/4 h-[3px] rounded-full" />
          </Animated.View>
        </PanGestureHandler>
        <View className="space-y-4">
          <View>
            <Text className="text-center text-2xl font-bold text-black">
              {modal.title}
            </Text>
          </View>
          <View>{children}</View>
        </View>
      </Animated.View>
    </View>
  );
};
export default Modal;
