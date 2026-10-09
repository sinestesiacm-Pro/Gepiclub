import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { BrandColors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { signIn, signUp, isConfigured } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Campi obbligatori', 'Inserisci sia la tua email che la password.');
      return;
    }

    if (isSignUp && !fullName) {
      Alert.alert('Campi obbligatori', 'Inserisci il tuo nome e cognome per la registrazione.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          Alert.alert('Errore registrazione', error.message);
        } else {
          Alert.alert(
            'Benvenuto nel Club!',
            'Il tuo account socio è stato creato con successo.',
            [{ text: 'OK', onPress: () => router.back() }]
          );
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          Alert.alert('Errore di accesso', error.message);
        } else {
          router.back();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestContinue = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 44) + 16,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* Top Close / Guest Button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={handleGuestContinue}
            activeOpacity={0.7}>
            <Ionicons name="close" size={22} color={BrandColors.navyDeep} />
          </TouchableOpacity>
        </View>

        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <Image
            source={require('@/assets/images/isotipo.jpg')}
            style={styles.isotype}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>
            GEPI<Text style={{ color: BrandColors.skyBlue }}>club</Text>
          </Text>
          <Text style={styles.brandSubtitle}>TRAVEL & EXPERIENCES</Text>
          <View style={styles.vipTagPill}>
            <Ionicons name="shield-checkmark" size={12} color={BrandColors.goldVip} />
            <Text style={styles.vipTagText}>Accesso Riservato Soci</Text>
          </View>
        </View>

        {/* Auth Card */}
        <View style={styles.authCard}>
          {/* Tabs: Accedi vs Diventa Socio */}
          <View style={styles.tabToggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, !isSignUp && styles.toggleBtnActive]}
              onPress={() => setIsSignUp(false)}>
              <Text style={[styles.toggleBtnText, !isSignUp && styles.toggleBtnTextActive]}>
                Accedi al Club
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, isSignUp && styles.toggleBtnActive]}
              onPress={() => setIsSignUp(true)}>
              <Text style={[styles.toggleBtnText, isSignUp && styles.toggleBtnTextActive]}>
                Diventa Socio
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NOME E COGNOME</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={18} color={BrandColors.grayMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="Es. Luca Rossi"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL DEL SOCIO</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color={BrandColors.grayMuted} />
              <TextInput
                style={styles.input}
                placeholder="nome@gepiclub.travel"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={BrandColors.grayMuted} />
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={BrandColors.grayMuted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit CTA */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.88}>
            <LinearGradient
              colors={[BrandColors.primaryBlue, BrandColors.navyDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitGradient}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Ionicons
                    name={isSignUp ? 'sparkles' : 'key-outline'}
                    size={17}
                    color="#FFFFFF"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.submitText}>
                    {isSignUp ? 'Registrati come Socio VIP' : 'Accedi al Club VIP'}
                  </Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Guest Continue */}
          <TouchableOpacity
            style={styles.guestBtn}
            onPress={handleGuestContinue}
            activeOpacity={0.75}>
            <Text style={styles.guestText}>Continua come Ospite</Text>
          </TouchableOpacity>
        </View>

        {/* Connection Status indicator */}
        <View style={styles.statusFooter}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isConfigured ? BrandColors.emeraldSuccess : BrandColors.goldVip },
            ]}
          />
          <Text style={styles.statusInfoText}>
            {isConfigured
              ? 'Connesso a Supabase Cloud (Live)'
              : 'Modalità Demo VIP (Configura .env per il live)'}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.lightBg,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  isotype: {
    width: 54,
    height: 54,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: BrandColors.navyDeep,
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.grayMuted,
    letterSpacing: 1.2,
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
  authCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  tabToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0A1B40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.grayMuted,
  },
  toggleBtnTextActive: {
    color: BrandColors.navyDeep,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.grayMuted,
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(10, 27, 64, 0.08)',
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: BrandColors.navyDeep,
    fontWeight: '500',
  },
  eyeBtn: {
    padding: 4,
  },
  submitBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 10,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  guestBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 6,
  },
  guestText: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.grayMuted,
  },
  statusFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusInfoText: {
    fontSize: 11,
    color: BrandColors.grayMuted,
    fontWeight: '500',
  },
});
