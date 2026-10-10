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
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import { HeaderBrand } from '@/components/HeaderBrand';
import { DestinationBannerCard } from '@/components/DestinationBannerCard';

const CATEGORIES = ['Todos', 'Estadías Membresía', 'Streaming & Ocio', 'Hoteles 5★', 'Tours VIP', 'Traslados VIP'];

const SERVICES_DATA = [
  // 1. ESTADÍAS INCLUIDAS DE MEMBRESÍA ($99 HERO PRODUCT)
  {
    id: 's-1',
    serviceId: 'estadia-cancun',
    categoryType: 'Estadías Membresía',
    category: 'Estadía Incluida',
    categoryIcon: 'gift-outline' as const,
    city: 'Cancún (5D / 4N)',
    name: 'Cancún Luxury Beach Resort (5D / 4N)',
    location: 'Zona Hotelera, Cancún, México',
    image: require('@/assets/images/cancun-resort.jpg'),
    discountText: '100% Bonificado',
    disclaimer: '*4 personas incluidas con tu membresía anual',
    price: '$0 VIP',
  },
  {
    id: 's-2',
    serviceId: 'estadia-miami',
    categoryType: 'Estadías Membresía',
    category: 'Estadía Incluida',
    categoryIcon: 'gift-outline' as const,
    city: 'Miami (7D / 6N)',
    name: 'Miami Oceanfront Suites (7D / 6N)',
    location: 'South Beach & Sunny Isles, Miami, USA',
    image: require('@/assets/images/caribbean-resort.jpg'),
    discountText: '100% Bonificado',
    disclaimer: '*4 personas incluidas con tu membresía anual',
    price: '$0 VIP',
  },
  {
    id: 's-3',
    serviceId: 'estadia-colombia',
    categoryType: 'Estadías Membresía',
    category: 'Estadía Incluida',
    categoryIcon: 'gift-outline' as const,
    city: 'Cartagena (3D / 2N)',
    name: 'Cartagena de Indias Colonial & Beach (3D / 2N)',
    location: 'Centro Histórico & Bocagrande, Colombia',
    image: require('@/assets/images/cruise.jpg'),
    discountText: '100% Bonificado',
    disclaimer: '*4 personas incluidas con tu membresía anual',
    price: '$0 VIP',
  },

  // 2. STREAMING & ENTRETENIMIENTO VIP
  {
    id: 'str-1',
    serviceId: 'streaming-pass-vip',
    categoryType: 'Streaming & Ocio',
    category: 'Streaming & Ocio',
    categoryIcon: 'film-outline' as const,
    city: 'Pase Streaming Global VIP',
    name: 'Netflix 4K + Disney+ + Spotify Premium Anual',
    location: 'Acceso Global sin límites geográficos',
    image: require('@/assets/images/flight-window.jpg'),
    discountText: '75% de descuento',
    disclaimer: '*cuentas 4K UHD para viajes y hogar',
    price: '$45 VIP',
  },
  {
    id: 'str-2',
    serviceId: 'starlink-travel-wifi',
    categoryType: 'Streaming & Ocio',
    category: 'WiFi Satelital',
    categoryIcon: 'wifi-outline' as const,
    city: 'Starlink Satelital Global',
    name: 'Internet Satelital In-Flight & Rutas Marítimas',
    location: 'Cobertura en más de 120 países y vuelos',
    image: require('@/assets/images/hero-luxury.jpg'),
    discountText: '70% de descuento',
    disclaimer: '*hasta 220 Mbps ilimitados sin roaming',
    price: '$35 VIP',
  },
  {
    id: 'str-3',
    serviceId: 'cinema-vip-pass',
    categoryType: 'Streaming & Ocio',
    category: 'Cine VIP & Estrenos',
    categoryIcon: 'ticket-outline' as const,
    city: 'Cine VIP 2x1 Anual',
    name: 'Pase 2x1 Salas Prime & Butacas Reclinables',
    location: 'Perú, España, Italia, México & USA',
    image: require('@/assets/images/hotel-suite.jpg'),
    discountText: '70% de descuento',
    disclaimer: '*entradas 2x1 y barra gourmet todo el año',
    price: '$18 VIP',
  },

  // 3. TOURS VIP
  {
    id: 't-1',
    serviceId: 'tour-machu-picchu',
    categoryType: 'Tours VIP',
    category: 'Tours & Experiencias',
    categoryIcon: 'compass-outline' as const,
    city: 'Machu Picchu VIP',
    name: 'Machu Picchu VIP & Valle Sagrado con Tren Panorámico',
    location: 'Cusco & Machu Picchu, Perú',
    image: require('@/assets/images/machu-picchu.jpg'),
    discountText: 'de descuento',
    disclaimer: '*tren panorámico y guía arqueológico privado',
    price: '$240 VIP',
  },

  // 4. TRASLADOS VIP
  {
    id: 'tr-1',
    serviceId: 'transfer-mercedes-vip',
    categoryType: 'Traslados VIP',
    category: 'Traslados Chauffeur',
    categoryIcon: 'car-sport-outline' as const,
    city: 'Mercedes Clase S / V',
    name: 'Transfer Ejecutivo Mercedes Chauffeur Aeropuerto',
    location: 'Lima / Madrid / Miami / Venecia',
    image: require('@/assets/images/hero-luxury.jpg'),
    discountText: 'de descuento',
    disclaimer: '*chofer de traje con espera prioritaria',
    price: '€95 VIP',
  },

  // 4. HOTELES 5★
  {
    id: 'h-1',
    serviceId: 'hotel-cipriani',
    categoryType: 'Hoteles 5★',
    category: 'Hoteles',
    categoryIcon: 'bed-outline' as const,
    city: 'Madrid',
    name: 'Mandarin Oriental Ritz & Four Seasons',
    location: 'Madrid, España',
    image: require('@/assets/images/madrid.jpg'),
    discountText: 'de descuento',
    disclaimer: '*aplica en hoteles seleccionados',
    price: '€280',
  },
  {
    id: 'h-2',
    serviceId: 'cancun-resort',
    categoryType: 'Hoteles 5★',
    category: 'Hoteles',
    categoryIcon: 'bed-outline' as const,
    city: 'Miami',
    name: 'Faena Hotel & 1 Hotel South Beach',
    location: 'Miami Beach, USA',
    image: require('@/assets/images/caribbean-resort.jpg'),
    discountText: 'de descuento',
    disclaimer: '*aplica en hoteles seleccionados',
    price: '$340',
  },
  {
    id: 'h-3',
    serviceId: 'sanctuary-lodge',
    categoryType: 'Hoteles 5★',
    category: 'Hoteles',
    categoryIcon: 'bed-outline' as const,
    city: 'Lima',
    name: 'Miraflores Park & Country Club Lima',
    location: 'Lima, Perú',
    image: require('@/assets/images/machu-picchu.jpg'),
    discountText: 'de descuento',
    disclaimer: '*aplica en hoteles seleccionados',
    price: '$180',
  },
  {
    id: 'h-4',
    serviceId: 'cancun-resort',
    categoryType: 'Hoteles 5★',
    category: 'Hoteles',
    categoryIcon: 'bed-outline' as const,
    city: 'Cancún',
    name: 'Grand Fiesta Americana Coral Beach',
    location: 'Cancún, México',
    image: require('@/assets/images/cancun-resort.jpg'),
    discountText: 'de descuento',
    disclaimer: '*aplica en hoteles seleccionados',
    price: '$290',
  },
  {
    id: 'h-5',
    serviceId: 'caribbean-luxury',
    categoryType: 'Hoteles 5★',
    category: 'Hoteles',
    categoryIcon: 'bed-outline' as const,
    city: 'Cartagena',
    name: 'Sofitel Legend Santa Clara & Bastión',
    location: 'Cartagena de Indias, Colombia',
    image: require('@/assets/images/cruise.jpg'),
    discountText: 'de descuento',
    disclaimer: '*aplica en hoteles seleccionados',
    price: '$210',
  },
  {
    id: 'h-6',
    serviceId: 'hotel-cipriani',
    categoryType: 'Hoteles 5★',
    category: 'Hoteles',
    categoryIcon: 'bed-outline' as const,
    city: 'Punta Cana',
    name: 'Eden Roc Cap Cana & Tortuga Bay',
    location: 'Punta Cana, Rep. Dominicana',
    image: require('@/assets/images/hotel-suite.jpg'),
    discountText: 'de descuento',
    disclaimer: '*aplica en hoteles seleccionados',
    price: '$380',
  },
];

