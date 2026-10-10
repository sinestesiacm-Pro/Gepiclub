import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import { HeaderBrand } from '@/components/HeaderBrand';
import { DestinationBannerCard } from '@/components/DestinationBannerCard';
import { useAuth } from '@/context/AuthContext';

const PRIVILEGES = [
  {
    icon: 'chatbubbles' as const,
    title: 'Concierge Personal 24/7',
    description: 'Asistente exclusivo en WhatsApp y llamada para reservas y requerimientos a medida.',
  },
  {
    icon: 'film' as const,
    title: 'Streaming & Entretenimiento Global',
    description: 'Pases de streaming 4K, cine VIP 2x1 e Internet satelital Starlink en tus viajes.',
  },
  {
    icon: 'airplane' as const,
    title: 'Salas VIP Lounge en Aeropuertos',
    description: 'Acceso prioritario con acompañante en más de 1.400 salones internacionales.',
  },
  {
    icon: 'pricetag' as const,
    title: 'Hasta -35% en Vuelos & Hoteles',
    description: 'Tarifas B2B negociadas directamente con cadenas y aerolíneas aliadas.',
  },
  {
    icon: 'car-sport' as const,
    title: 'Chauffeur Ejecutivo de Lujo',
    description: 'Traslados con chofer privado de traje en Mercedes Clase S o Van VIP.',
  },
  {
    icon: 'shield-checkmark' as const,
    title: 'Póliza Médica Platinum Global',
    description: 'Cobertura médica internacional, cancelación y protección total de equipaje.',
  },
];

const INCLUDED_STAYS = [
  {
    id: '1',
    serviceId: 'estadia-cancun',
    category: 'Estadía de Regalo',
    city: 'Cancún (5D / 4N)',
    image: require('@/assets/images/cancun-resort.jpg'),
    discountText: '100% Bonificado',
    disclaimer: '*4 personas incluidas con tu membresía anual',
    price: '$0 VIP',
  },
  {
    id: '2',
    serviceId: 'estadia-miami',
    category: 'Estadía de Regalo',
    city: 'Miami (7D / 6N)',
    image: require('@/assets/images/caribbean-resort.jpg'),
    discountText: '100% Bonificado',
    disclaimer: '*4 personas incluidas con tu membresía anual',
    price: '$0 VIP',
  },
  {
    id: '3',
    serviceId: 'estadia-colombia',
    category: 'Estadía de Regalo',
    city: 'Cartagena (3D / 2N)',
    image: require('@/assets/images/cruise.jpg'),
    discountText: '100% Bonificado',
    disclaimer: '*4 personas incluidas con tu membresía anual',
    price: '$0 VIP',
  },
];

