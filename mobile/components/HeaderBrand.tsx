import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/Colors';

type HeaderBrandProps = {
  showConcierge?: boolean;
};

export function HeaderBrand({ showConcierge = true }: HeaderBrandProps) {
  const insets = useSafeAreaInsets();

  const handleConcierge = () => {
    Linking.openURL('https://wa.me/51999999999?text=Salve%20Gepiclub,%20desidero%20assistenza%20VIP%20per%20un%20viaggio.');
  };

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: Math.max(insets.top, 44) + 6,
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

      {/* Right Action: Discreet luxury Concierge pill */}
      {showConcierge && (
        <TouchableOpacity
          style={styles.conciergePill}
          onPress={handleConcierge}
          activeOpacity={0.75}>
          <View style={styles.onlineDot} />
          <Ionicons name="headset-outline" size={13} color={BrandColors.primaryBlue} style={{ marginRight: 4 }} />
          <Text style={styles.conciergeText}>Concierge 24/7</Text>
        </TouchableOpacity>
      )}
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
  conciergePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 115, 230, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 115, 230, 0.15)',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.emeraldSuccess,
    marginRight: 5,
  },
  conciergeText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    letterSpacing: 0.2,
  },
});
