import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import { HeaderBrand } from '@/components/HeaderBrand';
import { useAuth } from '@/context/AuthContext';

const PRIVILEGES = [
  {
    icon: 'chatbubbles' as const,
    title: 'Concierge Personale 24/7',
    description: 'Assistente dedicato in Italia e Perù per ogni richiesta o itinerario su misura.',
  },
  {
    icon: 'airplane' as const,
    title: 'Accesso VIP Lounge Aeroportuali',
    description: 'Ingresso illimitato con ospite in oltre 1.400 lounge mondiali.',
  },
  {
    icon: 'pricetag' as const,
    title: 'Fino al -35% su Voli & Hotel',
    description: 'Tariffe B2B negoziate direttamente con le catene partner senza intermediari.',
  },
  {
    icon: 'car-sport' as const,
    title: 'Chauffeur NCC di Lusso',
    description: 'Transfer aeroportuale con veicoli executive (Mercedes Classe S o Van VIP).',
  },
  {
    icon: 'shield-checkmark' as const,
    title: 'Polizza Platinum Globale',
    description: 'Copertura medica illimitata, cancellazione volo e tutela bagaglio garantita.',
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
  const points = (profile?.club_points ?? 42500).toLocaleString('it-IT');
  const creditValue = Math.round((profile?.club_points ?? 42500) * 0.02);

  const handleOpenWhatsApp = () => {
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    Linking.openURL(
      `https://wa.me/51999999999?text=Salve%20Concierge%20Gepiclub,%20sono%20il%20socio%20${encodeURIComponent(
        cardHolder
      )}%20(ID:%20${encodeURIComponent(cardNumber)}).%20Desidero%20assistenza%20per%20un%20viaggio.`
    );
  };

  const handleCallLine = () => {
    Linking.openURL('tel:+51999999999');
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
            Il tuo passaporto per un'esperienza di viaggio senza compromessi
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
              <Text style={styles.cardLabel}>TITOLARE CARTA</Text>
              <Text style={styles.cardHolderName}>{cardHolder}</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.cardLabel}>STATUS</Text>
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>SOCIO ATTIVO</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Balance Card (Pure White Clean Luxury) */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>SALDO PUNTI GEPICLUB</Text>
            <View style={styles.balanceRow}>
              <Ionicons name="sparkles" size={20} color={BrandColors.goldVip} />
              <Text style={styles.balanceValue}>{points}</Text>
              <Text style={styles.balanceCurrency}>pts</Text>
            </View>
            <Text style={styles.balanceCredit}>Valore stimato: €{creditValue} di crediti viaggio</Text>
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
            <Text style={styles.redeemBtnText}>Usa Punti</Text>
            <Ionicons name="arrow-forward" size={13} color={BrandColors.primaryBlue} />
          </TouchableOpacity>
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
                <Text style={styles.conciergeTitle}>Assistente di Viaggio Personale</Text>
                <Text style={styles.conciergeSub}>Disponibile 24/7 in linea diretta prioritaria</Text>
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
                  <Text style={styles.conciergeActionText}>Chat WhatsApp</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.conciergeCallBtn}
                onPress={handleCallLine}
                activeOpacity={0.85}>
                <Ionicons name="call-outline" size={16} color="#FFFFFF" />
                <Text style={styles.conciergeCallText}>Chiama Linea VIP</Text>
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
              <Text style={styles.vipMarketTitle}>Marketplace & Convenzioni</Text>
              <View style={styles.vipMarketBadge}>
                <Text style={styles.vipMarketBadgeText}>B2B VIP</Text>
              </View>
            </View>
            <Text style={styles.vipMarketSub}>
              Palestre d'élite, sartoria su misura, cliniche estetiche e resort esclusivi
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={BrandColors.navyDeep} />
        </TouchableOpacity>

        {/* Exclusive Privileges List */}
        <View style={styles.privilegesHeader}>
          <Text style={styles.sectionTitle}>I Tuoi Privilegi Esclusivi</Text>
          <Text style={styles.sectionSubtitle}>Inclusi nella tua adesione Black Elite</Text>
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
});