export default function VipClubScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { profile, user } = useAuth();

  const cardHolder =
    profile?.full_name?.toUpperCase() ||
    (user?.email ? user.email.split('@')[0].toUpperCase() : 'LUCA');
  const cardNumber = profile?.vip_card_number || '••••  ••••  ••••  8829';
  const cardTier = profile?.membership_tier === 'GOLD_VIP' ? 'GOLD VIP' : 'BLACK ELITE';
  const points = (profile?.club_points ?? 42500).toLocaleString('es-ES');
  const creditValue = Math.round((profile?.club_points ?? 42500) * 0.02);

  const referralCode = profile?.full_name
    ? `GP-${profile.full_name.split(' ')[0].toUpperCase()}26`
    : 'GP-SOCIO2026';

  const handleOpenWhatsApp = () => {
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    Linking.openURL(
      `https://wa.me/51999999999?text=Hola%20Concierge%20Gepiclub,%20soy%20el%20socio%20${encodeURIComponent(
        cardHolder
      )}%20(ID:%20${encodeURIComponent(cardNumber)}).%20Deseo%20asistencia%20personalizada%20para%20un%20viaje.`
    );
  };

  const handleCallLine = () => {
    Linking.openURL('tel:+51999999999');
  };

  const handleShareReferral = async () => {
    if (Platform.OS === 'ios') {
      Haptics.selectionAsync();
    }
    try {
      await Share.share({
        message: `¡Únete a Gepiclub conmigo! Usa mi código ${referralCode} para activar tu membresía anual por $99 y reclamar tus 3 estadías de regalo para 4 personas (Cancún, Miami y Colombia): https://gepiclub.com`,
      });
    } catch {
      // Ignored
    }
  };

  const handleWhatsAppReferral = () => {
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    const msg = encodeURIComponent(
      `¡Hola! Te invito a unirte a Gepiclub Travel. Usa mi código ${referralCode} para obtener tu membresía anual que incluye 3 estadías de bienvenida para hasta 4 personas (Cancún, Miami y Colombia) además de tarifas B2B de vuelos y hoteles: https://gepiclub.com`
    );
    Linking.openURL(`https://wa.me/?text=${msg}`);
  };

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

        {/* Section Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Gepiclub <Text style={{ color: BrandColors.goldVip }}>VIP</Text>
          </Text>
          <Text style={styles.headerSubtitle}>
            Tu pasaporte a una experiencia de viaje y beneficios sin límites
          </Text>
        </View>

        {/* Digital Membership Card (Titanium Black & Gold Inside Clean Luxury) */}
        <LinearGradient
          colors={['#101C38', '#08142C', '#040B18']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardContainer}>

          <View style={styles.cardTopRow}>
            <View style={styles.cardBrandBadge}>
              <Text style={styles.cardBrandText}>GEPICLUB</Text>
              <Text style={styles.cardTierText}>{cardTier}</Text>
            </View>

            <View style={styles.cardChip}>
              <View style={styles.cardChipInner} />
            </View>
          </View>

          <View style={styles.cardNumberBox}>
            <Text style={styles.cardNumber}>{cardNumber}</Text>
          </View>

          <View style={styles.cardBottomRow}>
            <View>
              <Text style={styles.cardLabel}>TITULAR DE LA TARJETA</Text>
              <Text style={styles.cardHolderName}>{cardHolder}</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.cardLabel}>ESTADO</Text>
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>SOCIO ACTIVO</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Balance Card (Pure White Clean Luxury) */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>SALDO DE PUNTOS GEPICLUB</Text>
            <View style={styles.balanceRow}>
              <Ionicons name="sparkles" size={20} color={BrandColors.goldVip} />
              <Text style={styles.balanceValue}>{points}</Text>
              <Text style={styles.balanceCurrency}>pts</Text>
            </View>
            <Text style={styles.balanceCredit}>Valor estimado: ${creditValue} en créditos de viaje</Text>
          </View>

          <TouchableOpacity
            style={styles.redeemBtn}
            onPress={() => {
              if (Platform.OS === 'ios') {
                Haptics.selectionAsync();
              }
              router.push('/marketplace');
            }}
            activeOpacity={0.8}>
            <Text style={styles.redeemBtnText}>Usar Puntos</Text>
            <Ionicons name="arrow-forward" size={13} color={BrandColors.primaryBlue} />
          </TouchableOpacity>
        </View>

        {/* 3 Included Stays Section ("VIVE MÁS POR MENOS" - Hero $99 Benefit) */}
        <View style={styles.staysSection}>
          <View style={styles.staysHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Tus 3 Estadías Incluidas</Text>
              <Text style={styles.sectionSubtitle}>
                Beneficio de membresía: 4 personas incluidas ($0 VIP)
              </Text>
            </View>
            <View style={styles.membersBadge}>
              <Ionicons name="people" size={12} color={BrandColors.goldVip} />
              <Text style={styles.membersBadgeText}>4 PERSONAS</Text>
            </View>
          </View>

          <View style={{ marginTop: 8 }}>
            {INCLUDED_STAYS.map((stay) => (
              <DestinationBannerCard
                key={stay.id}
                category={stay.category}
                categoryIcon="gift-outline"
                destination={stay.city}
                image={stay.image}
                discountText={stay.discountText}
                disclaimer={stay.disclaimer}
                price={stay.price}
                onPress={() => handleSelectService(stay.serviceId)}
              />
            ))}
          </View>
        </View>

        {/* Referral Program Card ("Invita y Gana 5.000 pts") */}
        <View style={styles.referralCard}>
          <LinearGradient
            colors={['#101C38', '#08142C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.referralGradient}>
            <View style={styles.referralHeader}>
              <View style={styles.referralIconBox}>
                <Ionicons name="sparkles" size={18} color={BrandColors.goldVip} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.referralTitle}>Invita y Gana Viajes</Text>
                  <View style={styles.referralBadge}>
                    <Text style={styles.referralBadgeText}>+5.000 PTS</Text>
                  </View>
                </View>
                <Text style={styles.referralSub}>
                  Gana €100 en créditos de viaje por cada amigo que se una con tu código
                </Text>
              </View>
            </View>

            <View style={styles.referralCodeBox}>
              <View>
                <Text style={styles.referralCodeLabel}>TU CÓDIGO DE INVITACIÓN</Text>
                <Text style={styles.referralCodeText}>{referralCode}</Text>
              </View>
              <TouchableOpacity
                style={styles.referralShareBtn}
                onPress={handleShareReferral}
                activeOpacity={0.8}>
                <Ionicons name="share-outline" size={14} color={BrandColors.navyDeep} />
                <Text style={styles.referralShareBtnText}>Compartir</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.referralWhatsAppBtn}
              onPress={handleWhatsAppReferral}
              activeOpacity={0.85}>
              <LinearGradient
                colors={['#25D366', '#128C7E']}
                style={styles.referralWhatsAppGradient}>
                <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                <Text style={styles.referralWhatsAppText}>Invitar por WhatsApp Directo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Concierge Action Box */}
        <View style={styles.conciergeCard}>
          <LinearGradient
            colors={[BrandColors.navyDeep, '#132856']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.conciergeCardGradient}>
            <View style={styles.conciergeHeader}>
              <View style={styles.conciergeIconBox}>
                <Ionicons name="headset" size={20} color={BrandColors.goldVip} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.conciergeTitle}>Asistente de Viaje Personal (Concierge 24/7)</Text>
                <Text style={styles.conciergeSub}>Línea directa prioritaria para resolver tus itinerarios y reservas</Text>
              </View>
            </View>

            <View style={styles.conciergeButtonsRow}>
              <TouchableOpacity
                style={styles.conciergeActionBtn}
                onPress={handleOpenWhatsApp}
                activeOpacity={0.85}>
                <LinearGradient
                  colors={['#25D366', '#128C7E']}
                  style={styles.conciergeActionGradient}>
                  <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                  <Text style={styles.conciergeActionText}>Chat de WhatsApp</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.conciergeCallBtn}
                onPress={handleCallLine}
                activeOpacity={0.85}>
                <Ionicons name="call-outline" size={16} color="#FFFFFF" />
                <Text style={styles.conciergeCallText}>Llamar a Línea VIP</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Marketplace VIP Banner */}
        <TouchableOpacity
          style={styles.vipMarketBanner}
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.selectionAsync();
            }
            router.push('/marketplace');
          }}
          activeOpacity={0.88}>
          <View style={styles.vipMarketIconBox}>
            <Ionicons name="storefront" size={20} color={BrandColors.goldDark} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.vipMarketTitle}>Marketplace & Convenios</Text>
              <View style={styles.vipMarketBadge}>
                <Text style={styles.vipMarketBadgeText}>B2B VIP</Text>
              </View>
            </View>
            <Text style={styles.vipMarketSub}>
              Gimnasios de élite, sastrería a medida, clínicas estéticas y spas
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={BrandColors.navyDeep} />
        </TouchableOpacity>

        {/* Exclusive Privileges List */}
        <View style={styles.privilegesHeader}>
          <Text style={styles.sectionTitle}>Tus Privilegios Exclusivos</Text>
          <Text style={styles.sectionSubtitle}>Incluidos con tu membresía activa Gepiclub</Text>
        </View>

        {PRIVILEGES.map((item, idx) => (
          <View key={idx} style={styles.privilegeItem}>
            <View style={styles.privilegeIconWrapper}>
              <Ionicons name={item.icon} size={20} color={BrandColors.goldVip} />
            </View>

            <View style={styles.privilegeContent}>
              <Text style={styles.privilegeTitle}>{item.title}</Text>
              <Text style={styles.privilegeDesc}>{item.description}</Text>
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
  header: {
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    marginTop: 3,
  },
  cardContainer: {
    height: 195,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrandBadge: {
    flexDirection: 'column',
  },
  cardBrandText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  cardTierText: {
    color: BrandColors.goldVip,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 2,
  },
  cardChip: {
    width: 36,
    height: 26,
    borderRadius: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.35)',
    borderWidth: 1,
    borderColor: BrandColors.goldVip,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardChipInner: {
    width: 20,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: BrandColors.goldVip,
  },
  cardNumberBox: {
    marginVertical: 10,
  },
  cardNumber: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 3,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  cardHolderName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.goldVip,
    marginRight: 6,
  },
  statusText: {
    color: BrandColors.goldVip,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.grayMuted,
    letterSpacing: 0.5,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    marginLeft: 6,
  },
  balanceCurrency: {
    fontSize: 12,
    fontWeight: '600',
    color: BrandColors.grayMuted,
    marginLeft: 4,
  },
  balanceCredit: {
    fontSize: 11,
    color: BrandColors.emeraldSuccess,
    fontWeight: '700',
    marginTop: 3,
  },
  redeemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 115, 230, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  redeemBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
    marginRight: 4,
  },
  conciergeCard: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  conciergeCardGradient: {
    padding: 16,
  },
  conciergeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  conciergeIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conciergeTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  conciergeSub: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    marginTop: 2,
  },
  conciergeButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  conciergeActionBtn: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  conciergeActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  conciergeActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  conciergeCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 10,
  },
  conciergeCallText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  privilegesHeader: {
    marginBottom: 10,
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
  privilegeItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.07)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  privilegeIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  privilegeContent: {
    flex: 1,
  },
  privilegeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginBottom: 2,
  },
  privilegeDesc: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    lineHeight: 15,
  },
  vipMarketBanner: {
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
  vipMarketIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipMarketTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  vipMarketBadge: {
    backgroundColor: BrandColors.navyDeep,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6,
  },
  vipMarketBadgeText: {
    color: BrandColors.goldVip,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  vipMarketSub: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    lineHeight: 15,
    marginTop: 2,
  },
  staysSection: {
    marginBottom: 16,
  },
  staysHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  membersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  membersBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: BrandColors.goldVip,
    letterSpacing: 0.5,
  },
  referralCard: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  referralGradient: {
    padding: 16,
  },
  referralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  referralIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  referralTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  referralBadge: {
    backgroundColor: BrandColors.goldVip,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  referralBadgeText: {
    color: BrandColors.navyDeep,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  referralSub: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  },
  referralCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  referralCodeLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  referralCodeText: {
    color: BrandColors.goldVip,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 2,
  },
  referralShareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.goldVip,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  referralShareBtnText: {
    color: BrandColors.navyDeep,
    fontSize: 11,
    fontWeight: '800',
  },
  referralWhatsAppBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  referralWhatsAppGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    gap: 8,
  },
  referralWhatsAppText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
