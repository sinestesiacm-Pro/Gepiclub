import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';

export type DestinationBannerCardProps = {
  category: string;
  categoryIcon?: keyof typeof Ionicons.glyphMap;
  destination: string;
  image: ImageSourcePropType;
  discountText?: string;
  disclaimer?: string;
  price?: string;
  badgeLabel?: string;
  onPress?: () => void;
  style?: any;
};

export function DestinationBannerCard({
  category = 'Hoteles',
  categoryIcon = 'bed-outline',
  destination,
  image,
  discountText = 'de descuento',
  disclaimer = '*aplica en tarifas seleccionadas',
  price,
  badgeLabel,
  onPress,
  style,
}: DestinationBannerCardProps) {
  const handlePress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Ignored
    }
    if (onPress) onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: pressed ? 0.94 : 1,
        },
        style,
      ]}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        {/* Cinematic Gradient for 100% Text Legibility */}
        <LinearGradient
          colors={[
            'rgba(10, 27, 64, 0.45)',
            'rgba(10, 27, 64, 0.10)',
            'rgba(10, 27, 64, 0.82)',
          ]}
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Top Header Row */}
        <View style={styles.topRow}>
          <View style={styles.categoryPill}>
            <Ionicons name={categoryIcon} size={13} color="#FFFFFF" style={{ marginRight: 5 }} />
            <Text style={styles.categoryText}>{category}</Text>
          </View>

          {/* Fire Luxury Badge */}
          <View style={styles.fireBadge}>
            <LinearGradient
              colors={['#FF5722', '#FF3366']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fireBadgeGradient}>
              <Ionicons name="flame" size={13} color="#FFFFFF" />
              {badgeLabel ? (
                <Text style={styles.fireBadgeText}>{badgeLabel}</Text>
              ) : (
                <Ionicons
                  name={categoryIcon}
                  size={10}
                  color="#FFFFFF"
                  style={{ marginLeft: 2 }}
                />
              )}
            </LinearGradient>
          </View>
        </View>

        {/* Middle: Big Bold Destination Name */}
        <View style={styles.middleSection}>
          <Text style={styles.destinationTitle} numberOfLines={1}>
            {destination}
          </Text>
        </View>

        {/* Bottom: Discount + Disclaimer + Optional Price */}
        <View style={styles.bottomRow}>
          <View style={styles.discountBlock}>
            <Text style={styles.hastaLabel}>HASTA</Text>
            <Text style={styles.discountMainText}>{discountText}</Text>
            <Text style={styles.disclaimerText}>{disclaimer}</Text>
          </View>

          {price && (
            <View style={styles.pricePill}>
              <Text style={styles.pricePillLabel}>Desde</Text>
              <Text style={styles.pricePillValue}>{price}</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0A1B40',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 14,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  imageStyle: {
    borderRadius: 18,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 27, 64, 0.45)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  fireBadge: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#FF3366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  fireBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
  },
  fireBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 3,
  },
  middleSection: {
    justifyContent: 'center',
    marginTop: 8,
  },
  destinationTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  discountBlock: {
    flex: 1,
    paddingRight: 8,
  },
  hastaLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  discountMainText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginTop: 1,
  },
  disclaimerText: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 8.5,
    fontWeight: '500',
    marginTop: 2,
  },
  pricePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  pricePillLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: BrandColors.grayMuted,
  },
  pricePillValue: {
    fontSize: 13,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
});
