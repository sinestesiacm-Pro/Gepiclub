import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { BrandColors } from '@/constants/Colors';
import { getServiceById, SERVICES_CATALOG } from '@/data/servicesData';

export default function CheckoutSuccessScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    orderCode,
    serviceId,
    optionId,
    finalAmount,
    pointsUsed,
    pointsEarned,
    guestName,
  } = useLocalSearchParams<{
    orderCode: string;
    serviceId: string;
    optionId?: string;
    finalAmount?: string;
    pointsUsed?: string;
    pointsEarned?: string;
    guestName?: string;
  }>();

  const service = getServiceById(serviceId as string) || SERVICES_CATALOG[0];
  const selectedOption =
    service.options.find((o) => o.id === optionId) || service.options[0];

  const [walletAdded, setWalletAdded] = useState(false);

  const formattedDate = new Date().toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleAddToWallet = () => {
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setWalletAdded(true);
  };

  const handleShareVoucher = async () => {
    try {
      await Share.share({
        message: `Pass VIP Gepiclub per ${service.title}\nCodice Prenotazione: ${orderCode}\nTitolare: ${guestName || 'Socio VIP'}\nImporto VIP: ${service.currencySymbol}${finalAmount}\nAssistenza Concierge H24 attiva.`,
      });
    } catch {
      // Ignored
    }
  };

  const handleOpenWhatsAppConcierge = () => {
    if (Platform.OS === 'ios') {
      Haptics.selectionAsync();
    }
    const message = `Salve Concierge Gepiclub, ho appena completato la prenotazione VIP!\n\nCodice Voucher: ${orderCode}\nServizio: ${service.title} (${selectedOption?.label})\nTitolare: ${guestName || 'Socio VIP'}\nImporto: ${service.currencySymbol}${finalAmount}\n\nPotete verificare e confermare tutti i dettagli con il partner? Grazie!`;
    Linking.openURL(
      `https://wa.me/51999999999?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 44) + 12,
            paddingBottom: insets.bottom + 40,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* Celebration Header */}
        <View style={styles.celebrationHeader}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark" size={32} color="#FFFFFF" />
          </View>

          <Text style={styles.celebrationTitle}>Prenotazione Confermata!</Text>
          <Text style={styles.celebrationSub}>
            Il tuo voucher digitale Gepiclub è attivo e garantito al 100%.
          </Text>
        </View>

        {/* Digital Luxury Pass / Boarding Voucher */}
        <View style={styles.voucherContainer}>
          {/* Top Pass Bar */}
          <LinearGradient
            colors={[BrandColors.navyDeep, '#132856']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.voucherHeader}>
            <View>
              <Text style={styles.voucherBrandText}>GEPICLUB PASS VIP</Text>
              <Text style={styles.voucherCodeText}>{orderCode || 'GP-2026-94821'}</Text>
            </View>

            <View style={styles.confirmedPill}>
              <View style={styles.confirmedDot} />
              <Text style={styles.confirmedPillText}>EMESSO</Text>
            </View>
          </LinearGradient>

          {/* Pass Body */}
          <View style={styles.voucherBody}>
            {/* Service Item Row */}
            <View style={styles.servicePassRow}>
              <Image source={service.image} style={styles.passThumbnail} resizeMode="cover" />
              <View style={styles.passMetaCol}>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryPillText}>{service.categoryLabel.toUpperCase()}</Text>
                </View>
                <Text style={styles.passServiceTitle} numberOfLines={2}>
                  {service.title}
                </Text>
                <Text style={styles.passPartnerName}>{service.partnerName}</Text>
              </View>
            </View>

            {/* Selected Option Banner */}
            <View style={styles.passOptionBox}>
              <Ionicons name="sparkles" size={13} color={BrandColors.goldDark} />
              <Text style={styles.passOptionText}>
                Configurazione: <Text style={{ fontWeight: '800' }}>{selectedOption?.label}</Text>
              </Text>
            </View>

            {/* Grid Information */}
            <View style={styles.passGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>TITOLARE</Text>
                <Text style={styles.gridValue}>{guestName || 'Luca Rossi'}</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>DATA EMISSIONE</Text>
                <Text style={styles.gridValue}>{formattedDate}</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>IMPORTO VIP SALDATO</Text>
                <Text style={styles.gridValueHighlight}>
                  {service.currencySymbol}
                  {finalAmount || service.vipPrice}
                </Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>STATUS CONCILIERGE</Text>
                <Text style={styles.gridValueStatus}>Attivo H24</Text>
              </View>
            </View>

            {/* Perforation Line with Side Notches */}
            <View style={styles.perforationWrap}>
              <View style={styles.notchLeft} />
              <View style={styles.perforationDashes} />
              <View style={styles.notchRight} />
            </View>

            {/* QR Code Presentation */}
            <View style={styles.qrSection}>
              <View style={styles.qrCodeBox}>
                {/* Simulated luxury high-res vector QR */}
                <View style={styles.qrMatrixRow}>
                  <View style={styles.qrCornerBlock} />
                  <View style={styles.qrInnerLines} />
                  <View style={styles.qrCornerBlock} />
                </View>
                <View style={styles.qrCenterSymbol}>
                  <Ionicons name="airplane" size={16} color={BrandColors.primaryBlue} />
                </View>
                <View style={styles.qrMatrixRow}>
                  <View style={styles.qrCornerBlock} />
                  <View style={styles.qrInnerLines} />
                  <View style={[styles.qrCornerBlock, { backgroundColor: BrandColors.goldVip }]} />
                </View>
              </View>

              <Text style={styles.qrInstruction}>
                Presenta questo codice digitale al check-in presso la struttura o al personale
                convenzionato.
              </Text>
            </View>
          </View>
        </View>

        {/* Loyalty Points Credited Card */}
        <View style={styles.pointsCreditedCard}>
          <View style={styles.pointsIconBox}>
            <Ionicons name="sparkles" size={18} color={BrandColors.goldDark} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.pointsCreditedTitle}>
              +{pointsEarned || service.pointsEarned} Punti Gepiclub Accreditati
            </Text>
            <Text style={styles.pointsCreditedSub}>
              I punti sono già disponibili sul tuo saldo tessera VIP.
            </Text>
          </View>
        </View>

        {/* Primary Action Buttons */}
        <View style={styles.actionButtonsCol}>
          {/* Add to Apple Wallet */}
          <TouchableOpacity
            style={[
              styles.walletBtn,
              walletAdded && styles.walletBtnAdded,
            ]}
            onPress={handleAddToWallet}
            activeOpacity={0.85}>
            <Ionicons
              name={walletAdded ? 'checkmark-circle' : 'wallet-outline'}
              size={18}
              color={walletAdded ? '#FFFFFF' : '#FFFFFF'}
            />
            <Text style={styles.walletBtnText}>
              {walletAdded ? 'Aggiunto ad Apple Wallet' : 'Aggiungi ad Apple Wallet'}
            </Text>
          </TouchableOpacity>

          {/* WhatsApp Concierge */}
          <TouchableOpacity
            style={styles.whatsAppBtn}
            onPress={handleOpenWhatsAppConcierge}
            activeOpacity={0.85}>
            <LinearGradient
              colors={['#25D366', '#128C7E']}
              style={styles.whatsAppGradient}>
              <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" />
              <Text style={styles.whatsAppBtnText}>Invia Voucher al Concierge WhatsApp</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Share or Save PDF */}
          <TouchableOpacity
            style={styles.secondaryActionBtn}
            onPress={handleShareVoucher}
            activeOpacity={0.8}>
            <Ionicons name="share-outline" size={17} color={BrandColors.navyDeep} />
            <Text style={styles.secondaryActionText}>Condividi o Salva Pass VIP</Text>
          </TouchableOpacity>

          {/* Return to Home / Catalog */}
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.8}>
            <Text style={styles.homeBtnText}>Torna alla Home del Club</Text>
          </TouchableOpacity>
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
  },
  celebrationHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BrandColors.emeraldSuccess,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BrandColors.emeraldSuccess,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 12,
  },
  celebrationTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.2,
  },
  celebrationSub: {
    fontSize: 13,
    color: BrandColors.grayMuted,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 290,
    lineHeight: 18,
  },
  voucherContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 16,
  },
  voucherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  voucherBrandText: {
    color: BrandColors.goldVip,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  voucherCodeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  confirmedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.4)',
  },
  confirmedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
    marginRight: 5,
  },
  confirmedPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  voucherBody: {
    padding: 16,
  },
  servicePassRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  passMetaCol: {
    flex: 1,
    marginLeft: 12,
  },
  categoryPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  categoryPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.4,
  },
  passServiceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    lineHeight: 19,
  },
  passPartnerName: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    fontWeight: '500',
    marginTop: 2,
  },
  passOptionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  passOptionText: {
    fontSize: 12,
    color: BrandColors.navyDeep,
    marginLeft: 6,
  },
  passGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 12,
  },
  gridItem: {
    width: '47%',
  },
  gridLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: BrandColors.grayMuted,
    letterSpacing: 0.5,
  },
  gridValue: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navyDeep,
    marginTop: 2,
  },
  gridValueHighlight: {
    fontSize: 15,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    marginTop: 1,
  },
  gridValueStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.emeraldSuccess,
    marginTop: 2,
  },
  perforationWrap: {
    position: 'relative',
    height: 30,
    justifyContent: 'center',
    marginHorizontal: -16,
    marginVertical: 6,
  },
  notchLeft: {
    position: 'absolute',
    left: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BrandColors.lightBg,
  },
  notchRight: {
    position: 'absolute',
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BrandColors.lightBg,
  },
  perforationDashes: {
    borderBottomWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginHorizontal: 18,
  },
  qrSection: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  qrCodeBox: {
    width: 140,
    height: 140,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.1)',
    padding: 10,
    justifyContent: 'space-between',
    position: 'relative',
  },
  qrMatrixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 32,
  },
  qrCornerBlock: {
    width: 32,
    height: 32,
    backgroundColor: BrandColors.navyDeep,
    borderRadius: 6,
  },
  qrInnerLines: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(10, 27, 64, 0.2)',
    marginHorizontal: 6,
    borderRadius: 3,
  },
  qrCenterSymbol: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrInstruction: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 260,
    lineHeight: 15,
  },
  pointsCreditedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF7',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  pointsIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsCreditedTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  pointsCreditedSub: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 1,
  },
  actionButtonsCol: {
    gap: 10,
  },
  walletBtn: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  walletBtnAdded: {
    backgroundColor: BrandColors.emeraldSuccess,
  },
  walletBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  whatsAppBtn: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  whatsAppGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  whatsAppBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  secondaryActionBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.1)',
  },
  secondaryActionText: {
    color: BrandColors.navyDeep,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 8,
  },
  homeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  homeBtnText: {
    color: BrandColors.primaryBlue,
    fontSize: 13,
    fontWeight: '700',
  },
});
