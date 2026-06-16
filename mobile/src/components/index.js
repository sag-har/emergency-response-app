import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/theme';

// ─── Primary Button ───────────────────────────────────────────────────────────
export const PrimaryButton = ({ title, onPress, loading, disabled, style, color }) => (
  <TouchableOpacity
    style={[
      styles.btn,
      { backgroundColor: color || COLORS.primary },
      (disabled || loading) && styles.btnDisabled,
      style,
    ]}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.8}
  >
    {loading ? (
      <ActivityIndicator color="#fff" size="small" />
    ) : (
      <Text style={styles.btnText}>{title}</Text>
    )}
  </TouchableOpacity>
);

// ─── Error Message ────────────────────────────────────────────────────────────
export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.errorBox}>
      <Text style={styles.errorText}>⚠ {message}</Text>
    </View>
  );
};

// ─── Success Message ──────────────────────────────────────────────────────────
export const SuccessMessage = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.successBox}>
      <Text style={styles.successText}>✓ {message}</Text>
    </View>
  );
};

// ─── Loading Spinner ──────────────────────────────────────────────────────────
export const LoadingSpinner = ({ message = 'Loading...' }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={COLORS.primary} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
export const EmptyState = ({ icon = '📭', title, subtitle, actionLabel, onAction }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>{icon}</Text>
    <Text style={styles.emptyTitle}>{title}</Text>
    {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
    {actionLabel && onAction && (
      <PrimaryButton title={actionLabel} onPress={onAction} style={styles.emptyAction} />
    )}
  </View>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
export const StatusBadge = ({ status }) => {
  const colors = {
    Pending: { bg: '#FFF3CD', text: '#856404' },
    Active: { bg: '#D1ECF1', text: '#0C5460' },
    Resolved: { bg: '#D4EDDA', text: '#155724' },
    Cancelled: { bg: '#F8D7DA', text: '#721C24' },
  };
  const c = colors[status] || colors.Pending;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.badgeText, { color: c.text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: {
    color: '#fff',
    fontSize: SIZES.md,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  errorBox: {
    backgroundColor: '#FDE8E8',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  errorText: {
    color: '#C0392B',
    fontSize: SIZES.sm,
    fontWeight: '500',
  },
  successBox: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  successText: {
    color: '#2E7D32',
    fontSize: SIZES.sm,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.sm,
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 8,
  },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  emptyTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  emptyAction: { marginTop: 20, paddingHorizontal: 32 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
});