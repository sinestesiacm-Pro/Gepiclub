import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandColors } from '@/constants/Colors';

export function HeaderBrand() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: Platform.OS === 'android' ? 10 : Math.max(insets.top, 44) + 6,
        },
      ]}>
      {/* Brand row: Isotype + Code Text */}
      <View style={styles.brandRow}>
        <Image
          source={require('@/assets/images/isotipo.jpg')}
          style={styles.isotype}
          resizeMode="contain"
        />

        <View style={styles.textColumn}>
          <Text style={styles.brandTitle}>
            GEPI<Text style={styles.brandTitleClub}>club</Text>
          </Text>
          <Text style={styles.brandSubtitle}>TRAVEL & EXPERIENCES</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 27, 64, 0.06)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isotype: {
    width: 36,
    height: 36,
  },
  textColumn: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.4,
    lineHeight: 22,
  },
  brandTitleClub: {
    color: BrandColors.skyBlue,
    fontWeight: '800',
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: '700',
    color: BrandColors.grayMuted,
    letterSpacing: 1.1,
    marginTop: 1,
  },
});
