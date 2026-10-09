import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import {
  SERVICES_CATALOG,
  ServiceCategory,
  ServiceItem,
} from '@/data/servicesData';

interface CategoryFilter {
  id: 'tutti' | ServiceCategory;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const CATEGORY_TABS: CategoryFilter[] = [
  { id: 'tutti', label: 'Tutti', icon: 'grid-outline' },
  { id: 'viaggi', label: 'Viaggi & Resort', icon: 'airplane-outline' },
  { id: 'fitness', label: 'Palestre & Spa', icon: 'barbell-outline' },
  { id: 'moda', label: 'Alta Sartoria', icon: 'shirt-outline' },
  { id: 'cosmetica', label: 'Med-Beauty', icon: 'sparkles-outline' },
];

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<'tutti' | ServiceCategory>('tutti');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter((item) => {
      const matchesCategory =
        activeCategory === 'tutti' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleSelectCategory = (catId: 'tutti' | ServiceCategory) => {
    if (Platform.OS === 'ios') {
      Haptics.selectionAsync();
    }
    setActiveCategory(catId);
  };

  const handleOpenService = (item: ServiceItem) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({
      pathname: '/service/[id]',
      params: { id: item.id },
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Header with Back Button and Search Bar */}
      <View
        style={[
          styles.headerBar,
          {
            paddingTop: Math.max(insets.top, 44) + 6,
          },
        ]}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={20} color={BrandColors.navyDeep} />
          </TouchableOpacity>

          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>Marketplace Gepiclub</Text>
            <Text style={styles.headerSub}>Esperienze & Convenzioni Esclusive VIP</Text>
          </View>

          <View style={styles.vipBadgeHeader}>
            <Ionicons name="shield-checkmark" size={13} color={BrandColors.goldVip} />
            <Text style={styles.vipBadgeHeaderText}>SOCI</Text>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchBarWrap}>
          <Ionicons name="search-outline" size={17} color={BrandColors.grayMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cerca viaggi, palestre, abiti su misura, spa..."
            placeholderTextColor={BrandColors.grayMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={16} color={BrandColors.grayMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Horizontal Category Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryTabsList}>
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabPill,
                  isActive && styles.tabPillActive,
                ]}
                onPress={() => handleSelectCategory(tab.id)}
                activeOpacity={0.8}>
                <Ionicons
                  name={tab.icon}
                  size={13}
                  color={isActive ? '#FFFFFF' : BrandColors.navyDeep}
                  style={{ marginRight: 5 }}
                />
                <Text
                  style={[
                    styles.tabPillText,
                    isActive && styles.tabPillTextActive,
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Content Area */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 90,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* Intro Banner */}
        <View style={styles.introBanner}>
          <View style={styles.introIconBox}>
            <Ionicons name="ribbon" size={20} color={BrandColors.goldVip} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.introTitle}>Convenzioni B2B ad Alto Valore</Text>
            <Text style={styles.introSub}>
              Oltre ai viaggi d’élite, i soci accedono a tariffe negoziate nei migliori centri
              fitness, atelier sartoriali e cliniche medico-estetiche d'Italia e del Perù.
            </Text>
          </View>
        </View>

        {/* Counter results */}
        <View style={styles.resultsCountRow}>
          <Text style={styles.resultsCountText}>
            Mostrando {filteredServices.length}{' '}
            {filteredServices.length === 1 ? 'convenzione' : 'convenzioni VIP'}
          </Text>
        </View>

        {/* Services List */}
        {filteredServices.length === 0 ? (
          <View style={styles.emptyStateBox}>
            <Ionicons name="search-outline" size={38} color={BrandColors.grayMuted} />
            <Text style={styles.emptyTitle}>Nessuna esperienza trovata</Text>
            <Text style={styles.emptySub}>
              Prova a cercare con altri termini o seleziona la scheda 'Tutti'.
            </Text>
            <TouchableOpacity
              style={styles.emptyResetBtn}
              onPress={() => {
                setActiveCategory('tutti');
                setSearchQuery('');
              }}>
              <Text style={styles.emptyResetBtnText}>Reimposta Filtri</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredServices.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.cardContainer}
              onPress={() => handleOpenService(item)}
              activeOpacity={0.92}>

              {/* Card Image with Badges */}
              <View style={styles.imageWrap}>
                <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                <LinearGradient
                  colors={['transparent', 'rgba(10, 27, 64, 0.7)']}
                  style={styles.cardImageGradient}
                />

                <View style={styles.imageHeaderTags}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {item.categoryLabel.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>
                      -{item.discountPercentage}% VIP
                    </Text>
                  </View>
                </View>

                <View style={styles.imageFooterTags}>
                  <View style={styles.ratingBox}>
                    <Ionicons name="star" size={11} color={BrandColors.goldVip} />
                    <Text style={styles.ratingText}>
                      {item.rating.toFixed(1)} ({item.reviewsCount})
                    </Text>
                  </View>
                </View>
              </View>

              {/* Card Body */}
              <View style={styles.cardBody}>
                {/* Partner Name with verified tag */}
                <View style={styles.partnerRow}>
                  <Ionicons name="shield-checkmark" size={13} color={BrandColors.goldVip} />
                  <Text style={styles.partnerNameText}>{item.partnerName}</Text>
                  <Text style={styles.locationDot}>•</Text>
                  <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardShortDesc} numberOfLines={2}>
                  {item.shortDescription}
                </Text>

                {/* VIP Perks Pills */}
                <View style={styles.perksList}>
                  {item.vipPerks.slice(0, 2).map((perk, pIdx) => (
                    <View key={pIdx} style={styles.perkChip}>
                      <Ionicons name="checkmark-circle" size={12} color={BrandColors.emeraldSuccess} />
                      <Text style={styles.perkChipText} numberOfLines={1}>
                        {perk}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardDivider} />

                {/* Card Footer with Price and CTA */}
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.priceListinoText}>
                      Tariffa standard {item.currencySymbol}
                      {item.publicPrice}
                    </Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.vipPriceText}>
                        {item.currencySymbol}
                        {item.vipPrice}
                      </Text>
                      <Text style={styles.tariffaVipLabel}>Tariffa VIP</Text>
                    </View>
                    <View style={styles.pointsEarnedChip}>
                      <Ionicons name="sparkles" size={10} color={BrandColors.goldDark} />
                      <Text style={styles.pointsEarnedChipText}>
                        +{item.pointsEarned} Punti
                      </Text>
                    </View>
                  </View>

                  <View style={styles.openDetailsBtn}>
                    <Text style={styles.openDetailsBtnText}>Dettagli</Text>
                    <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.lightBg,
  },
  headerBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 27, 64, 0.06)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleBox: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.2,
  },
  headerSub: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 1,
  },
  vipBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  vipBadgeHeaderText: {
    fontSize: 9,
    fontWeight: '800',
    color: BrandColors.goldDark,
    marginLeft: 4,
    letterSpacing: 0.6,
  },
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: BrandColors.navyDeep,
    marginLeft: 8,
    padding: 0,
  },
  categoryTabsList: {
    paddingVertical: 2,
    gap: 6,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 6,
  },
  tabPillActive: {
    backgroundColor: BrandColors.navyDeep,
  },
  tabPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.navyDeep,
  },
  tabPillTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  introBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  introIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  introSub: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    lineHeight: 15,
    marginTop: 2,
  },
  resultsCountRow: {
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  resultsCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.grayMuted,
  },
  emptyStateBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 240,
  },
  emptyResetBtn: {
    backgroundColor: BrandColors.navyDeep,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  emptyResetBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  imageWrap: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageGradient: {
    ...StyleSheet.absoluteFill,
  },
  imageHeaderTags: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: BrandColors.navyDeep,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  discountBadge: {
    backgroundColor: BrandColors.emeraldSuccess,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  imageFooterTags: {
    position: 'absolute',
    bottom: 10,
    left: 12,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 27, 64, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  cardBody: {
    padding: 14,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  partnerNameText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginLeft: 4,
  },
  locationDot: {
    marginHorizontal: 4,
    color: BrandColors.grayMuted,
    fontSize: 10,
  },
  locationText: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    fontWeight: '500',
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    lineHeight: 22,
    marginBottom: 4,
  },
  cardShortDesc: {
    fontSize: 12,
    color: BrandColors.navyDeep,
    lineHeight: 17,
    marginBottom: 10,
    opacity: 0.85,
  },
  perksList: {
    gap: 4,
    marginBottom: 10,
  },
  perkChip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perkChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: BrandColors.navyDeep,
    marginLeft: 6,
    flex: 1,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(10, 27, 64, 0.06)',
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceListinoText: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    textDecorationLine: 'line-through',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 1,
  },
  vipPriceText: {
    fontSize: 20,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  tariffaVipLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
    marginLeft: 5,
  },
  pointsEarnedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  pointsEarnedChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.goldDark,
    marginLeft: 3,
  },
  openDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.navyDeep,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  openDetailsBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginRight: 4,
  },
});
