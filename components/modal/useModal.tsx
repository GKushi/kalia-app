import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
} from "react";
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

type Context = {
  translateY: number;
};

export const useModal = (setShowTabBar: Dispatch<SetStateAction<boolean>>) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>(<></>);
  const [title, setTitle] = useState<string>("");

  // toggle modal
  const toggleIsShowing = () => {
    if (isShowing === true) {
      setShowTabBar(true);
    } else {
      setShowTabBar(false);
    }
    setIsShowing(!isShowing);
  };
  // set modal content
  const setModal = (modalTitle: string, modalContent: ReactNode) => {
    setTitle(modalTitle);
    setContent(modalContent);
  };

  // make slide in effect
  const initTranslateY = 200;
  const translateY = useSharedValue(initTranslateY);

  useEffect(() => {
    if (isShowing === false) translateY.value = initTranslateY;
    if (isShowing === true) translateY.value = withTiming(0);

    return () => {
      translateY.value = initTranslateY;
    };
  }, [isShowing]);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  }, []);

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
        translateY.value = withTiming(1000);
        runOnJS(toggleIsShowing)();
      } else {
        translateY.value = withTiming(0, { duration: 200 });
      }
    },
  });

  const modal = isShowing ? (
    <View className="absolute inset-0 w-full h-full justify-end">
      <TouchableOpacity
        activeOpacity={0.2}
        onPress={toggleIsShowing}
        className="h-full bg-black opacity-20 absolute inset-0"
      />

      <Animated.View
        className="h-4/6 bg-white z-10 rounded-t-3xl p-6 pt-0"
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
              {title}
            </Text>
          </View>
          <View>{content}</View>
        </View>
      </Animated.View>
    </View>
  ) : (
    <></>
  );
  return [toggleIsShowing, setModal, modal] as const;
};
