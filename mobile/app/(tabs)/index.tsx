import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import { HeaderBrand } from '@/components/HeaderBrand';
import { DestinationBannerCard } from '@/components/DestinationBannerCard';

const POPULAR_ROUTES = [
  {
    id: '1',
    category: 'Vuelos',
    city: 'Madrid',
    image: require('@/assets/images/madrid.jpg'),
    discountText: 'de descuento',
    disclaimer: '*Iberia & Air Europa Business',
    price: '€580',
    serviceId: 'volo-business-vce-lim',
  },
  {
    id: '2',
    category: 'Vuelos',
    city: 'Miami',
    image: require('@/assets/images/caribbean-resort.jpg'),
    discountText: 'de descuento',
    disclaimer: '*volo diretto ITA Airways',
    price: '€690',
    serviceId: 'volo-business-vce-lim',
  },
  {
    id: '3',
    category: 'Vuelos',
    city: 'Lima',
    image: require('@/assets/images/machu-picchu.jpg'),
    discountText: 'de descuento',
    disclaimer: '*LATAM Airlines VIP Class',
    price: '€890',
    serviceId: 'volo-business-vce-lim',
  },
  {
    id: '4',
    category: 'Vuelos',
    city: 'Cancún',
    image: require('@/assets/images/cancun-resort.jpg'),
    discountText: 'de descuento',
    disclaimer: '*tariffe privilegiate per soci',
    price: '€640',
    serviceId: 'volo-business-vce-lim',
  },
  {
    id: '5',
    category: 'Vuelos',
    city: 'Cartagena',
    image: require('@/assets/images/cruise.jpg'),
    discountText: 'de descuento',
    disclaimer: '*collegamento via Bogotà VIP',
    price: '€720',
    serviceId: 'volo-business-vce-lim',
  },
  {
    id: '6',
    category: 'Vuelos',
    city: 'Punta Cana',
    image: require('@/assets/images/hotel-suite.jpg'),
    discountText: 'de descuento',
    disclaimer: '*resort charter incluso',
    price: '€780',
    serviceId: 'volo-business-vce-lim',
  },
];

