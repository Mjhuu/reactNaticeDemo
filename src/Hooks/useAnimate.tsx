/**
 * @configure initialValue
 * @configure animate : Function.apply(this, Array:configure)
 * **/
import React, { useRef, useEffect } from "react";
import {Animated} from "react-native";

export function useAnimate(configure: any){
  const useAnimatedValue = (initialValue: any) => {
    const ref = useRef(new Animated.Value(initialValue));
    return ref.current
  };

  const animatedValue = useAnimatedValue(configure.initialValue);

  useEffect(()=>{
    // @ts-ignore
    // configure.animate.apply(this,arguments);
  });

  return [
    animatedValue
  ]
}
