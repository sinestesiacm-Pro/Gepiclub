import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import { getServiceById, SERVICES_CATALOG } from '@/data/servicesData';

export default function ServiceDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const service = getServiceById(id as string) || SERVICES_CATALOG[0];

  const [selectedOptionId, setSelectedOptionId] = useState(
    service.options[0]?.id || ''
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const selectedOption =
    service.options.find((o) => o.id === selectedOptionId) || service.options[0];

  const finalVipPrice = service.vipPrice + (selectedOption?.priceModifier || 0);
  const finalPublicPrice = service.publicPrice + (selectedOption?.priceModifier || 0);

  const handleSelectOption = (optId: string) => {
    if (Platform.OS === 'ios') {
      Haptics.selectionAsync();
    }
    setSelectedOptionId(optId);
  };

  const handleToggleFavorite = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Scopri ${service.title} su Gepiclub Travel con tariffa esclusiva per soci VIP a soli ${service.currencySymbol}${finalVipPrice}!`,
      });
    } catch {
      // Ignored
    }
  };

  const handleProceedToCheckout = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push({
      pathname: '/checkout/index',
      params: {
        serviceId: service.id,
        optionId: selectedOption?.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* Hero Image with Floating Actions */}
        <View style={styles.imageContainer}>
          <Image source={service.image} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(10, 27, 64, 0.6)', 'transparent', 'rgba(10, 27, 64, 0.4)']}
            style={styles.imageGradient}
          />

          {/* Top Bar with Back, Favorite, Share (Respects Notch) */}
          <View
            style={[
              styles.floatingHeader,
              {
                paddingTop: Math.max(insets.top, 44) + 6,
              },
            ]}>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => router.back()}
              activeOpacity={0.8}>
              <Ionicons name="chevron-back" size={20} color={BrandColors.navyDeep} />
            </TouchableOpacity>

            <View style={styles.topRightActions}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={handleShare}
                activeOpacity={0.8}>
                <Ionicons name="share-outline" size={18} color={BrandColors.navyDeep} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.circleBtn, { marginLeft: 8 }]}
                onPress={handleToggleFavorite}
                activeOpacity={0.8}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={19}
                  color={isFavorite ? BrandColors.primaryPink : BrandColors.navyDeep}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Category & Rating Badges */}
          <View style={styles.imageBottomBadges}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{service.categoryLabel.toUpperCase()}</Text>
            </View>

            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={BrandColors.goldVip} />
              <Text style={styles.ratingText}>
                {service.rating.toFixed(1)} ({service.reviewsCount})
              </Text>
            </View>
          </View>
        </View>

        {/* Service Header Info */}
        <View style={styles.contentSection}>
          <View style={styles.partnerRow}>
            <Ionicons name="shield-checkmark" size={14} color={BrandColors.goldVip} />
            <Text style={styles.partnerName}>{service.partnerName}</Text>
            <View style={styles.verifiedChip}>
              <Text style={styles.verifiedChipText}>PARTNER VERIFICATO</Text>
            </View>
          </View>

          <Text style={styles.serviceTitle}>{service.title}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color={BrandColors.primaryBlue} />
            <Text style={styles.locationText}>{service.location}</Text>
          </View>

          <Text style={styles.shortDesc}>{service.shortDescription}</Text>
        </View>

        {/* Exclusive VIP Benefits Card */}
        <View style={styles.vipPerksCard}>
          <View style={styles.vipPerksHeader}>
            <View style={styles.crownIconBox}>
              <Ionicons name="diamond-outline" size={16} color={BrandColors.goldVip} />
            </View>
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.vipPerksTitle}>Vantaggi Riservati ai Soci Gepiclub</Text>
              <Text style={styles.vipPerksSubtitle}>Inclusi gratuitamente con la tua adesione VIP</Text>
            </View>
          </View>

          <View style={styles.perksList}>
            {service.vipPerks.map((perk, index) => (
              <View key={index} style={styles.perkItem}>
                <View style={styles.checkIconBox}>
                  <Ionicons name="checkmark" size={12} color={BrandColors.emeraldSuccess} />
                </View>
                <Text style={styles.perkItemText}>{perk}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Options / Plan Selection */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionHeading}>Seleziona la Configurazione</Text>
          <Text style={styles.sectionSubheading}>Scegli il livello di servizio desiderato</Text>

          <View style={styles.optionsList}>
            {service.options.map((option) => {
              const isSelected = selectedOption?.id === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => handleSelectOption(option.id)}
                  activeOpacity={0.8}>
                  <View style={styles.optionRadioRow}>
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterSelected,
                      ]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>

                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text
                        style={[
                          styles.optionLabel,
                          isSelected && styles.optionLabelSelected,
                        ]}>
                        {option.label}
                      </Text>
                      <Text style={styles.optionDescription}>{option.description}</Text>
                    </View>

                    <Text style={styles.optionPriceMod}>
                      {option.priceModifier === 0
                        ? 'Incluso'
                        : `+${service.currencySymbol}${option.priceModifier}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Full Description */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionHeading}>Dettagli dell'Esperienza</Text>
          <Text style={styles.fullDescText}>{service.fullDescription}</Text>

          <View style={styles.includesDivider} />

          <Text style={styles.includesHeading}>Cosa è Incluso:</Text>
          {service.includes.map((inc, i) => (
            <View key={i} style={styles.includeRow}>
              <Ionicons name="radio-button-on" size={12} color={BrandColors.primaryBlue} />
              <Text style={styles.includeText}>{inc}</Text>
            </View>
          ))}
        </View>

        {/* Guarantee and Terms Notice */}
        <View style={styles.guaranteeBox}>
          <Ionicons name="shield-checkmark-outline" size={18} color={BrandColors.emeraldSuccess} />
          <Text style={styles.guaranteeText}>{service.terms}</Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar (Clean Luxury CTA) */}
      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: Math.max(insets.bottom, 14) + 6,
          },
        ]}>
        <View style={styles.bottomPriceCol}>
          <View style={styles.discountRow}>
            <Text style={styles.strikethroughPrice}>
              {service.currencySymbol}
              {finalPublicPrice}
            </Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>-{service.discountPercentage}%</Text>
            </View>
          </View>

          <View style={styles.finalPriceRow}>
            <Text style={styles.vipPriceFinal}>
              {service.currencySymbol}
              {finalVipPrice}
            </Text>
            <Text style={styles.tariffaVipLabel}>Tariffa VIP</Text>
          </View>

          <View style={styles.pointsPill}>
            <Ionicons name="sparkles" size={10} color={BrandColors.goldVip} />
            <Text style={styles.pointsPillText}>+{service.pointsEarned} Punti Club</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={handleProceedToCheckout}
          activeOpacity={0.88}>
          <LinearGradient
            colors={[BrandColors.primaryBlue, BrandColors.navyDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.checkoutGradient}>
            <Text style={styles.checkoutBtnText}>Procedi al Checkout</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.lightBg,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFill,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  imageBottomBadges: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: BrandColors.navyDeep,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 27, 64, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  contentSection: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  partnerName: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginLeft: 6,
  },
  verifiedChip: {
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  verifiedChipText: {
    fontSize: 9,
    fontWeight: '800',
    color: BrandColors.goldDark,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    lineHeight: 28,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    fontWeight: '500',
    marginLeft: 4,
  },
  shortDesc: {
    fontSize: 13,
    color: BrandColors.navyDeep,
    lineHeight: 19,
    marginBottom: 16,
    fontWeight: '400',
  },
  vipPerksCard: {
    marginHorizontal: 18,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  vipPerksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 27, 64, 0.06)',
  },
  crownIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipPerksTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  vipPerksSubtitle: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 1,
  },
  perksList: {
    gap: 8,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkIconBox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    marginRight: 8,
  },
  perkItemText: {
    fontSize: 12,
    color: BrandColors.navyDeep,
    fontWeight: '600',
    flex: 1,
    lineHeight: 17,
  },
  optionsSection: {
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  sectionSubheading: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    marginTop: 2,
    marginBottom: 12,
  },
  optionsList: {
    gap: 10,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(10, 27, 64, 0.08)',
  },
  optionCardSelected: {
    borderColor: BrandColors.primaryBlue,
    backgroundColor: '#F0F7FF',
  },
  optionRadioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: BrandColors.primaryBlue,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BrandColors.primaryBlue,
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navyDeep,
  },
  optionLabelSelected: {
    color: BrandColors.primaryBlue,
  },
  optionDescription: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 2,
  },
  optionPriceMod: {
    fontSize: 12,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    marginLeft: 10,
  },
  detailsCard: {
    marginHorizontal: 18,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
  },
  fullDescText: {
    fontSize: 13,
    color: BrandColors.navyDeep,
    lineHeight: 19,
    marginTop: 8,
  },
  includesDivider: {
    height: 1,
    backgroundColor: 'rgba(10, 27, 64, 0.06)',
    marginVertical: 14,
  },
  includesHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginBottom: 8,
  },
  includeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  includeText: {
    fontSize: 12,
    color: BrandColors.navyDeep,
    marginLeft: 8,
    fontWeight: '500',
  },
  guaranteeBox: {
    marginHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.2)',
  },
  guaranteeText: {
    fontSize: 11,
    color: BrandColors.navyDeep,
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
    lineHeight: 15,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(10, 27, 64, 0.08)',
    paddingTop: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomPriceCol: {
    flex: 1,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strikethroughPrice: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6,
  },
  discountBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: BrandColors.emeraldSuccess,
  },
  finalPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 1,
  },
  vipPriceFinal: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  tariffaVipLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
    marginLeft: 6,
  },
  pointsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  pointsPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.goldDark,
    marginLeft: 4,
  },
  checkoutBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    minWidth: 170,
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
