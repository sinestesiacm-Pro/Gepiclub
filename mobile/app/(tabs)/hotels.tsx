import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { BrandColors } from '@/constants/Colors';
import { HeaderBrand } from '@/components/HeaderBrand';

const CATEGORIES = ['Tutti', '5★ Lusso', 'Vista Mare', 'Resort & Spa', 'All-Inclusive'];

const HOTELS_DATA = [
  {
    id: '1',
    name: 'Belmond Hotel Cipriani',
    location: 'Isola della Giudecca, Venezia',
    rating: '5.0',
    reviews: '482 recensioni',
    image: require('@/assets/images/hotel-suite.jpg'),
    perks: ['Upgrade Gratuito', 'Colazione Gourmet', '$100 Spa Credit'],
    regularPrice: '€1.150',
    vipPrice: '€890',
    discount: '-23%',
    featured: true,
  },
  {
    id: '2',
    name: 'Sanctuary Lodge, A Belmond Hotel',
    location: 'Machu Picchu, Perù',
    rating: '4.9',
    reviews: '310 recensioni',
    image: require('@/assets/images/machu-picchu.jpg'),
    perks: ['Accesso Esclusivo Rovine', 'Pensione Completa', 'Guida Privata'],
    regularPrice: '$980',
    vipPrice: '$740',
    discount: '-25%',
    featured: false,
  },
  {
    id: '3',
    name: 'Grand Velas Riviera Maya',
    location: 'Playa del Carmen, Caraibi',
    rating: '4.9',
    reviews: '520 recensioni',
    image: require('@/assets/images/hero-luxury.jpg'),
    perks: ['Ultra All-Inclusive', 'Suite Fronte Mare', 'Maggiordomo Privato'],
    regularPrice: '$760',
    vipPrice: '$520',
    discount: '-32%',
    featured: false,
  },
  {
    id: '4',
    name: 'Mandarin Oriental Ritz',
    location: 'Madrid, Spagna',
    rating: '4.9',
    reviews: '290 recensioni',
    image: require('@/assets/images/madrid.jpg'),
    perks: ['Late Check-out 16:00', 'Transfer NCC Omaggio', 'Welcome Champagne'],
    regularPrice: '€840',
    vipPrice: '€610',
    discount: '-27%',
    featured: false,
  },
];

export default function HotelsScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookHotel = (hotelName: string) => {
    Linking.openURL(
      `https://wa.me/51999999999?text=Salve%20Gepiclub,%20vorrei%20prenotare%20con%20tariffa%20VIP%20la%20struttura:%20${encodeURIComponent(
        hotelName
      )}`
    );
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

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Hotel & Resort Esclusivi</Text>
          <Text style={styles.screenSubtitle}>
            Soggiorni 5 stelle e oasi private selezionate con tariffe riservate
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={19} color={BrandColors.primaryBlue} />
          <TextInput
            placeholder="Cerca città, resort o isola privata..."
            placeholderTextColor={BrandColors.grayMuted}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={17} color={BrandColors.navyDeep} />
          </TouchableOpacity>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                activeCategory === cat && styles.categoryPillActive,
              ]}
              onPress={() => setActiveCategory(cat)}>
              <Text
                style={[
                  styles.categoryPillText,
                  activeCategory === cat && styles.categoryPillTextActive,
                ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hotel Cards List */}
        {HOTELS_DATA.map((hotel) => (
          <View key={hotel.id} style={styles.hotelCard}>
            <View style={styles.imageContainer}>
              <Image source={hotel.image} style={styles.hotelImage} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(10, 27, 64, 0.75)']}
                style={styles.imageGradient}
              />

              {/* Badges on Image */}
              <View style={styles.imageTopRow}>
                {hotel.featured ? (
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>SELEZIONE DIAMANTE</Text>
                  </View>
                ) : (
                  <View style={styles.emptyBadge} />
                )}

                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={BrandColors.goldVip} />
                  <Text style={styles.ratingText}>{hotel.rating}</Text>
                </View>
              </View>

              {/* Location Tag */}
              <View style={styles.imageBottomRow}>
                <View style={styles.locationPill}>
                  <Ionicons name="location-sharp" size={12} color="#FFFFFF" />
                  <Text style={styles.locationText}>{hotel.location}</Text>
                </View>
              </View>
            </View>

            {/* Hotel Card Details */}
            <View style={styles.cardContent}>
              <Text style={styles.hotelName}>{hotel.name}</Text>

              {/* Perks Row */}
              <View style={styles.perksList}>
                {hotel.perks.map((perk, index) => (
                  <View key={index} style={styles.perkChip}>
                    <Ionicons name="checkmark-circle" size={12} color={BrandColors.goldVip} />
                    <Text style={styles.perkChipText}>{perk}</Text>
                  </View>
                ))}
              </View>

              {/* Price & Booking Button */}
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.regularPriceText}>Tariffa pubblica {hotel.regularPrice}</Text>
                  <View style={styles.vipPriceContainer}>
                    <Text style={styles.vipPrice}>{hotel.vipPrice}</Text>
                    <Text style={styles.nightText}>/ notte</Text>
                    <View style={styles.discountPill}>
                      <Text style={styles.discountText}>{hotel.discount}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookHotel(hotel.name)}
                  activeOpacity={0.88}>
                  <LinearGradient
                    colors={[BrandColors.primaryBlue, BrandColors.navyDeep]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bookGradient}>
                    <Text style={styles.bookButtonText}>Prenota VIP</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
  titleSection: {
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.2,
  },
  screenSubtitle: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    marginTop: 3,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '500',
    color: BrandColors.navyDeep,
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    paddingBottom: 14,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    marginRight: 6,
  },
  categoryPillActive: {
    backgroundColor: BrandColors.navyDeep,
    borderColor: BrandColors.navyDeep,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: BrandColors.grayMuted,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  hotelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  hotelImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFill,
  },
  imageTopRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredBadge: {
    backgroundColor: BrandColors.goldVip,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredBadgeText: {
    color: BrandColors.navyDeep,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  emptyBadge: {
    width: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 27, 64, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  imageBottomRow: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
  cardContent: {
    padding: 16,
  },
  hotelName: {
    fontSize: 17,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginBottom: 8,
  },
  perksList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  perkChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  perkChipText: {
    fontSize: 10,
    fontWeight: '600',
    color: BrandColors.navyDeep,
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(10, 27, 64, 0.06)',
    paddingTop: 12,
  },
  regularPriceText: {
    fontSize: 10,
    color: BrandColors.grayMuted,
    textDecorationLine: 'line-through',
  },
  vipPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  vipPrice: {
    fontSize: 21,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  nightText: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginLeft: 4,
  },
  discountPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.2)',
  },
  discountText: {
    fontSize: 10,
    fontWeight: '800',
    color: BrandColors.emeraldSuccess,
  },
  bookButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
