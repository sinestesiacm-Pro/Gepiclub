import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import { getServiceById, SERVICES_CATALOG } from '@/data/servicesData';
import { useAuth } from '@/context/AuthContext';

type PaymentMethod = 'card' | 'apple_pay' | 'wire';

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { profile, user } = useAuth();
  const { serviceId, optionId } = useLocalSearchParams<{
    serviceId: string;
    optionId?: string;
  }>();

  const service = getServiceById(serviceId as string) || SERVICES_CATALOG[0];
  const selectedOption =
    service.options.find((o) => o.id === optionId) || service.options[0];

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [usePoints, setUsePoints] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');
  const [guestName, setGuestName] = useState(
    profile?.full_name || 'Luca Rossi'
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Financial calculations
  const optionModifier = selectedOption?.priceModifier || 0;
  const baseVipPrice = service.vipPrice + optionModifier;
  const basePublicPrice = service.publicPrice + optionModifier;
  const clubSavings = basePublicPrice - baseVipPrice;

  // Points redemption value (5.000 pts = €50 discount)
  const availablePoints = profile?.club_points ?? 42500;
  const pointsToRedeem = 5000;
  const pointsDiscountValue = 50;

  const pointsDiscountApplied =
    usePoints && availablePoints >= pointsToRedeem ? pointsDiscountValue : 0;
  const finalTotal = Math.max(0, baseVipPrice - pointsDiscountApplied);

  const handleTogglePoints = () => {
    if (Platform.OS === 'ios') {
      Haptics.selectionAsync();
    }
    setUsePoints(!usePoints);
  };

  const handleSelectPayment = (method: PaymentMethod) => {
    if (Platform.OS === 'ios') {
      Haptics.selectionAsync();
    }
    setPaymentMethod(method);
  };

  const handleConfirmBooking = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderCode = `GP-${new Date().getFullYear()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`;

      if (Platform.OS === 'ios') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      router.push({
        pathname: '/checkout/success',
        params: {
          orderCode: generatedOrderCode,
          serviceId: service.id,
          optionId: selectedOption?.id,
          finalAmount: finalTotal.toString(),
          pointsUsed: pointsDiscountApplied > 0 ? pointsToRedeem.toString() : '0',
          pointsEarned: service.pointsEarned.toString(),
          guestName,
          paymentMethod,
        },
      });
    }, 700);
  };

  return (
    <View style={styles.container}>
      {/* Top Header with Progress Step */}
      <View
        style={[
          styles.headerBar,
          {
            paddingTop: Math.max(insets.top, 44) + 6,
          },
        ]}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={20} color={BrandColors.navyDeep} />
        </TouchableOpacity>

        <View style={styles.headerTitleCenter}>
          <Text style={styles.headerTitleText}>Checkout Sicuro VIP</Text>
          <View style={styles.stepsIndicator}>
            <View style={[styles.stepDot, styles.stepDotDone]} />
            <View style={[styles.stepLine, styles.stepLineActive]} />
            <View style={[styles.stepDot, styles.stepDotActive]} />
            <View style={styles.stepLine} />
            <View style={styles.stepDot} />
          </View>
        </View>

        <View style={styles.headerSecurityIcon}>
          <Ionicons name="lock-closed" size={17} color={BrandColors.emeraldSuccess} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 110,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* 1. Service Summary Card */}
        <View style={styles.cardContainer}>
          <View style={styles.serviceRow}>
            <Image source={service.image} style={styles.serviceThumbnail} resizeMode="cover" />
            <View style={styles.serviceMeta}>
              <View style={styles.badgeRow}>
                <View style={styles.categoryChip}>
                  <Text style={styles.categoryChipText}>{service.categoryLabel.toUpperCase()}</Text>
                </View>
                <View style={styles.goldBadge}>
                  <Ionicons name="shield-checkmark" size={11} color={BrandColors.goldVip} />
                  <Text style={styles.goldBadgeText}>VIP</Text>
                </View>
              </View>

              <Text style={styles.serviceName} numberOfLines={2}>
                {service.title}
              </Text>
              <Text style={styles.partnerName} numberOfLines={1}>
                {service.partnerName}
              </Text>
            </View>
          </View>

          {/* Selected Option Pill */}
          <View style={styles.selectedOptionBox}>
            <View style={styles.optionTag}>
              <Ionicons name="checkmark-circle" size={14} color={BrandColors.primaryBlue} />
              <Text style={styles.optionTagLabel}>Opzione: {selectedOption?.label}</Text>
            </View>
            <Text style={styles.optionTagPrice}>
              {optionModifier > 0 ? `+${service.currencySymbol}${optionModifier}` : 'Inclusa'}
            </Text>
          </View>
        </View>

        {/* 2. VIP Member / Beneficiary Data Card */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderIcon}>
              <Ionicons name="person" size={16} color={BrandColors.primaryBlue} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardSectionTitle}>Intestatario della Prenotazione</Text>
              <Text style={styles.cardSectionSub}>
                Tessera {profile?.membership_tier === 'GOLD_VIP' ? 'Gold VIP' : 'Black Elite'} #
                {profile?.vip_card_number?.slice(-4) || '8829'}
              </Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>NOME E COGNOME DEL TITOLARE / OSPITE</Text>
            <View style={styles.inputFieldWrap}>
              <Ionicons name="person-outline" size={16} color={BrandColors.grayMuted} />
              <TextInput
                style={styles.textInput}
                value={guestName}
                onChangeText={setGuestName}
                placeholder="Nome Cognome"
                placeholderTextColor={BrandColors.grayMuted}
              />
            </View>
          </View>

          <View style={[styles.inputGroup, { marginTop: 12 }]}>
            <Text style={styles.inputLabel}>EMAIL DI CONFERMA & BIGLIETTO</Text>
            <View style={[styles.inputFieldWrap, styles.inputFieldDisabled]}>
              <Ionicons name="mail-outline" size={16} color={BrandColors.grayMuted} />
              <Text style={styles.disabledInputText}>
                {profile?.email || user?.email || 'socio.vip@gepiclub.com'}
              </Text>
            </View>
          </View>

          <View style={[styles.inputGroup, { marginTop: 12 }]}>
            <Text style={styles.inputLabel}>NOTE O RICHIESTE PARTICOLARI PER IL CONCIERGE</Text>
            <View style={styles.inputFieldWrap}>
              <Ionicons name="create-outline" size={16} color={BrandColors.grayMuted} />
              <TextInput
                style={styles.textInput}
                value={specialNotes}
                onChangeText={setSpecialNotes}
                placeholder="Es. arrivo in serata, preferenza cuscini, allergie..."
                placeholderTextColor={BrandColors.grayMuted}
              />
            </View>
          </View>
        </View>

        {/* 3. Club Points Redemption Card */}
        <View style={[styles.cardContainer, styles.pointsCard]}>
          <View style={styles.pointsHeaderRow}>
            <View style={styles.pointsIconBox}>
              <Ionicons name="sparkles" size={18} color={BrandColors.goldVip} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.pointsCardTitle}>Riscatta Punti Gepiclub</Text>
              <Text style={styles.pointsCardBalance}>
                Saldo disponibile: {availablePoints.toLocaleString('it-IT')} pts
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.pointsToggleBtn,
                usePoints && styles.pointsToggleBtnActive,
              ]}
              onPress={handleTogglePoints}
              activeOpacity={0.8}>
              <View
                style={[
                  styles.toggleKnob,
                  usePoints && styles.toggleKnobActive,
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.pointsExplanation}>
            <Text style={styles.pointsExplanationText}>
              Usa 5.000 punti per ricevere uno sconto immediato di -€50 sul totale.
            </Text>
            {usePoints && (
              <View style={styles.pointsAppliedPill}>
                <Ionicons name="checkmark-circle" size={13} color={BrandColors.emeraldSuccess} />
                <Text style={styles.pointsAppliedText}>
                  Sconto di €50 applicato al totale
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 4. Payment Method Selection */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderIcon}>
              <Ionicons name="card" size={16} color={BrandColors.primaryBlue} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardSectionTitle}>Metodo di Pagamento</Text>
              <Text style={styles.cardSectionSub}>Transazioni cifrate a 256-bit</Text>
            </View>
          </View>

          <View style={styles.paymentMethodsList}>
            {/* Black Elite Card */}
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'card' && styles.paymentOptionActive,
              ]}
              onPress={() => handleSelectPayment('card')}
              activeOpacity={0.8}>
              <View style={styles.radioIndicator}>
                {paymentMethod === 'card' && <View style={styles.radioIndicatorDot} />}
              </View>
              <View style={styles.paymentIconBadge}>
                <Ionicons name="card-outline" size={18} color={BrandColors.navyDeep} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.paymentTitle}>Carta Black Elite Gepiclub</Text>
                <Text style={styles.paymentSub}>Circuito protetto •••• 8829</Text>
              </View>
              <View style={styles.preferredTag}>
                <Text style={styles.preferredTagText}>PREDEFINITA</Text>
              </View>
            </TouchableOpacity>

            {/* Apple Pay */}
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'apple_pay' && styles.paymentOptionActive,
              ]}
              onPress={() => handleSelectPayment('apple_pay')}
              activeOpacity={0.8}>
              <View style={styles.radioIndicator}>
                {paymentMethod === 'apple_pay' && <View style={styles.radioIndicatorDot} />}
              </View>
              <View style={styles.paymentIconBadge}>
                <Ionicons name="logo-apple" size={18} color={BrandColors.navyDeep} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.paymentTitle}>Apple Pay</Text>
                <Text style={styles.paymentSub}>Autorizzazione Face ID immediata</Text>
              </View>
            </TouchableOpacity>

            {/* Instant Wire Transfer */}
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'wire' && styles.paymentOptionActive,
              ]}
              onPress={() => handleSelectPayment('wire')}
              activeOpacity={0.8}>
              <View style={styles.radioIndicator}>
                {paymentMethod === 'wire' && <View style={styles.radioIndicatorDot} />}
              </View>
              <View style={styles.paymentIconBadge}>
                <Ionicons name="business-outline" size={18} color={BrandColors.navyDeep} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.paymentTitle}>Bonifico Istantaneo B2B</Text>
                <Text style={styles.paymentSub}>Gestito dal Concierge senza commissioni</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Summary / Price Breakdown */}
        <View style={styles.cardContainer}>
          <Text style={styles.breakdownHeaderTitle}>Riepilogo Tariffa Gepiclub</Text>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Prezzo ufficiale di listino</Text>
            <Text style={styles.breakdownValueMuted}>
              {service.currencySymbol}
              {basePublicPrice}
            </Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabelHighlight}>Sconto Riservato Soci VIP</Text>
            <Text style={styles.breakdownValueDiscount}>
              -{service.currencySymbol}
              {clubSavings}
            </Text>
          </View>

          {optionModifier > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Opzione: {selectedOption?.label}</Text>
              <Text style={styles.breakdownValue}>
                +{service.currencySymbol}
                {optionModifier}
              </Text>
            </View>
          )}

          {pointsDiscountApplied > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabelPoints}>Riscatto 5.000 Punti Club</Text>
              <Text style={styles.breakdownValuePoints}>
                -{service.currencySymbol}
                {pointsDiscountApplied}
              </Text>
            </View>
          )}

          <View style={styles.breakdownDivider} />

          <View style={styles.breakdownTotalRow}>
            <View>
              <Text style={styles.breakdownTotalLabel}>TOTALE DA CORRISPONDERE</Text>
              <Text style={styles.breakdownTotalSub}>Tasse, IVA e assistenza incluse</Text>
            </View>
            <Text style={styles.breakdownTotalValue}>
              {service.currencySymbol}
              {finalTotal}
            </Text>
          </View>

          {/* Points earned incentive */}
          <View style={styles.pointsEarnedBox}>
            <Ionicons name="sparkles" size={14} color={BrandColors.goldDark} />
            <Text style={styles.pointsEarnedText}>
              Con questa prenotazione accumulerai{' '}
              <Text style={{ fontWeight: '800' }}>+{service.pointsEarned} Punti Club</Text>
            </Text>
          </View>
        </View>

        {/* Trust Badges */}
        <View style={styles.trustBadgesRow}>
          <View style={styles.trustBadgeItem}>
            <Ionicons name="shield-checkmark-outline" size={16} color={BrandColors.emeraldSuccess} />
            <Text style={styles.trustBadgeText}>Garanzia Tariffa VIP</Text>
          </View>
          <View style={styles.trustBadgeItem}>
            <Ionicons name="lock-closed-outline" size={16} color={BrandColors.primaryBlue} />
            <Text style={styles.trustBadgeText}>Pagamento Sicuro SSL</Text>
          </View>
          <View style={styles.trustBadgeItem}>
            <Ionicons name="headset-outline" size={16} color={BrandColors.goldDark} />
            <Text style={styles.trustBadgeText}>Concierge H24</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: Math.max(insets.bottom, 14) + 6,
          },
        ]}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomTotalLabel}>TOTALE DOVUTO</Text>
          <Text style={styles.bottomTotalAmount}>
            {service.currencySymbol}
            {finalTotal}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.payBtn}
          onPress={handleConfirmBooking}
          disabled={isProcessing}
          activeOpacity={0.88}>
          <LinearGradient
            colors={[BrandColors.primaryBlue, BrandColors.navyDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.payBtnGradient}>
            {isProcessing ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <Text style={styles.payBtnText}>Conferma e Paga</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
              </>
            )}
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
  headerBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 27, 64, 0.06)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  headerBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCenter: {
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.2,
  },
  stepsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  stepDotDone: {
    backgroundColor: BrandColors.emeraldSuccess,
  },
  stepDotActive: {
    backgroundColor: BrandColors.primaryBlue,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepLine: {
    width: 14,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 3,
  },
  stepLineActive: {
    backgroundColor: BrandColors.primaryBlue,
  },
  headerSecurityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceThumbnail: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  serviceMeta: {
    flex: 1,
    marginLeft: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryChip: {
    backgroundColor: BrandColors.navyDeep,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryChipText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  goldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  goldBadgeText: {
    color: BrandColors.goldDark,
    fontSize: 9,
    fontWeight: '800',
    marginLeft: 3,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    lineHeight: 18,
  },
  partnerName: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    fontWeight: '500',
    marginTop: 2,
  },
  selectedOptionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.05)',
  },
  optionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionTagLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginLeft: 6,
  },
  optionTagPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: BrandColors.primaryBlue,
    marginLeft: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 115, 230, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  cardSectionSub: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 1,
  },
  inputGroup: {
    marginBottom: 2,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: BrandColors.grayMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  inputFieldWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputFieldDisabled: {
    backgroundColor: '#F1F5F9',
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: BrandColors.navyDeep,
    fontWeight: '600',
    marginLeft: 8,
    padding: 0,
  },
  disabledInputText: {
    flex: 1,
    fontSize: 13,
    color: BrandColors.grayMuted,
    fontWeight: '600',
    marginLeft: 8,
  },
  pointsCard: {
    backgroundColor: '#FFFDF7',
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
  pointsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  pointsCardBalance: {
    fontSize: 11,
    color: BrandColors.goldDark,
    fontWeight: '700',
    marginTop: 1,
  },
  pointsToggleBtn: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#CBD5E1',
    padding: 2,
    justifyContent: 'center',
  },
  pointsToggleBtnActive: {
    backgroundColor: BrandColors.goldDark,
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  pointsExplanation: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.15)',
  },
  pointsExplanationText: {
    fontSize: 12,
    color: BrandColors.navyDeep,
    lineHeight: 16,
  },
  pointsAppliedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  pointsAppliedText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.emeraldSuccess,
    marginLeft: 4,
  },
  paymentMethodsList: {
    gap: 8,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    backgroundColor: '#F8FAFC',
  },
  paymentOptionActive: {
    borderColor: BrandColors.primaryBlue,
    backgroundColor: '#F0F7FF',
  },
  radioIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BrandColors.primaryBlue,
  },
  paymentIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.06)',
  },
  paymentTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navyDeep,
  },
  paymentSub: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 1,
  },
  preferredTag: {
    backgroundColor: 'rgba(10, 27, 64, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  preferredTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  breakdownHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 12,
    color: BrandColors.grayMuted,
  },
  breakdownValueMuted: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    textDecorationLine: 'line-through',
  },
  breakdownLabelHighlight: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.emeraldSuccess,
  },
  breakdownValueDiscount: {
    fontSize: 12,
    fontWeight: '800',
    color: BrandColors.emeraldSuccess,
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.navyDeep,
  },
  breakdownLabelPoints: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.goldDark,
  },
  breakdownValuePoints: {
    fontSize: 12,
    fontWeight: '800',
    color: BrandColors.goldDark,
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: 'rgba(10, 27, 64, 0.08)',
    marginVertical: 10,
  },
  breakdownTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownTotalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.5,
  },
  breakdownTotalSub: {
    fontSize: 10,
    color: BrandColors.grayMuted,
    marginTop: 1,
  },
  breakdownTotalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  pointsEarnedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  pointsEarnedText: {
    fontSize: 11,
    color: BrandColors.navyDeep,
    marginLeft: 6,
  },
  trustBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  trustBadgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginLeft: 4,
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
    paddingHorizontal: 16,
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
  bottomTotalLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: BrandColors.grayMuted,
    letterSpacing: 0.6,
  },
  bottomTotalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    marginTop: 1,
  },
  payBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    minWidth: 175,
  },
  payBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  payBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
