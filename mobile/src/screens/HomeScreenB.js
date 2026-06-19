import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function HomeScreenB({ navigation }) {
  const openSOS = (type) => {
    navigation.navigate("SOS", { type });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Emergency Assistance
          </Text>

          <Text style={styles.subtitle}>
            Fast, reliable support when every second matters.
          </Text>
        </View>

        {/* SOS BUTTON */}
        <View style={styles.sosContainer}>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={() => openSOS("General")}
          >
            <Text style={styles.sosText}>
              SOS
            </Text>
          </TouchableOpacity>

          <Text style={styles.sosLabel}>
            Tap for Immediate Emergency Help
          </Text>
        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => openSOS("Medical")}
          >
            <Text style={styles.icon}>🚑</Text>

            <Text style={styles.cardTitle}>
              Medical
            </Text>

            <Text style={styles.cardDesc}>
              Request medical assistance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => openSOS("Fire")}
          >
            <Text style={styles.icon}>🔥</Text>

            <Text style={styles.cardTitle}>
              Fire
            </Text>

            <Text style={styles.cardDesc}>
              Report fire emergency
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => openSOS("Crime")}
          >
            <Text style={styles.icon}>🚔</Text>

            <Text style={styles.cardTitle}>
              Crime
            </Text>

            <Text style={styles.cardDesc}>
              Contact law enforcement
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => openSOS("Accident")}
          >
            <Text style={styles.icon}>🚗</Text>

            <Text style={styles.cardTitle}>
              Accident
            </Text>

            <Text style={styles.cardDesc}>
              Report road accident
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: "#64748B",
  },

  sosContainer: {
    alignItems: "center",
    marginVertical: 30,
  },

  sosButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#D62828",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#D62828",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 10,
  },

  sosText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "bold",
  },

  sosLabel: {
    marginTop: 12,
    fontSize: 16,
    color: "#475569",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 4,
  },

  icon: {
    fontSize: 32,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  cardDesc: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 5,
  },
});