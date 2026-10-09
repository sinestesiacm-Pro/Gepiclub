import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import { TabIcon } from '@/components/TabIcon';

export default function TabLayout() {
  const triggerHaptic = () => {
    if (Platform.OS === 'ios') {
      Haptics.selectionAsync();
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: BrandColors.primaryBlue,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginTop: -2,
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.90)' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: 'rgba(10, 27, 64, 0.08)',
          elevation: 8,
          shadowColor: '#0A1B40',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              tint="systemUltraThinMaterialLight"
              intensity={95}
              style={StyleSheet.absoluteFill}
            />
          ) : undefined,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Voli',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="flights" color={color} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: triggerHaptic,
        }}
      />
      <Tabs.Screen
        name="hotels"
        options={{
          title: 'Hotel',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="hotels" color={color} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: triggerHaptic,
        }}
      />
      <Tabs.Screen
        name="vip"
        options={{
          title: 'Club VIP',
          tabBarActiveTintColor: BrandColors.goldVip,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="vip" color={color} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: triggerHaptic,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profilo',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="profile" color={color} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: triggerHaptic,
        }}
      />
    </Tabs>
  );
}
