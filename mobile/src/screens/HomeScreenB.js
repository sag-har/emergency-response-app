import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { getUser } from "../storage/authStorage";
import hospitalService from "../services/hospitalService";
import emergencyService from "../services/emergencyService";

export default function HomeScreenB({ navigation }) {
  const [user, setUser] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [recentEmergency, setRecentEmergency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const currentUser = await getUser();
      setUser(currentUser);

      try {
        const hospitalResponse =
          await hospitalService.getNearestHospitals(
            33.6844,
            73.0479
          );

        if (hospitalResponse.success) {
          setHospitals(
            hospitalResponse.data.slice(0, 3)
          );
        }
      } catch (err) {
        // Non-fatal — hospital preview list just stays empty.
      }

      try {
        if (currentUser?.id) {
          const history =
            await emergencyService.getEmergencyHistory(
              currentUser.id
            );

          if (
            history.success &&
            history.data.length > 0
          ) {
            setRecentEmergency(history.data[0]);
          }
        }
      } catch (err) {
        // Non-fatal — recent emergency preview just stays empty.
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  const openSOS = (type) => {
    navigation.navigate("SOS", {
      emergencyType: type,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#D62828"
        />

        <Text style={styles.loadingText}>
          Loading Dashboard...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>
              Welcome,
            </Text>

            <Text style={styles.name}>
              {user?.name || "User"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() =>
              navigation.navigate("Profile")
            }
          >
            <Ionicons
              name="person"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* SOS */}

        <View style={styles.sosContainer}>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={() =>
              openSOS("General")
            }
          >
            <Text style={styles.sosText}>
              SOS
            </Text>
          </TouchableOpacity>

          <Text style={styles.sosSubtitle}>
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
            onPress={() =>
              openSOS("Medical")
            }
          >
            <Text style={styles.icon}>
              🚑
            </Text>

            <Text style={styles.cardTitle}>
              Medical
            </Text>

            <Text style={styles.cardDesc}>
              Medical Emergency
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              openSOS("Fire")
            }
          >
            <Text style={styles.icon}>
              🔥
            </Text>

            <Text style={styles.cardTitle}>
              Fire
            </Text>

            <Text style={styles.cardDesc}>
              Fire Emergency
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              openSOS("Crime")
            }
          >
            <Text style={styles.icon}>
              🚔
            </Text>

            <Text style={styles.cardTitle}>
              Crime
            </Text>

            <Text style={styles.cardDesc}>
              Contact Police
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              openSOS("Accident")
            }
          >
            <Text style={styles.icon}>
              🚗
            </Text>

            <Text style={styles.cardTitle}>
              Accident
            </Text>

            <Text style={styles.cardDesc}>
              Road Accident
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECONDARY ACTIONS */}

        <Text style={styles.sectionTitle}>
          Services
        </Text>

        <TouchableOpacity
          style={styles.serviceCard}
          onPress={() =>
            navigation.navigate(
              "HospitalSelection"
            )
          }
        >
          <Ionicons
            name="medkit"
            size={28}
            color="#D62828"
          />

          <View style={styles.serviceText}>
            <Text style={styles.serviceTitle}>
              Nearby Hospitals
            </Text>

            <Text style={styles.serviceSubtitle}>
              Find the nearest hospitals
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#94A3B8"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceCard}
          onPress={() =>
            navigation.navigate(
              "EmergencyContacts"
            )
          }
        >
          <Ionicons
            name="people"
            size={28}
            color="#2563EB"
          />

          <View style={styles.serviceText}>
            <Text style={styles.serviceTitle}>
              Emergency Contacts
            </Text>

            <Text style={styles.serviceSubtitle}>
              Manage trusted contacts
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#94A3B8"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceCard}
          onPress={() =>
            navigation.navigate(
              "NotificationHistory"
            )
          }
        >
          <Ionicons
            name="notifications"
            size={28}
            color="#F59E0B"
          />

          <View style={styles.serviceText}>
            <Text style={styles.serviceTitle}>
              Notifications
            </Text>

            <Text style={styles.serviceSubtitle}>
              View notification history
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#94A3B8"
          />
        </TouchableOpacity>
                {/* RECENT EMERGENCY */}

        <Text style={styles.sectionTitle}>
          Recent Emergency
        </Text>

        {recentEmergency ? (
          <View style={styles.historyCard}>
            <View style={styles.historyTop}>
              <Text style={styles.historyType}>
                {recentEmergency.emergency_type}
              </Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {recentEmergency.status}
                </Text>
              </View>
            </View>

            <Text style={styles.historyDate}>
              {new Date(
                recentEmergency.created_at
              ).toLocaleString()}
            </Text>

            <TouchableOpacity
              style={styles.trackButton}
              onPress={() =>
                navigation.navigate("Tracking", {
                  requestId: recentEmergency.id,
                })
              }
            >
              <Text style={styles.trackButtonText}>
                Track Request
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons
              name="time-outline"
              size={45}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No Recent Emergencies
            </Text>

            <Text style={styles.emptySubtitle}>
              Your latest emergency request will
              appear here.
            </Text>
          </View>
        )}

        {/* HOSPITAL PREVIEW */}

        <Text style={styles.sectionTitle}>
          Nearby Hospitals
        </Text>

        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <TouchableOpacity
              key={hospital.id}
              style={styles.hospitalCard}
              onPress={() =>
                navigation.navigate(
                  "HospitalDetail",
                  {
                    hospital,
                  }
                )
              }
            >
              <Ionicons
                name="medkit"
                size={26}
                color="#DC2626"
              />

              <View
                style={styles.hospitalInfo}
              >
                <Text
                  style={
                    styles.hospitalName
                  }
                >
                  {hospital.name}
                </Text>

                <Text
                  style={
                    styles.hospitalDistance
                  }
                >
                  {hospital.distance_km
                    ? Number(
                        hospital.distance_km
                      ).toFixed(1)
                    : hospital.distance}
                  km away
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#94A3B8"
              />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptySubtitle}>
              No hospitals available.
            </Text>
          </View>
        )}

        {/* SAFETY TIPS */}

        <Text style={styles.sectionTitle}>
          Emergency Tips
        </Text>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>
            📍 Keep Location Enabled
          </Text>

          <Text style={styles.tipText}>
            Your location helps responders reach
            you much faster.
          </Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>
            ☎️ Stay Reachable
          </Text>

          <Text style={styles.tipText}>
            Keep your phone nearby after sending
            an SOS request.
          </Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>
            🚑 Remain Calm
          </Text>

          <Text style={styles.tipText}>
            Stay in a safe place until emergency
            responders arrive.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Emergency Response System
          </Text>

          <Text style={styles.footerSubtitle}>
            Your safety is our priority.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F8FAFC",
  },

  loadingContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F8FAFC",
  },

  loadingText:{
    marginTop:15,
    fontSize:16,
    color:"#475569",
  },

  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:20,
  },

  welcome:{
    color:"#64748B",
    fontSize:15,
  },

  name:{
    fontSize:28,
    fontWeight:"bold",
    color:"#0F172A",
  },

  profileButton:{
    width:55,
    height:55,
    borderRadius:30,
    backgroundColor:"#D62828",
    justifyContent:"center",
    alignItems:"center",
  },

  sosContainer:{
    alignItems:"center",
    marginVertical:25,
  },

  sosButton:{
    width:170,
    height:170,
    borderRadius:85,
    backgroundColor:"#D62828",
    justifyContent:"center",
    alignItems:"center",
    elevation:10,
  },

  sosText:{
    color:"#FFFFFF",
    fontSize:42,
    fontWeight:"bold",
  },

  sosSubtitle:{
    marginTop:15,
    color:"#475569",
    fontWeight:"600",
  },

  sectionTitle:{
    fontSize:22,
    fontWeight:"700",
    marginHorizontal:20,
    marginBottom:15,
    color:"#0F172A",
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
    paddingHorizontal:20,
  },

  card:{
    width:"48%",
    backgroundColor:"#FFFFFF",
    borderRadius:18,
    padding:18,
    marginBottom:15,
    elevation:4,
  },

  icon:{
    fontSize:32,
    marginBottom:10,
  },

  cardTitle:{
    fontWeight:"700",
    fontSize:17,
    color:"#0F172A",
  },

  cardDesc:{
    marginTop:5,
    color:"#64748B",
  },

  serviceCard:{
    backgroundColor:"#FFFFFF",
    marginHorizontal:20,
    marginBottom:15,
    borderRadius:18,
    padding:18,
    flexDirection:"row",
    alignItems:"center",
    elevation:3,
  },

  serviceText:{
    flex:1,
    marginLeft:15,
  },

  serviceTitle:{
    fontSize:17,
    fontWeight:"700",
    color:"#0F172A",
  },

  serviceSubtitle:{
    color:"#64748B",
    marginTop:4,
  },

  historyCard:{
    backgroundColor:"#FFFFFF",
    marginHorizontal:20,
    padding:20,
    borderRadius:18,
    elevation:3,
    marginBottom:20,
  },

  historyTop:{
    flexDirection:"row",
    justifyContent:"space-between",
  },

  historyType:{
    fontSize:18,
    fontWeight:"700",
  },

  historyDate:{
    marginTop:8,
    color:"#64748B",
  },

  statusBadge:{
    backgroundColor:"#FEF3C7",
    borderRadius:20,
    paddingHorizontal:12,
    paddingVertical:5,
  },

  statusText:{
    color:"#92400E",
    fontWeight:"700",
  },

  trackButton:{
    marginTop:18,
    backgroundColor:"#2563EB",
    padding:14,
    borderRadius:12,
    alignItems:"center",
  },

  trackButtonText:{
    color:"#FFFFFF",
    fontWeight:"700",
  },

  hospitalCard:{
    backgroundColor:"#FFFFFF",
    marginHorizontal:20,
    marginBottom:12,
    borderRadius:16,
    padding:16,
    flexDirection:"row",
    alignItems:"center",
    elevation:2,
  },

  hospitalInfo:{
    flex:1,
    marginLeft:15,
  },

  hospitalName:{
    fontWeight:"700",
    fontSize:16,
  },

  hospitalDistance:{
    color:"#64748B",
    marginTop:4,
  },

  tipCard:{
    backgroundColor:"#FFFFFF",
    marginHorizontal:20,
    marginBottom:15,
    borderRadius:16,
    padding:18,
    elevation:2,
  },

  tipTitle:{
    fontWeight:"700",
    color:"#D62828",
    marginBottom:8,
  },

  tipText:{
    color:"#475569",
    lineHeight:22,
  },

  emptyCard:{
    backgroundColor:"#FFFFFF",
    marginHorizontal:20,
    padding:25,
    borderRadius:18,
    alignItems:"center",
    marginBottom:20,
  },

  emptyTitle:{
    fontWeight:"700",
    fontSize:18,
    marginTop:10,
  },

  emptySubtitle:{
    textAlign:"center",
    color:"#64748B",
    marginTop:8,
  },

  footer:{
    alignItems:"center",
    paddingVertical:35,
  },

  footerTitle:{
    fontWeight:"700",
    fontSize:18,
    color:"#0F172A",
  },

  footerSubtitle:{
    marginTop:6,
    color:"#64748B",
  },

});