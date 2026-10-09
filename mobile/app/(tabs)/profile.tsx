import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { BrandColors } from '@/constants/Colors';
import { HeaderBrand } from '@/components/HeaderBrand';

const MENU_SECTIONS = [
  {
    title: 'VIAGGIO & PREFERENZE',
    items: [
      {
        icon: 'airplane-outline' as const,
        title: 'Preferenze di Volo',
        subtitle: 'Posto finestrino • Menu Gourmet • Lounge',
      },
      {
        icon: 'document-text-outline' as const,
        title: 'Documenti & Passaporti',
        subtitle: 'Passaporto UE registrato • Scadenza 2031',
      },
      {
        icon: 'card-outline' as const,
        title: 'Metodi di Pagamento VIP',
        subtitle: 'Carta Black Elite • Apple Pay',
      },
    ],
  },
  {
    title: 'IMPOSTAZIONI APP',
    items: [
      {
        icon: 'cash-outline' as const,
        title: 'Valuta di Riferimento',
        subtitle: 'EUR (€) • Euro',
      },
      {
        icon: 'notifications-outline' as const,
        title: 'Notifiche Offerte Private',
        subtitle: 'Avvisi prioritari per tariffe errore e sconti club',
      },
      {
        icon: 'shield-checkmark-outline' as const,
        title: 'Sicurezza & Privacy',
        subtitle: 'Biometria Face ID attiva',
      },
    ],
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert('Sessione VIP', 'Sei sicuro di voler effettuare il logout?', [
      { text: 'Annulla', style: 'cancel' },
      { text: 'Esci', style: 'destructive' },
    ]);
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

        {/* Profile User Card (Pure White Clean Luxury) */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#D4AF37', '#AA820A']}
              style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <Text style={styles.avatarInitial}>L</Text>
              </View>
            </LinearGradient>
            <View style={styles.badgeVerified}>
              <Ionicons name="checkmark" size={10} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.profileName}>Luca</Text>
          <Text style={styles.profileEmail}>luca@gepiclub.travel</Text>

          <View style={styles.vipTagPill}>
            <Ionicons name="star" size={12} color={BrandColors.goldVip} />
            <Text style={styles.vipTagText}>Membro Black Elite • Socio Fondatore</Text>
          </View>
        </View>

        {/* Travel Stats Summary */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Viaggi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Continenti</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: BrandColors.goldVip }]}>42.5k</Text>
            <Text style={styles.statLabel}>Punti Club</Text>
          </View>
        </View>

        {/* Active Trip Card */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prossimo Viaggio Confermato</Text>
        </View>

        <View style={styles.tripCard}>
          <View style={styles.tripCardHeader}>
            <View style={styles.tripClassBadge}>
              <Text style={styles.tripClassText}>BUSINESS CLASS</Text>
            </View>
            <Text style={styles.tripDate}>18 Nov 2026</Text>
          </View>

          <View style={styles.tripRouteRow}>
            <View>
              <Text style={styles.tripCode}>VCE</Text>
              <Text style={styles.tripCity}>Venezia</Text>
            </View>

            <View style={styles.tripFlightLine}>
              <Ionicons name="airplane" size={16} color={BrandColors.primaryBlue} />
              <View style={styles.dashLine} />
              <Text style={styles.tripAirline}>Iberia • IB6800</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.tripCode}>LIM</Text>
              <Text style={styles.tripCity}>Lima</Text>
            </View>
          </View>

          <View style={styles.tripCardFooter}>
            <Text style={styles.tripSeatText}>Posto 2A • Finestrino • Menu Gourmet</Text>
            <TouchableOpacity style={styles.boardingPassBtn} activeOpacity={0.8}>
              <Text style={styles.boardingPassText}>Dettagli</Text>
              <Ionicons name="chevron-forward" size={12} color={BrandColors.primaryBlue} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Sections */}
        {MENU_SECTIONS.map((section, sIdx) => (
          <View key={sIdx} style={styles.menuSection}>
            <Text style={styles.menuSectionHeader}>{section.title}</Text>

            <View style={styles.menuCard}>
              {section.items.map((item, iIdx) => (
                <TouchableOpacity
                  key={iIdx}
                  style={[
                    styles.menuRow,
                    iIdx !== section.items.length - 1 && styles.menuRowBorder,
                  ]}
                  activeOpacity={0.7}>
                  <View style={styles.menuIconBox}>
                    <Ionicons name={item.icon} size={18} color={BrandColors.primaryBlue} />
                  </View>
                  <View style={styles.menuTextBox}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSub}>{item.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={BrandColors.grayMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color={BrandColors.primaryPink} />
          <Text style={styles.logoutText}>Esci dall'Account</Text>
        </TouchableOpacity>

        {/* Footer info */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>Gepiclub Travel Mobile • v1.0.0 (Build 2026)</Text>
          <Text style={styles.footerText}>Protetto da crittografia end-to-end 256-bit</Text>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
    backgroundColor: BrandColors.navyDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  badgeVerified: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: BrandColors.primaryBlue,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  profileEmail: {
    fontSize: 12,
    color: BrandColors.grayMuted,
    marginTop: 2,
  },
  vipTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  vipTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.goldVip,
    marginLeft: 6,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 18,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  statLabel: {
    fontSize: 10,
    color: BrandColors.grayMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(10, 27, 64, 0.08)',
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.2,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  tripCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripClassBadge: {
    backgroundColor: 'rgba(0, 115, 230, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tripClassText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
  },
  tripDate: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    fontWeight: '600',
  },
  tripRouteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tripCode: {
    fontSize: 24,
    fontWeight: '800',
    color: BrandColors.navyDeep,
  },
  tripCity: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 2,
  },
  tripFlightLine: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dashLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(10, 27, 64, 0.12)',
    marginVertical: 4,
  },
  tripAirline: {
    fontSize: 10,
    color: BrandColors.grayMuted,
    fontWeight: '500',
  },
  tripCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(10, 27, 64, 0.05)',
    paddingTop: 10,
  },
  tripSeatText: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    fontWeight: '500',
  },
  boardingPassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardingPassText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.primaryBlue,
    marginRight: 2,
  },
  menuSection: {
    marginBottom: 16,
  },
  menuSectionHeader: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.grayMuted,
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    overflow: 'hidden',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 27, 64, 0.05)',
  },
  menuIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 115, 230, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextBox: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.navyDeep,
  },
  menuSub: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 51, 102, 0.06)',
    marginTop: 8,
    marginBottom: 16,
  },
  logoutText: {
    color: BrandColors.primaryPink,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  footerNote: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 10,
    color: BrandColors.grayMuted,
    lineHeight: 14,
  },
});
