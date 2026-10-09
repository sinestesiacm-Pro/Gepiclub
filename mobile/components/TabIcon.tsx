import React from 'react';
import { View, StyleSheet, Platform, ColorValue } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/Colors';

type TabIconProps = {
  name: 'flights' | 'hotels' | 'vip' | 'profile';
  color: ColorValue | string;
  focused: boolean;
  size?: number;
};

const SYMBOL_MAP = {
  flights: {
    ios: 'airplane' as const,
    android: 'flight' as const,
    ionicon: 'airplane' as const,
    ioniconOutline: 'airplane-outline' as const,
  },
  hotels: {
    ios: 'building.2.fill' as const,
    android: 'hotel' as const,
    ionicon: 'bed' as const,
    ioniconOutline: 'bed-outline' as const,
  },
  vip: {
    ios: 'crown.fill' as const,
    android: 'crown' as const,
    ionicon: 'diamond' as const,
    ioniconOutline: 'diamond-outline' as const,
  },
  profile: {
    ios: 'person.crop.circle.fill' as const,
    android: 'person' as const,
    ionicon: 'person-circle' as const,
    ioniconOutline: 'person-circle-outline' as const,
  },
};

export function TabIcon({ name, color, focused, size = 24 }: TabIconProps) {
  const iconConfig = SYMBOL_MAP[name];
  const isVip = name === 'vip';
  const iconColor = isVip && focused ? BrandColors.goldVip : color;

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <SymbolView
          name={{
            ios: iconConfig.ios,
            android: iconConfig.android,
            web: iconConfig.android,
          }}
          tintColor={iconColor}
          size={isVip ? size + 2 : size}
          fallback={
            <Ionicons
              name={focused ? iconConfig.ionicon : iconConfig.ioniconOutline}
              size={isVip ? size + 2 : size}
              color={iconColor as string}
            />
          }
        />
      ) : (
        <Ionicons
          name={focused ? iconConfig.ionicon : iconConfig.ioniconOutline}
          size={isVip ? size + 2 : size}
          color={iconColor as string}
        />
      )}
      {focused && (
        <View
          style={[
            styles.activeIndicator,
            { backgroundColor: isVip ? BrandColors.goldVip : BrandColors.primaryBlue },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
