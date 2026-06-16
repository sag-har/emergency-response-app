/**
 * RegisterScreen.js
 * Phase 1 · Week 2 · Track B
 * Fields: Full Name, Phone Number, Password (with inline validation)
 * On success: store JWT via AsyncStorage, navigate to Home
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
import { registerUser } from '../services/api';
import { validateFullName, validatePhone, validatePassword } from '../utils/validators';
import { PrimaryButton, ErrorMessage } from '../components';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';

const RegisterScreen = ({ navigation }) => {
  const { signIn } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Update a field and clear its error
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
    setApiError('');
  };

  // Inline validate on blur
  const handleBlur = (field) => {
    const validators = {
      fullName: validateFullName,
      phoneNumber: validatePhone,
      password: validatePassword,
    };
    const err = validators[field]?.(form[field]);
    if (err) setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validate = () => {
    const newErrors = {
      fullName: validateFullName(form.fullName),
      phoneNumber: validatePhone(form.phoneNumber),
      password: validatePassword(form.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      const data = await registerUser(form);
      if (data.success) {
        await signIn(data.token, data.user);
        // Navigation handled by AuthNavigator (auto-redirects when token is set)
      } else {
        setApiError(data.message || 'Registration failed. Please try again.');
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
          <Text style={styles.logo}>🚑</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join the Emergency Response Network
          </Text>
        </View>

        {/* API Error */}
        <ErrorMessage message={apiError} />

        {/* Full Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholder="e.g. Saghar Mehmood"
            placeholderTextColor={COLORS.textLight}
            value={form.fullName}
            onChangeText={(v) => handleChange('fullName', v)}
            onBlur={() => handleBlur('fullName')}
            autoCapitalize="words"
            returnKeyType="next"
          />
          {errors.fullName ? (
            <Text style={styles.fieldError}>{errors.fullName}</Text>
          ) : null}
        </View>

        {/* Phone Number */}
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
              placeholder="Min. 6 characters"
              placeholderTextColor={COLORS.textLight}
              value={form.password}
              onChangeText={(v) => handleChange('password', v)}
              onBlur={() => handleBlur('password')}
              secureTextEntry={!showPassword}
              returnKeyType="done"
              onSubmitEditing={handleRegister}
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
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          style={styles.submitBtn}
        />

        {/* Login Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 32, marginTop: 20 },
  logo: { fontSize: 52, marginBottom: 12 },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  fieldGroup: { marginBottom: 18 },
  label: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
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
  eyeBtn: {
    position: 'absolute',
    right: 14,
    top: 13,
  },
  eyeIcon: { fontSize: 18 },
  fieldError: {
    color: COLORS.danger,
    fontSize: SIZES.xs,
    marginTop: 4,
    marginLeft: 2,
  },
  submitBtn: { marginTop: 8, marginBottom: 20 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: { color: COLORS.textSecondary, fontSize: SIZES.sm },
  footerLink: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    fontWeight: '700',
  },
});

export default RegisterScreen;