import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { COLORS, FONTS, SIZES } from "../utils/theme";

// Extra Components
import StatusCard from "./StatusCard";
import Timeline from "./Timeline";
import AvailabilityBadge from "./AvailabilityBadge";
import HospitalCard from "./HospitalCard";
import ContactCard from "./ContactCard";
import NotificationCard from "./NotificationCard";

export {
  StatusCard,
  Timeline,
 AvailabilityBadge,
  HospitalCard,
  ContactCard,
  NotificationCard,
};

// ================================
// PRIMARY BUTTON
// ================================

export const PrimaryButton = ({
  title,
  onPress,
  loading,
  disabled,
  style,
  color,
}) => (
  <TouchableOpacity
    activeOpacity={0.85}
    disabled={loading || disabled}
    onPress={onPress}
    style={[
      styles.button,
      {
        backgroundColor:
          color || COLORS.primary,
      },
      loading && styles.disabled,
      disabled && styles.disabled,
      style,
    ]}
  >
    {loading ? (
      <ActivityIndicator
        color="#fff"
      />
    ) : (
      <Text style={styles.buttonText}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

// ================================
// ERROR
// ================================

export const ErrorMessage = ({
  message,
}) => {
  if (!message) return null;

  return (
    <View style={styles.error}>
      <Text style={styles.errorText}>
        ⚠ {message}
      </Text>
    </View>
  );
};

// ================================
// SUCCESS
// ================================

export const SuccessMessage = ({
  message,
}) => {
  if (!message) return null;

  return (
    <View style={styles.success}>
      <Text style={styles.successText}>
        ✓ {message}
      </Text>
    </View>
  );
};

// ================================
// LOADING
// ================================

export const LoadingSpinner = ({
  message = "Loading...",
}) => (
  <View style={styles.loading}>
    <ActivityIndicator
      size="large"
      color={COLORS.primary}
    />

    <Text style={styles.loadingText}>
      {message}
    </Text>
  </View>
);

// ================================
// EMPTY STATE
// ================================

export const EmptyState = ({
  icon = "📭",
  title,
  subtitle,
}) => (
  <View style={styles.empty}>
    <Text style={styles.emptyIcon}>
      {icon}
    </Text>

    <Text style={styles.emptyTitle}>
      {title}
    </Text>

    {!!subtitle && (
      <Text style={styles.emptySubtitle}>
        {subtitle}
      </Text>
    )}
  </View>
);

// ================================
// STATUS BADGE
// ================================

export const StatusBadge = ({
  status,
}) => {
  const badgeColors = {
    Pending: "#F59E0B",
    Accepted: "#2563EB",
    "On The Way": "#7C3AED",
    Arrived: "#16A34A",
    Cancelled: "#DC2626",
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            badgeColors[status] ||
            "#64748B",
        },
      ]}
    >
      <Text style={styles.badgeText}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  disabled: {
    opacity: 0.6,
  },

  error: {
    backgroundColor: "#FEE2E2",
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
  },

  errorText: {
    color: "#B91C1C",
    fontWeight: "600",
  },

  success: {
    backgroundColor: "#DCFCE7",
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
  },

  successText: {
    color: "#166534",
    fontWeight: "600",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    color: COLORS.textSecondary,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  emptyIcon: {
    fontSize: 55,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    color: COLORS.text,
  },

  emptySubtitle: {
    textAlign: "center",
    marginTop: 8,
    color: COLORS.textSecondary,
  },

  badge: {
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
  },
});