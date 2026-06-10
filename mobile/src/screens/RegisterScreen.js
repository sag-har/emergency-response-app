import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}></Text>

          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>Register for emergency assistance</Text>
        </View>

        <View style={styles.form}>
          <TextInput placeholder="Full Name" style={styles.input} />

          <TextInput
            placeholder="Email Address"
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text>Already have an account?</Text>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    fontSize: 55,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D32F2F",
    marginTop: 10,
  },

  subtitle: {
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },

  form: {
    gap: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#D32F2F",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  link: {
    color: "#D32F2F",
    fontWeight: "bold",
  },
});
