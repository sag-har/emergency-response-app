# Azhar - Member A QA Test Report

Tester: Azhar  
Team Role: Member A  
Test Type: Manual Functional Testing  
Module Covered: Auth Flow, Auth Hardening, Role/Profile Logic, SOS Flow Track B  
Environment: Mobile app connected with backend API  
Execution Status: Completed

## 1. Auth Flow - 5 Test Cases

| Test ID | Test Case | Test Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| AUTH-01 | Register with valid data | Open Register screen, enter full name, 11-digit phone number, password, confirm password, then tap Create Account. | User account should be created successfully. | Registration completed successfully and success message appeared. | Pass |
| AUTH-02 | Register with empty fields | Open Register screen and tap Create Account without filling fields. | App should show inline validation errors. | Required field validation appeared on the form. | Pass |
| AUTH-03 | Register with invalid phone number | Enter phone number less than 11 digits and submit. | App should show phone number validation error. | App showed phone number must be 11 digits. | Pass |
| AUTH-04 | Login with valid credentials | Open Login screen, enter registered phone and password, then tap Sign In. | User should log in successfully and navigate to Home. | Login was successful and app navigated to Home. | Pass |
| AUTH-05 | Login with wrong password | Enter valid phone number with incorrect password and submit. | App should show a user-friendly login failed message. | Login failed alert appeared with readable error message. | Pass |

## 2. Auth Hardening / Role Or Profile Logic - 5+ New Test Cases

| Test ID | Test Case | Test Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| HARD-01 | Password minimum length validation | Enter password shorter than 6 characters during registration. | App should block submission and show password error. | Password length validation appeared. | Pass |
| HARD-02 | Confirm password mismatch validation | Enter different values in Password and Confirm Password. | App should show password mismatch error. | App showed passwords do not match. | Pass |
| HARD-03 | Phone input accepts digits only | Type alphabets or symbols in phone number field. | Non-numeric characters should not remain in phone field. | Phone field kept numeric digits only. | Pass |
| HARD-04 | JWT stored after login | Login with valid credentials and continue to protected screen. | JWT and user data should be stored in AsyncStorage. | User session stayed active and protected Home/Profile opened. | Pass |
| HARD-05 | Logout clears saved session | Tap Logout and confirm. | JWT and user data should be removed and user should return to Login. | App redirected to Login and protected screens required login again. | Pass |
| HARD-06 | Missing token blocks protected screen | Clear stored token and open Home/Profile. | App should redirect to Login. | App redirected to Login when token was missing. | Pass |
| HARD-07 | Expired token blocks protected screen | Use expired token/session and open protected screen. | App should clear session and redirect to Login. | Expired session was treated as invalid and app returned to Login. | Pass |
| HARD-08 | Profile displays stored user information | Login and open Profile screen. | Profile should display stored user name and phone number. | Profile displayed logged-in user's name and phone number. | Pass |

## 3. Emergency Request QA - Submission, Confirmation, History

| Test ID | Test Case | Test Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| EMR-01 | Emergency request submission with valid JWT | Login, select emergency type, enter notes/location, and submit request. | Request should be submitted with JWT in Authorization header. | API request used saved JWT through the API interceptor. | Pass |
| EMR-02 | Emergency request blocked without login | Logout or clear token, then try emergency request submission. | User should be redirected to Login or request should be blocked. | App redirected to Login when token was missing. | Pass |
| EMR-03 | API failure shows user message | Submit request while backend is unavailable or returns error. | App should show user-facing error message. | User-friendly error message was shown instead of raw console output. | Pass |
| EMR-04 | Confirmation screen after successful request | Submit valid emergency request successfully. | Confirmation screen should show Request ID and status. | Successful response returned request ID and status for confirmation display. | Pass |
| EMR-05 | History list loads past requests | Login and open Request History screen. | User's previous emergency requests should be displayed. | History list loaded for authenticated user. | Pass |
| EMR-06 | History empty state | Login with user having no previous requests and open History. | Empty state should be shown. | Empty state was shown when no requests were available. | Pass |
| EMR-07 | History loading state | Open History screen while request data is loading. | Loading indicator/state should appear. | Loading state appeared before results were displayed. | Pass |

## 4. SOS Flow Track B - 5 Test Cases

| Test ID | Test Case | Test Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| SOS-01 | Submit SOS with valid session | Login, fill SOS form, and submit. | SOS request should be submitted successfully. | SOS request submitted using logged-in session. | Pass |
| SOS-02 | SOS sends JWT authorization | Submit SOS after login and inspect API behavior. | Request should include `Authorization: Bearer <token>`. | Stored JWT was attached through API interceptor. | Pass |
| SOS-03 | SOS blocked for logged-out user | Clear AsyncStorage and try SOS flow. | User should be redirected to Login or blocked from submitting. | User was redirected to Login. | Pass |
| SOS-04 | SOS confirmation data shown | Submit SOS successfully. | Confirmation should show Request ID and status. | Confirmation data was available from success response. | Pass |
| SOS-05 | SOS history protected by authentication | Open History after login, then logout and try again. | History should work only for logged-in user. | Logged-in history access worked; logged-out access redirected to Login. | Pass |

## Final Summary

Total Test Cases Executed: 25  
Passed: 25  
Failed: 0  

These are manual functional test cases written and executed for Member A responsibilities: authentication flow, JWT session storage, logout, protected screens, profile logic, emergency request auth behavior, confirmation, history list, and SOS Track B flow.
