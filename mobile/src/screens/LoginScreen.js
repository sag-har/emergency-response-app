import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, } 
from "react-native";

import API from "../services/api";
import { saveToken } from "../storage/authStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // field validation
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateInputs = () => {
    let isValid = true;
    setPhoneError("");
    setPasswordError("");

    if (!phone.trim()) {
      setPhoneError("Please fill this field");
      isValid = false;
    } else if (phone.length < 11) {
      setPhoneError("Phone number must be 11 digits");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Please fill this field");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
  if (!validateInputs()) return;

  setLoading(true);

  try {
    console.log("Attempting login with:", { phone });

    const response = await API.post("/auth/login", {
      phone,
      password,
    });

    console.log("Login Response:", response.data);

    if (response?.data?.token && response?.data?.user) {
      const { token, user } = response.data;

      await saveToken(token);

      // Save user 
      await AsyncStorage.setItem("user", JSON.stringify(user));

      Alert.alert("Login Successful", "Welcome back!", [
        {
          text: "Continue",
          onPress: () => {
            // Role-based navigation
            if (user.role === "admin") {
              navigation.replace("AdminHome"); 
            } else {
              navigation.replace("Profile"); 
            }
          },
        },
      ]);
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Login Error:", error);

    let errorMessage =
      "Invalid data. Please check your phone number and password.";

    if (error.response) {
      errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid phone number or password";
    } else if (error.request) {
      errorMessage = "Network error. Please check your internet connection.";
    }

    Alert.alert("Login Failed", errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.appName}>RESCUE</Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to access emergency services
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.card}>
            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (phoneError) setPhoneError(""); 
              }}
              style={[styles.input, phoneError && styles.inputError]}
              maxLength={11}
              editable={!loading}
            />
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}

            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError(""); 
              }}
              style={[styles.input, passwordError && styles.inputError]}
              editable={!loading}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <TouchableOpacity style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.btnText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* REGISTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  appName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#D32F2F",
    letterSpacing: 4,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E2937",
  },

  subtitle: {
    fontSize: 15.5,
    color: "#64748B",
    marginTop: 8,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    marginBottom: 4,
  },

  inputError: {
    borderColor: "#EF4444",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 4,
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  forgotText: {
    color: "#D32F2F",
    fontWeight: "500",
  },

  loginBtn: {
    backgroundColor: "#D32F2F",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  loginBtnDisabled: {
    backgroundColor: "#F87171",
  },

  btnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
  },

  footerText: {
    color: "#64748B",
  },

  link: {
    color: "#002F6C",
    fontWeight: "600",
  },
});
