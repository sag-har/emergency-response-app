/**
 * LoginScreen.js
 * Phase 1 · Week 2 · Track B
 * On success: store JWT via AsyncStorage, navigate to Home
 * Handles JWT expiry error code from backend
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import { validatePhone, validatePassword } from '../utils/validators';
import { PrimaryButton, ErrorMessage } from '../components';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();

  const [form, setForm] = useState({ phoneNumber: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
    setApiError('');
  };

  const handleBlur = (field) => {
    const validators = { phoneNumber: validatePhone, password: validatePassword };
    const err = validators[field]?.(form[field]);
    if (err) setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validate = () => {
    const newErrors = {
      phoneNumber: validatePhone(form.phoneNumber),
      password: validatePassword(form.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      const data = await loginUser(form);
      if (data.success) {
        await signIn(data.token, data.user);
        // AuthNavigator auto-navigates to Home when token is set
      } else {
        setApiError(data.message || 'Login failed. Please try again.');
      }
    } catch {
      setApiError('Cannot connect to server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Text style={styles.logo}>🚑</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to Emergency Response</Text>
        </View>

        <ErrorMessage message={apiError} />

        {/* Phone */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors.phoneNumber && styles.inputError]}
            placeholder="03001234567"
            placeholderTextColor={COLORS.textLight}
            value={form.phoneNumber}
            onChangeText={(v) => handleChange('phoneNumber', v)}
            onBlur={() => handleBlur('phoneNumber')}
            keyboardType="phone-pad"
            maxLength={13}
            returnKeyType="next"
          />
          {errors.phoneNumber ? (
            <Text style={styles.fieldError}>{errors.phoneNumber}</Text>
          ) : null}
        </View>

        {/* Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.textLight}
              value={form.password}
              onChangeText={(v) => handleChange('password', v)}
              onBlur={() => handleBlur('password')}
              secureTextEntry={!showPassword}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword((p) => !p)}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
          {errors.password ? (
            <Text style={styles.fieldError}>{errors.password}</Text>
          ) : null}
        </View>

        {/* Submit */}
        <PrimaryButton
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          style={styles.submitBtn}
        />

        {/* Register Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>Create one</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 40, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 36, marginTop: 48 },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#FDE8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: { fontSize: 40 },
  title: { fontSize: SIZES.xxl, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  subtitle: { fontSize: SIZES.sm, color: COLORS.textSecondary },
  fieldGroup: { marginBottom: 18 },
  label: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.text, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: SIZES.md,
    color: COLORS.text,
    ...SHADOWS.card,
  },
  inputError: { borderColor: COLORS.danger },
  passwordRow: { position: 'relative' },
  passwordInput: { paddingRight: 50 },
  eyeBtn: { position: 'absolute', right: 14, top: 13 },
  eyeIcon: { fontSize: 18 },
  fieldError: { color: COLORS.danger, fontSize: SIZES.xs, marginTop: 4, marginLeft: 2 },
  submitBtn: { marginTop: 8, marginBottom: 24 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { color: COLORS.textSecondary, fontSize: SIZES.sm },
  footerLink: { color: COLORS.primary, fontSize: SIZES.sm, fontWeight: '700' },
});

export default LoginScreen;