export default function HotelsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = SERVICES_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === 'Todos' || item.categoryType === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query === '' ||
      item.city.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const handleSelectService = (serviceId: string) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({
      pathname: '/service/[id]',
      params: { id: serviceId },
    });
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
          <Text style={styles.screenTitle}>Hoteles & Experiencias Exclusivas</Text>
          <Text style={styles.screenSubtitle}>
            Estadías 5 estrellas, streaming, tours y beneficios reservados para socios
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={19} color={BrandColors.primaryBlue} />
          <TextInput
            placeholder="Buscar destino, hotel, tour o streaming..."
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

        {/* Marketplace Shortcut Banner */}
        <TouchableOpacity
          style={styles.marketplaceBannerCard}
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.selectionAsync();
            }
            router.push('/marketplace');
          }}
          activeOpacity={0.88}>
          <View style={styles.marketplaceBannerIcon}>
            <Ionicons name="storefront" size={20} color={BrandColors.goldDark} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.marketplaceBannerTitle}>Marketplace del Club</Text>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>VIP</Text>
              </View>
            </View>
            <Text style={styles.marketplaceBannerSub}>
              Gimnasios de élite, alta sastrería y spas con descuentos de hasta el -35%
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={BrandColors.navyDeep} />
        </TouchableOpacity>

        {/* Cards List (Screenshot 3 Full-Bleed Luxury Banner Style) */}
        <View style={{ marginTop: 6 }}>
          {filteredData.map((item) => (
            <DestinationBannerCard
              key={item.id}
              category={item.category}
              categoryIcon={item.categoryIcon}
              destination={item.city}
              image={item.image}
              discountText={item.discountText}
              disclaimer={item.disclaimer}
              price={item.price}
              onPress={() => handleSelectService(item.serviceId)}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  marketplaceBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  marketplaceBannerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketplaceBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  marketplaceBannerSub: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    lineHeight: 15,
    marginTop: 2,
  },
  newBadge: {
    backgroundColor: BrandColors.navyDeep,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6,
  },
  newBadgeText: {
    color: BrandColors.goldVip,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
