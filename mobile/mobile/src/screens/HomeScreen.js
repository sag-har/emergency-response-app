import React, {
  useEffect,
  useState,
  useLayoutEffect,
} from "react";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import {
  getUser,
  getToken,
  clearStorage,
} from "../storage/authStorage";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerTitle: () => (
        <Text style={styles.logo}>
          RESCUE
        </Text>
      ),

      headerStyle: {
        backgroundColor: "#FFFFFF",
      },

      headerShadowVisible: false,

      headerRight: () => (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            if (isLoggedIn) {
              logout();
            } else {
              navigation.navigate("Login");
            }
          }}
        >
          <Text style={styles.loginText}>
            {isLoggedIn ? "Logout" : "Login"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isLoggedIn]);

  const loadUser = async () => {
    try {
      const token = await getToken();
      const userData = await getUser();

      if (token && userData) {
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await clearStorage();

            setIsLoggedIn(false);
            setUser(null);

            navigation.replace("Home");
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#D62828"
        />

        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Emergency Response System
          </Text>

          <Text style={styles.heroSubtitle}>
            Fast • Reliable • Secure
          </Text>

          {isLoggedIn && (
            <View style={styles.welcomeBox}>
              <Text style={styles.welcomeText}>
                Welcome,
              </Text>

              <Text style={styles.userName}>
                {user?.name || "User"}
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Main")
            }
          >
            <Text style={styles.cardIcon}>
              🚨
            </Text>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>
                Emergency SOS
              </Text>

              <Text style={styles.cardSubtitle}>
                Send an emergency alert instantly
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                "HospitalSelection"
              )
            }
          >
            <Text style={styles.cardIcon}>
              🏥
            </Text>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>
                Nearby Hospitals
              </Text>

              <Text style={styles.cardSubtitle}>
                Find available hospitals
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                "EmergencyContacts"
              )
            }
          >
            <Text style={styles.cardIcon}>
              👨‍👩‍👧
            </Text>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>
                Emergency Contacts
              </Text>

              <Text style={styles.cardSubtitle}>
                Manage trusted contacts
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                "NotificationHistory"
              )
            }
          >
            <Text style={styles.cardIcon}>
              🔔
            </Text>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>
                Notifications
              </Text>

              <Text style={styles.cardSubtitle}>
                View notification history
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Settings")
            }
          >
            <Text style={styles.cardIcon}>
              ⚙️
            </Text>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>
                Settings
              </Text>

              <Text style={styles.cardSubtitle}>
                Application preferences
              </Text>
            </View>
          </TouchableOpacity>
                  </View>

        {/* Features */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Why Choose Rescue?
          </Text>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>
              🚑 Instant Emergency Alerts
            </Text>

            <Text style={styles.featureText}>
              Notify emergency responders immediately with
              your current location.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>
              📍 Live Tracking
            </Text>

            <Text style={styles.featureText}>
              Track the response team in real time until
              help reaches you.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>
              🏥 Hospital Selection
            </Text>

            <Text style={styles.featureText}>
              View nearby hospitals and select the most
              suitable one during emergencies.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>
              👨‍👩‍👧 Emergency Contacts
            </Text>

            <Text style={styles.featureText}>
              Notify your family members instantly whenever
              an emergency request is submitted.
            </Text>
          </View>
        </View>

        {/* Bottom */}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Your Safety Is Our Priority
          </Text>

          <Text style={styles.footerText}>
            Emergency Response System
          </Text>

          <Text style={styles.version}>
            Version 1.0
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
    fontWeight:"600",
  },

  logo:{
    fontSize:26,
    fontWeight:"bold",
    color:"#D62828",
    letterSpacing:2,
  },

  loginButton:{
    backgroundColor:"#D62828",
    paddingHorizontal:18,
    paddingVertical:8,
    borderRadius:20,
    marginRight:10,
  },

  loginText:{
    color:"#fff",
    fontWeight:"700",
  },

  hero:{
    backgroundColor:"#FFFFFF",
    paddingVertical:35,
    paddingHorizontal:25,
    alignItems:"center",
    borderBottomWidth:1,
    borderBottomColor:"#E2E8F0",
  },

  heroTitle:{
    fontSize:28,
    fontWeight:"bold",
    color:"#0F172A",
  },

  heroSubtitle:{
    marginTop:8,
    color:"#64748B",
    fontSize:16,
  },

  welcomeBox:{
    marginTop:20,
    alignItems:"center",
  },

  welcomeText:{
    color:"#64748B",
    fontSize:15,
  },

  userName:{
    marginTop:5,
    fontSize:20,
    fontWeight:"bold",
    color:"#D62828",
  },

  section:{
    padding:20,
  },

  sectionTitle:{
    fontSize:22,
    fontWeight:"700",
    marginBottom:15,
    color:"#0F172A",
  },

  card:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#FFFFFF",
    borderRadius:18,
    padding:18,
    marginBottom:15,
    elevation:4,
  },

  cardIcon:{
    fontSize:35,
    marginRight:15,
  },

  cardText:{
    flex:1,
  },

  cardTitle:{
    fontSize:18,
    fontWeight:"700",
    color:"#0F172A",
  },

  cardSubtitle:{
    marginTop:5,
    color:"#64748B",
    lineHeight:20,
  },

  featureCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:18,
    padding:18,
    marginBottom:15,
    elevation:3,
  },

  featureTitle:{
    fontSize:17,
    fontWeight:"700",
    color:"#D62828",
    marginBottom:8,
  },

  featureText:{
    color:"#475569",
    lineHeight:22,
  },

  footer:{
    padding:30,
    alignItems:"center",
  },

  footerTitle:{
    fontSize:18,
    fontWeight:"700",
    color:"#0F172A",
  },

  footerText:{
    marginTop:8,
    color:"#64748B",
  },

  version:{
    marginTop:15,
    color:"#94A3B8",
    fontSize:13,
  },

});