export default function FlightsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [tripType, setTripType] = useState<'round' | 'oneWay'>('round');
  const [cabinClass, setCabinClass] = useState<'business' | 'economy'>('business');
  const [origin, setOrigin] = useState({ code: 'VCE', city: 'Venezia (Marco Polo)' });
  const [destination, setDestination] = useState({ code: 'LIM', city: 'Lima (Jorge Chávez)' });

  const handleSwapAirports = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <View style={styles.container}>
      {/* Official Header with Isotype + horizontal typography + safe area */}
      <HeaderBrand />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 95,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* Hero Search Card (Pure White Clean Luxury) */}
        <View style={styles.searchCard}>
          {/* Trip Type Selector */}
          <View style={styles.typeSelectorRow}>
            <TouchableOpacity
              style={[
                styles.typePill,
                tripType === 'round' && styles.typePillActive,
              ]}
              onPress={() => setTripType('round')}>
              <Text
                style={[
                  styles.typePillText,
                  tripType === 'round' && styles.typePillTextActive,
                ]}>
                Andata e Ritorno
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typePill,
                tripType === 'oneWay' && styles.typePillActive,
              ]}
              onPress={() => setTripType('oneWay')}>
              <Text
                style={[
                  styles.typePillText,
                  tripType === 'oneWay' && styles.typePillTextActive,
                ]}>
                Solo Andata
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.classBadge}
              onPress={() => setCabinClass(cabinClass === 'business' ? 'economy' : 'business')}>
              <Text style={styles.classBadgeText}>
                {cabinClass === 'business' ? 'Business Class' : 'Economy Class'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* High-Contrast Origin & Destination */}
          <View style={styles.routeContainer}>
            <View style={styles.airportBox}>
              <Text style={styles.airportLabel}>DA DOVE</Text>
              <Text style={styles.airportCode}>{origin.code}</Text>
              <Text style={styles.airportCity} numberOfLines={1}>{origin.city}</Text>
            </View>

            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwapAirports}
              activeOpacity={0.7}>
              <Ionicons name="swap-horizontal" size={18} color={BrandColors.primaryBlue} />
            </TouchableOpacity>

            <View style={[styles.airportBox, { alignItems: 'flex-end' }]}>
              <Text style={styles.airportLabel}>VERSO DOVE</Text>
              <Text style={styles.airportCode}>{destination.code}</Text>
              <Text style={styles.airportCity} numberOfLines={1}>{destination.city}</Text>
            </View>
          </View>

          {/* Dates & Passengers Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <View style={styles.metaIconWrap}>
                <Ionicons name="calendar-outline" size={16} color={BrandColors.primaryBlue} />
              </View>
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.metaLabel}>DATE DI VIAGGIO</Text>
                <Text style={styles.metaValue}>18 Nov - 02 Dic 2026</Text>
              </View>
            </View>

            <View style={styles.metaDivider} />

            <View style={styles.metaItem}>
              <View style={styles.metaIconWrap}>
                <Ionicons name="people-outline" size={16} color={BrandColors.primaryBlue} />
              </View>
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.metaLabel}>PASSEGGERI</Text>
                <Text style={styles.metaValue}>1 Adulto • Business</Text>
              </View>
            </View>
          </View>

          {/* Primary CTA (Vibrant Blue & Navy) */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              if (Platform.OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
              router.push({
                pathname: '/service/[id]',
                params: { id: 'volo-business-vce-lim' },
              });
            }}
            activeOpacity={0.88}>
            <LinearGradient
              colors={[BrandColors.primaryBlue, BrandColors.navyDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.searchButtonGradient}>
              <Ionicons name="airplane" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.searchButtonText}>Cerca Voli con Tariffa VIP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Member Guarantees */}
        <View style={styles.perksRow}>
          <View style={styles.perkPill}>
            <Ionicons name="shield-checkmark" size={13} color={BrandColors.goldVip} />
            <Text style={styles.perkText}>Tariffe Garantite -35%</Text>
          </View>
          <View style={styles.perkPill}>
            <Ionicons name="briefcase-outline" size={13} color={BrandColors.primaryBlue} />
            <Text style={styles.perkText}>Bagaglio Stiva Incluso</Text>
          </View>
          <View style={styles.perkPill}>
            <Ionicons name="headset-outline" size={13} color={BrandColors.emeraldSuccess} />
            <Text style={styles.perkText}>Assistenza H24</Text>
          </View>
        </View>

        {/* Luxury Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('@/assets/images/flight-window.jpg')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(10, 27, 64, 0.1)', 'rgba(10, 27, 64, 0.85)']}
            style={styles.bannerOverlay}>
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>PRIVILEGIO SOCI</Text>
            </View>
            <Text style={styles.bannerTitle}>Accesso VIP Lounge & Fast Track</Text>
            <Text style={styles.bannerSubtitle}>
              I soci viaggiano senza attese in oltre 1.400 aeroporti internazionali.
            </Text>
          </LinearGradient>
        </View>

        {/* Marketplace Section Preview */}
        <View style={styles.marketplaceSection}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>Marketplace & Servizi VIP</Text>
              <Text style={styles.sectionSubtitle}>Palestre, sartoria su misura, cliniche & spa</Text>
            </View>
            <TouchableOpacity
              style={styles.seeAllMarketplaceBtn}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.selectionAsync();
                }
                router.push('/marketplace');
              }}
              activeOpacity={0.8}>
              <Text style={styles.seeAllMarketplaceText}>Vedi Tutti</Text>
              <Ionicons name="arrow-forward" size={12} color={BrandColors.primaryBlue} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.marketplaceCardsScroll}>
            
            {/* 1. Virgin Active */}
            <TouchableOpacity
              style={styles.marketMiniCard}
              onPress={() =>
                router.push({
                  pathname: '/service/[id]',
                  params: { id: 'virgin-active-collection' },
                })
              }
              activeOpacity={0.9}>
              <Image source={require('@/assets/images/hero-luxury.jpg')} style={styles.miniCardImage} />
              <View style={styles.miniCardBadge}>
                <Text style={styles.miniCardBadgeText}>FITNESS</Text>
              </View>
              <View style={styles.miniCardBody}>
                <Text style={styles.miniCardTitle} numberOfLines={1}>Virgin Active Collection</Text>
                <Text style={styles.miniCardPartner}>Palestre & Spa di Lusso</Text>
                <View style={styles.miniCardPriceRow}>
                  <Text style={styles.miniCardPrice}>€160</Text>
                  <Text style={styles.miniCardTag}>-30% VIP</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* 2. Sartoria Veneta */}
            <TouchableOpacity
              style={styles.marketMiniCard}
              onPress={() =>
                router.push({
                  pathname: '/service/[id]',
                  params: { id: 'sartoria-veneta' },
                })
              }
              activeOpacity={0.9}>
              <Image source={require('@/assets/images/madrid.jpg')} style={styles.miniCardImage} />
              <View style={styles.miniCardBadge}>
                <Text style={styles.miniCardBadgeText}>ALTA MODA</Text>
              </View>
              <View style={styles.miniCardBody}>
                <Text style={styles.miniCardTitle} numberOfLines={1}>Sartoria Veneta Bespoke</Text>
                <Text style={styles.miniCardPartner}>Abiti & Camicie su Misura</Text>
                <View style={styles.miniCardPriceRow}>
                  <Text style={styles.miniCardPrice}>€1.400</Text>
                  <Text style={styles.miniCardTag}>-28% VIP</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* 3. Clinica Med-Spa */}
            <TouchableOpacity
              style={styles.marketMiniCard}
              onPress={() =>
                router.push({
                  pathname: '/service/[id]',
                  params: { id: 'clinica-med-spa' },
                })
              }
              activeOpacity={0.9}>
              <Image source={require('@/assets/images/hotel-suite.jpg')} style={styles.miniCardImage} />
              <View style={styles.miniCardBadge}>
                <Text style={styles.miniCardBadgeText}>COSMETICA</Text>
              </View>
              <View style={styles.miniCardBody}>
                <Text style={styles.miniCardTitle} numberOfLines={1}>Clinica Med-Spa Platinum</Text>
                <Text style={styles.miniCardPartner}>Biorivitalizzazione & Viso</Text>
                <View style={styles.miniCardPriceRow}>
                  <Text style={styles.miniCardPrice}>€240</Text>
                  <Text style={styles.miniCardTag}>-31% VIP</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recommended Flight Deals Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vuelos Sugeridos & Destinos del Club</Text>
          <Text style={styles.sectionSubtitle}>Tariffe preferenziali con sconti fino al 40%</Text>
        </View>

        {/* Route Cards (Screenshot 3 Full-Bleed Luxury Banner Style) */}
        <View style={{ marginTop: 6 }}>
          {POPULAR_ROUTES.map((route) => (
            <DestinationBannerCard
              key={route.id}
              category={route.category || 'Vuelos'}
              categoryIcon="airplane"
              destination={route.city}
              image={route.image}
              discountText={route.discountText}
              disclaimer={route.disclaimer}
              price={route.price}
              onPress={() =>
                router.push({
                  pathname: '/service/[id]',
                  params: { id: route.serviceId },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.lightBg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  typePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 6,
  },
  typePillActive: {
    backgroundColor: BrandColors.navyDeep,
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: BrandColors.grayMuted,
  },
  typePillTextActive: {
    color: '#FFFFFF',
  },
  classBadge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(0, 115, 230, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  classBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.06)',
    marginBottom: 14,
  },
  airportBox: {
    flex: 1,
  },
  airportLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.grayMuted,
    letterSpacing: 0.5,
  },
  airportCode: {
    fontSize: 30,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.5,
    marginVertical: 2,
  },
  airportCity: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    fontWeight: '500',
  },
  swapButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 115, 230, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 115, 230, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.05)',
  },
  metaItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: BrandColors.grayMuted,
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginTop: 2,
  },
  metaDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(10, 27, 64, 0.08)',
    marginHorizontal: 10,
  },
  searchButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  searchButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  perksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  perkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.06)',
  },
  perkText: {
    fontSize: 10,
    fontWeight: '600',
    color: BrandColors.navyDeep,
    marginLeft: 5,
  },
  bannerContainer: {
    height: 135,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    padding: 16,
    justifyContent: 'flex-end',
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: BrandColors.goldVip,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  bannerBadgeText: {
    color: BrandColors.navyDeep,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    lineHeight: 15,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    marginTop: 2,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.07)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  routeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeTagPill: {
    backgroundColor: 'rgba(0, 115, 230, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  routeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
  },
  airlineText: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    fontWeight: '600',
  },
  routeCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  routeCardSegment: {
    width: 80,
  },
  routeCardCode: {
    fontSize: 24,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  routeCardCity: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 2,
  },
  routeDurationBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  routeDurationLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(10, 27, 64, 0.12)',
    marginVertical: 4,
  },
  routeDurationText: {
    fontSize: 10,
    color: BrandColors.grayMuted,
    fontWeight: '500',
  },
  routeCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(10, 27, 64, 0.05)',
    paddingTop: 12,
  },
  standardPriceText: {
    fontSize: 10,
    color: BrandColors.grayMuted,
    textDecorationLine: 'line-through',
  },
  vipPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  vipPriceText: {
    fontSize: 19,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  discountBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.2)',
  },
  discountBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: BrandColors.emeraldSuccess,
  },
  selectRouteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 115, 230, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  selectRouteBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
    marginRight: 4,
  },
  marketplaceSection: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  seeAllMarketplaceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  seeAllMarketplaceText: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
    marginRight: 4,
  },
  marketplaceCardsScroll: {
    paddingRight: 16,
    gap: 12,
  },
  marketMiniCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    marginRight: 10,
  },
  miniCardImage: {
    width: '100%',
    height: 100,
  },
  miniCardBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: BrandColors.navyDeep,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  miniCardBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  miniCardBody: {
    padding: 10,
  },
  miniCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  miniCardPartner: {
    fontSize: 10,
    color: BrandColors.grayMuted,
    marginTop: 2,
  },
  miniCardPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(10, 27, 64, 0.05)',
  },
  miniCardPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  miniCardTag: {
    fontSize: 9,
    fontWeight: '800',
    color: BrandColors.emeraldSuccess,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
});
