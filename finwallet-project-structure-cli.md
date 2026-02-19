# FinWallet — Project Folder & File Structure

> React Native CLI · TypeScript · Supabase · Prisma · Redux Toolkit · React Navigation 7 · NativeWind · Gluestack UI v2

---

## Root Directory

```
finwallet/
├── index.js                          # App entry point (AppRegistry.registerComponent)
├── App.tsx                           # Root component — providers wrapper
├── babel.config.js                   # Babel config with NativeWind + Reanimated
├── metro.config.js                   # Metro bundler config (NativeWind, SVG, etc.)
├── tailwind.config.js                # Design system tokens
├── nativewind-env.d.ts               # NativeWind TypeScript declarations
├── tsconfig.json                     # TypeScript configuration
├── react-native.config.js            # Native module config + font linking
├── package.json
├── Gemfile                           # Ruby dependencies for iOS (CocoaPods)
├── .env                              # Environment variables (Supabase URL, keys)
├── .env.example                      # Template for environment variables
├── .env.staging                      # Staging environment
├── .env.production                   # Production environment
├── .eslintrc.js                      # ESLint config
├── .prettierrc                       # Prettier config
├── docker-compose.yml                # One-command local setup (Supabase + backend)
├── README.md                         # Quick start guide with screenshots
├── ARCHITECTURE.md                   # Design patterns & data flow docs
├── CUSTOMIZATION.md                  # Rebranding, theming, feature toggles
├── LICENSE
│
├── android/                          # Android native project
│   ├── app/
│   │   ├── build.gradle              # App-level gradle (minSdk, targetSdk, signingConfigs)
│   │   ├── proguard-rules.pro        # ProGuard rules for release builds
│   │   └── src/
│   │       └── main/
│   │           ├── AndroidManifest.xml
│   │           ├── java/com/finwallet/
│   │           │   ├── MainActivity.kt
│   │           │   └── MainApplication.kt
│   │           └── res/              # Android resources (icons, splash, etc.)
│   │               ├── drawable/
│   │               ├── mipmap-hdpi/
│   │               ├── mipmap-mdpi/
│   │               ├── mipmap-xhdpi/
│   │               ├── mipmap-xxhdpi/
│   │               ├── mipmap-xxxhdpi/
│   │               └── values/
│   │                   ├── colors.xml
│   │                   ├── strings.xml
│   │                   └── styles.xml
│   ├── build.gradle                  # Project-level gradle
│   ├── gradle.properties             # Gradle settings (newArchEnabled, hermesEnabled)
│   ├── settings.gradle
│   └── gradle/
│       └── wrapper/
│           └── gradle-wrapper.properties
│
├── ios/                              # iOS native project
│   ├── FinWallet/
│   │   ├── AppDelegate.mm            # App delegate (push notifications, deep linking)
│   │   ├── Info.plist                # Permissions (camera, Face ID, location, photos)
│   │   ├── LaunchScreen.storyboard   # Splash screen
│   │   ├── FinWallet.entitlements    # Apple Pay, push notifications entitlements
│   │   └── Images.xcassets/          # App icons
│   │       └── AppIcon.appiconset/
│   ├── FinWallet.xcodeproj/
│   ├── FinWallet.xcworkspace/
│   └── Podfile                       # CocoaPods dependencies
│
├── assets/                           # Static assets
│   ├── fonts/                        # Linked via react-native.config.js
│   │   ├── PlusJakartaSans-Bold.ttf
│   │   ├── PlusJakartaSans-SemiBold.ttf
│   │   ├── PlusJakartaSans-Medium.ttf
│   │   ├── Inter-Regular.ttf
│   │   ├── Inter-Medium.ttf
│   │   ├── Inter-SemiBold.ttf
│   │   ├── Inter-Bold.ttf
│   │   ├── JetBrainsMono-Regular.ttf
│   │   └── JetBrainsMono-Medium.ttf
│   ├── images/
│   │   ├── logo.png
│   │   ├── logo-dark.png
│   │   ├── onboarding-1.png
│   │   ├── onboarding-2.png
│   │   ├── onboarding-3.png
│   │   ├── empty-transactions.png
│   │   ├── empty-cards.png
│   │   ├── empty-notifications.png
│   │   ├── kyc-success.png
│   │   ├── transfer-success.png
│   │   └── card-designs/
│   │       ├── card-blue.png
│   │       ├── card-dark.png
│   │       └── card-gold.png
│   ├── icons/                        # Custom SVG icons (via react-native-svg-transformer)
│   │   └── index.ts
│   └── animations/                   # Lottie animations
│       ├── loading.json
│       ├── success.json
│       ├── error.json
│       └── empty.json
│
├── src/
│   │
│   ├── app/                          # App-level setup
│   │   ├── Providers.tsx             # All providers wrapped (Redux, Navigation, Theme, Supabase)
│   │   ├── AppNavigator.tsx          # Root navigator (Auth stack vs Main stack)
│   │   └── linking.ts               # Deep linking configuration
│   │
│   ├── config/                       # App configuration
│   │   ├── env.ts                    # react-native-config env access with validation
│   │   ├── constants.ts              # App-wide constants (limits, timeouts, regex)
│   │   ├── supabase.ts              # Supabase client initialization
│   │   ├── api.ts                    # Axios instance with interceptors, base URL, headers
│   │   └── firebase.ts              # Firebase initialization (push notifications)
│   │
│   ├── theme/                        # Design system implementation
│   │   ├── tokens.ts                 # Color, spacing, radius, shadow tokens (mirrors JSON)
│   │   ├── typography.ts             # Font family mapping & text style presets
│   │   ├── ThemeContext.tsx           # Light/dark mode context with system detection
│   │   ├── useTheme.ts              # Hook to access current theme colors
│   │   └── presets/                  # Swappable color presets
│   │       ├── ocean-blue.ts         # Default theme
│   │       ├── black-gold.ts         # Luxury theme
│   │       └── emerald.ts            # Green theme
│   │
│   ├── components/                   # Shared UI components (design system layer)
│   │   ├── ui/                       # Base primitives (built on Gluestack)
│   │   │   ├── AppButton.tsx         # Primary, secondary, outline, ghost, destructive
│   │   │   ├── AppInput.tsx          # With label, error, helper text, left/right icons
│   │   │   ├── AppText.tsx           # Pre-styled text with variant prop (h1, body, caption, etc.)
│   │   │   ├── AppCard.tsx           # Elevated card with consistent padding/shadow
│   │   │   ├── AppModal.tsx          # Centered modal with overlay
│   │   │   ├── AppBottomSheet.tsx    # Wrapper around @gorhom/bottom-sheet
│   │   │   ├── AppToast.tsx          # Success, error, warning, info toast variants
│   │   │   ├── AppBadge.tsx          # Status badge with dot + label
│   │   │   ├── AppAvatar.tsx         # Circle/square avatar with fallback initials
│   │   │   ├── AppChip.tsx           # Selectable chip / filter tag
│   │   │   ├── AppDivider.tsx        # Horizontal divider
│   │   │   ├── AppSwitch.tsx         # Toggle switch
│   │   │   ├── AppCheckbox.tsx       # Checkbox with label
│   │   │   ├── AppRadio.tsx          # Radio button group
│   │   │   ├── AppProgressBar.tsx    # Linear progress bar
│   │   │   ├── AppOTPInput.tsx       # 6-digit OTP input with auto-advance
│   │   │   ├── AppPinInput.tsx       # PIN entry with numeric keypad
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── ScreenWrapper.tsx     # SafeArea + padding + scroll + keyboard avoiding
│   │   │   ├── AppHeader.tsx         # Screen header with back button, title, actions
│   │   │   ├── TabBar.tsx            # Custom animated bottom tab bar
│   │   │   ├── SectionHeader.tsx     # Section title with optional "See All" link
│   │   │   └── KeyboardAvoidView.tsx # Platform-aware keyboard avoiding wrapper
│   │   │
│   │   ├── feedback/                 # Loading & error states
│   │   │   ├── SkeletonLoader.tsx    # Shimmer skeleton with configurable shapes
│   │   │   ├── EmptyState.tsx        # Illustration + title + subtitle + CTA
│   │   │   ├── ErrorBoundary.tsx     # Global error boundary with fallback UI
│   │   │   ├── ErrorState.tsx        # Error display with retry button
│   │   │   ├── LoadingOverlay.tsx    # Full-screen loading with blur
│   │   │   └── OfflineBanner.tsx     # Network status banner
│   │   │
│   │   └── shared/                   # Shared domain components (used across features)
│   │       ├── TransactionItem.tsx   # Single transaction row (icon, name, amount, status)
│   │       ├── BalanceCard.tsx       # Main balance display with show/hide toggle
│   │       ├── MiniCardPreview.tsx   # Card last-4-digits preview
│   │       ├── ContactItem.tsx       # Contact row with avatar, name, phone
│   │       ├── AmountInput.tsx       # Currency-aware amount entry with keypad
│   │       ├── CountryPicker.tsx     # Country selector with flags and search
│   │       ├── CurrencyPicker.tsx    # Currency selector with code and symbol
│   │       ├── DateRangePicker.tsx   # Date range filter component
│   │       ├── SearchBar.tsx         # Animated search input with clear button
│   │       ├── StatusBadge.tsx       # Completed, pending, failed, frozen badges
│   │       ├── KYCBadge.tsx          # Unverified, basic, intermediate, full badges
│   │       └── BiometricPrompt.tsx   # Face ID / Touch ID prompt wrapper
│   │
│   ├── features/                     # Feature modules (each self-contained)
│   │   │
│   │   ├── onboarding/              # Module 01
│   │   │   ├── screens/
│   │   │   │   ├── SplashScreen.tsx
│   │   │   │   ├── WelcomeScreen.tsx           # 3-step walkthrough carousel
│   │   │   │   ├── GetStartedScreen.tsx
│   │   │   │   └── LanguageSelectScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── OnboardingSlide.tsx
│   │   │   │   ├── PaginationDots.tsx
│   │   │   │   └── AppTourTooltip.tsx
│   │   │   └── navigation/
│   │   │       └── OnboardingNavigator.tsx
│   │   │
│   │   ├── auth/                     # Module 02
│   │   │   ├── screens/
│   │   │   │   ├── PhoneEntryScreen.tsx
│   │   │   │   ├── OTPVerificationScreen.tsx
│   │   │   │   ├── EmailRegistrationScreen.tsx
│   │   │   │   ├── PersonalInfoScreen.tsx
│   │   │   │   ├── CreatePinScreen.tsx
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── BiometricLoginScreen.tsx
│   │   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   │   └── ResetPasswordScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── CountryCodePicker.tsx
│   │   │   │   ├── OTPCountdown.tsx
│   │   │   │   ├── PasswordStrength.tsx
│   │   │   │   └── PinKeypad.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts                  # Login, logout, register, refresh
│   │   │   │   ├── useBiometric.ts             # react-native-biometrics wrapper
│   │   │   │   └── usePin.ts                   # PIN creation, validation, storage
│   │   │   ├── services/
│   │   │   │   └── authService.ts              # Supabase auth API calls
│   │   │   ├── store/
│   │   │   │   └── authSlice.ts                # Auth state, user, tokens, loading
│   │   │   ├── navigation/
│   │   │   │   └── AuthNavigator.tsx
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   └── utils/
│   │   │       └── validation.ts               # Phone, email, password validation rules
│   │   │
│   │   ├── kyc/                      # Module 03
│   │   │   ├── screens/
│   │   │   │   ├── KYCStatusScreen.tsx          # Verification level & limits dashboard
│   │   │   │   ├── DocumentTypeScreen.tsx       # ID type selection
│   │   │   │   ├── DocumentCaptureScreen.tsx    # Camera with frame overlay
│   │   │   │   ├── SelfieScreen.tsx             # Liveness check
│   │   │   │   ├── DocumentReviewScreen.tsx     # Preview & retake
│   │   │   │   └── VerificationStatusScreen.tsx # Processing, success, rejection
│   │   │   ├── components/
│   │   │   │   ├── DocumentFrame.tsx            # Camera overlay frame
│   │   │   │   ├── FaceOvalGuide.tsx            # Selfie face guide
│   │   │   │   ├── VerificationProgress.tsx     # Step progress indicator
│   │   │   │   └── TierCard.tsx                 # KYC tier with limits display
│   │   │   ├── hooks/
│   │   │   │   └── useKYC.ts                    # KYC submission & status polling
│   │   │   ├── services/
│   │   │   │   ├── kycService.ts                # KYC API calls
│   │   │   │   └── verificationProvider.ts      # Abstracted (Sumsub, Onfido, mock)
│   │   │   ├── store/
│   │   │   │   └── kycSlice.ts
│   │   │   ├── navigation/
│   │   │   │   └── KYCNavigator.tsx
│   │   │   └── types/
│   │   │       └── kyc.types.ts
│   │   │
│   │   ├── dashboard/                # Module 04
│   │   │   ├── screens/
│   │   │   │   ├── HomeScreen.tsx               # Main dashboard
│   │   │   │   ├── NotificationsScreen.tsx
│   │   │   │   └── SearchScreen.tsx             # Global search
│   │   │   ├── components/
│   │   │   │   ├── QuickActions.tsx              # Send, receive, top up, pay bills grid
│   │   │   │   ├── RecentTransactions.tsx        # Last 5 transactions list
│   │   │   │   ├── SpendingSummary.tsx           # Income vs expense widget
│   │   │   │   ├── PromoBanner.tsx               # Promotional carousel
│   │   │   │   ├── NotificationItem.tsx
│   │   │   │   └── SearchResult.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useDashboard.ts              # Dashboard data aggregation
│   │   │   │   └── useNotifications.ts          # Notification fetch & mark as read
│   │   │   ├── store/
│   │   │   │   ├── dashboardSlice.ts
│   │   │   │   └── notificationSlice.ts
│   │   │   └── types/
│   │   │       └── dashboard.types.ts
│   │   │
│   │   ├── wallet/                   # Module 05
│   │   │   ├── screens/
│   │   │   │   ├── WalletOverviewScreen.tsx     # Multi-currency wallet list
│   │   │   │   ├── TopUpScreen.tsx              # Add money methods
│   │   │   │   ├── WithdrawScreen.tsx           # Cash out to bank
│   │   │   │   ├── CurrencyExchangeScreen.tsx   # Convert between currencies
│   │   │   │   └── TransactionLimitsScreen.tsx  # Limits by KYC level
│   │   │   ├── components/
│   │   │   │   ├── WalletCard.tsx               # Single wallet with balance
│   │   │   │   ├── FundingMethodCard.tsx        # Bank, card, link methods
│   │   │   │   ├── ExchangeRateDisplay.tsx      # Live rate with fee breakdown
│   │   │   │   └── LimitProgressBar.tsx         # Usage vs limit bar
│   │   │   ├── hooks/
│   │   │   │   ├── useWallet.ts                 # Balance fetch, refresh
│   │   │   │   └── useExchangeRate.ts           # Rate polling
│   │   │   ├── services/
│   │   │   │   └── walletService.ts
│   │   │   ├── store/
│   │   │   │   └── walletSlice.ts
│   │   │   └── types/
│   │   │       └── wallet.types.ts
│   │   │
│   │   ├── transfer/                 # Module 06
│   │   │   ├── screens/
│   │   │   │   ├── SendToContactScreen.tsx      # Select from contacts
│   │   │   │   ├── SendToBankScreen.tsx         # Manual bank details
│   │   │   │   ├── SendToWalletScreen.tsx       # Wallet-to-wallet by phone/email
│   │   │   │   ├── CountrySelectScreen.tsx      # International corridor
│   │   │   │   ├── RecipientDetailsScreen.tsx   # Adaptive form by country
│   │   │   │   ├── AmountEntryScreen.tsx        # Amount, conversion, fees
│   │   │   │   ├── TransferReviewScreen.tsx     # Summary + confirm with PIN/biometric
│   │   │   │   └── TransferSuccessScreen.tsx    # Receipt with share option
│   │   │   ├── components/
│   │   │   │   ├── RecipientCard.tsx            # Saved recipient display
│   │   │   │   ├── FeeBreakdown.tsx             # Fee + exchange rate details
│   │   │   │   ├── QuickAmountButtons.tsx       # $50, $100, $500 shortcuts
│   │   │   │   ├── TransferTimeline.tsx         # Status progress steps
│   │   │   │   └── ReceiptCard.tsx              # Shareable receipt
│   │   │   ├── hooks/
│   │   │   │   ├── useTransfer.ts               # Transfer initiation & status
│   │   │   │   ├── useFeeCalculation.ts         # Real-time fee engine
│   │   │   │   └── useRecipients.ts             # Saved beneficiaries CRUD
│   │   │   ├── services/
│   │   │   │   └── transferService.ts
│   │   │   ├── store/
│   │   │   │   └── transferSlice.ts
│   │   │   ├── navigation/
│   │   │   │   └── TransferNavigator.tsx
│   │   │   └── types/
│   │   │       └── transfer.types.ts
│   │   │
│   │   ├── receive/                  # Module 07
│   │   │   ├── screens/
│   │   │   │   ├── MyQRCodeScreen.tsx           # Static & dynamic QR generation
│   │   │   │   ├── QRScannerScreen.tsx          # Camera scanner
│   │   │   │   ├── RequestMoneyScreen.tsx       # Create payment request
│   │   │   │   └── RequestHistoryScreen.tsx     # Sent/received requests
│   │   │   ├── components/
│   │   │   │   ├── QRCodeGenerator.tsx          # react-native-qrcode-svg
│   │   │   │   ├── QRCodeScanner.tsx            # react-native-vision-camera + barcode
│   │   │   │   └── RequestItem.tsx
│   │   │   ├── hooks/
│   │   │   │   └── usePaymentRequest.ts
│   │   │   ├── services/
│   │   │   │   └── receiveService.ts
│   │   │   ├── store/
│   │   │   │   └── receiveSlice.ts
│   │   │   └── types/
│   │   │       └── receive.types.ts
│   │   │
│   │   ├── cards/                    # Module 08
│   │   │   ├── screens/
│   │   │   │   ├── MyCardsScreen.tsx            # Swipeable card carousel
│   │   │   │   ├── CardDetailsScreen.tsx        # Full card info with show/hide
│   │   │   │   ├── CardActionsScreen.tsx        # Freeze, limits, toggles
│   │   │   │   ├── OrderCardScreen.tsx          # Design selection + delivery address
│   │   │   │   ├── CardTransactionsScreen.tsx   # Card-specific history
│   │   │   │   └── CardPinScreen.tsx            # View/change/reset PIN
│   │   │   ├── components/
│   │   │   │   ├── CardCarousel.tsx             # Horizontal swipeable cards
│   │   │   │   ├── CardFace.tsx                 # Card visual with flip animation
│   │   │   │   ├── CardActionToggle.tsx         # Toggle row for card settings
│   │   │   │   ├── SpendingLimitSlider.tsx      # Adjustable limit control
│   │   │   │   └── CardDesignPicker.tsx         # Card face design selector
│   │   │   ├── hooks/
│   │   │   │   └── useCards.ts                  # Card CRUD, freeze/unfreeze
│   │   │   ├── services/
│   │   │   │   └── cardService.ts
│   │   │   ├── store/
│   │   │   │   └── cardSlice.ts
│   │   │   └── types/
│   │   │       └── card.types.ts
│   │   │
│   │   ├── bills/                    # Module 09
│   │   │   ├── screens/
│   │   │   │   ├── BillCategoriesScreen.tsx     # Category grid
│   │   │   │   ├── ProviderSelectScreen.tsx     # Providers within category
│   │   │   │   ├── BillPaymentScreen.tsx        # Account input + amount + pay
│   │   │   │   ├── PaymentReceiptScreen.tsx     # Confirmation receipt
│   │   │   │   └── SavedBillsScreen.tsx         # Saved billers + auto-pay
│   │   │   ├── components/
│   │   │   │   ├── CategoryCard.tsx             # Bill category with icon
│   │   │   │   ├── ProviderCard.tsx             # Provider logo + name
│   │   │   │   ├── SavedBillItem.tsx            # Saved biller row
│   │   │   │   └── AutoPayToggle.tsx            # Schedule auto-pay
│   │   │   ├── hooks/
│   │   │   │   └── useBills.ts
│   │   │   ├── services/
│   │   │   │   └── billService.ts
│   │   │   ├── store/
│   │   │   │   └── billSlice.ts
│   │   │   ├── navigation/
│   │   │   │   └── BillsNavigator.tsx
│   │   │   └── types/
│   │   │       └── bill.types.ts
│   │   │
│   │   ├── analytics/                # Module 10
│   │   │   ├── screens/
│   │   │   │   ├── SpendingOverviewScreen.tsx   # Donut + bar charts
│   │   │   │   ├── CategoryBreakdownScreen.tsx  # Per-category details + trend
│   │   │   │   └── BudgetScreen.tsx             # Set budgets + progress
│   │   │   ├── components/
│   │   │   │   ├── DonutChart.tsx               # Victory Native donut
│   │   │   │   ├── BarChart.tsx                 # Monthly comparison bars
│   │   │   │   ├── LineChart.tsx                # Balance over time
│   │   │   │   ├── BudgetProgressCard.tsx       # Category budget with progress bar
│   │   │   │   └── SpendingHeatmap.tsx          # Weekly heat map
│   │   │   ├── hooks/
│   │   │   │   ├── useAnalytics.ts              # Spending aggregation
│   │   │   │   └── useBudget.ts                 # Budget CRUD + alerts
│   │   │   ├── services/
│   │   │   │   └── analyticsService.ts
│   │   │   ├── store/
│   │   │   │   └── analyticsSlice.ts
│   │   │   └── types/
│   │   │       └── analytics.types.ts
│   │   │
│   │   ├── profile/                  # Module 11
│   │   │   ├── screens/
│   │   │   │   ├── ProfileScreen.tsx            # User info overview
│   │   │   │   ├── EditProfileScreen.tsx        # Edit personal info
│   │   │   │   ├── LinkedAccountsScreen.tsx     # Manage bank accounts
│   │   │   │   ├── SecurityCenterScreen.tsx     # All security settings
│   │   │   │   ├── ChangePinScreen.tsx          # Change app PIN
│   │   │   │   ├── ActiveSessionsScreen.tsx     # Logged-in devices
│   │   │   │   ├── SettingsScreen.tsx           # Language, theme, notifications
│   │   │   │   └── SupportScreen.tsx            # FAQ, chat, feedback
│   │   │   ├── components/
│   │   │   │   ├── ProfileHeader.tsx            # Avatar + name + KYC badge
│   │   │   │   ├── SettingsRow.tsx              # Label + value/toggle row
│   │   │   │   ├── SessionItem.tsx              # Device + location + terminate
│   │   │   │   ├── FAQAccordion.tsx             # Expandable FAQ item
│   │   │   │   └── LinkedBankItem.tsx           # Bank account row
│   │   │   ├── hooks/
│   │   │   │   ├── useProfile.ts
│   │   │   │   └── useSessions.ts
│   │   │   ├── services/
│   │   │   │   └── profileService.ts
│   │   │   ├── store/
│   │   │   │   └── profileSlice.ts
│   │   │   ├── navigation/
│   │   │   │   └── ProfileNavigator.tsx
│   │   │   └── types/
│   │   │       └── profile.types.ts
│   │   │
│   │   └── transactions/             # Shared transaction history
│   │       ├── screens/
│   │       │   └── TransactionHistoryScreen.tsx  # Full history with filters
│   │       ├── components/
│   │       │   ├── TransactionList.tsx           # Grouped by date
│   │       │   ├── TransactionFilter.tsx         # Category, date range, status
│   │       │   └── TransactionDetail.tsx         # Full transaction receipt
│   │       ├── hooks/
│   │       │   └── useTransactions.ts            # Paginated fetch with filters
│   │       ├── services/
│   │       │   └── transactionService.ts
│   │       ├── store/
│   │       │   └── transactionSlice.ts
│   │       └── types/
│   │           └── transaction.types.ts
│   │
│   ├── navigation/                   # Root navigation setup
│   │   ├── RootNavigator.tsx         # Auth vs Main stack switching
│   │   ├── MainTabNavigator.tsx      # Bottom tabs: Home, Cards, Send, Analytics, Profile
│   │   ├── types.ts                  # RootStackParamList, TabParamList (type-safe routes)
│   │   └── navigationRef.ts          # Ref for navigating outside components (notifications)
│   │
│   ├── store/                        # Redux Toolkit store
│   │   ├── store.ts                  # configureStore with all slices + middleware
│   │   ├── hooks.ts                  # Typed useAppSelector, useAppDispatch
│   │   ├── rootReducer.ts           # combineReducers from all feature slices
│   │   └── middleware/
│   │       └── apiErrorMiddleware.ts # Global API error handling (401 refresh, etc.)
│   │
│   ├── services/                     # Shared service layer
│   │   ├── api/
│   │   │   ├── apiClient.ts          # Axios instance with interceptors + token refresh
│   │   │   ├── endpoints.ts          # All API endpoint URLs as constants
│   │   │   └── types.ts              # ApiResponse<T>, ApiError, PaginatedResponse<T>
│   │   │
│   │   ├── payment/                  # Abstracted payment service layer
│   │   │   ├── PaymentService.ts     # Abstract interface (IPaymentService)
│   │   │   ├── StripeProvider.ts     # Stripe Connect implementation
│   │   │   ├── PlaidProvider.ts      # Plaid bank verification
│   │   │   ├── MockProvider.ts       # Mock for demo/testing (simulates full lifecycle)
│   │   │   └── index.ts             # Factory function returns active provider
│   │   │
│   │   ├── storage/
│   │   │   ├── secureStorage.ts      # react-native-keychain wrapper (tokens, PIN, biometric)
│   │   │   └── asyncStorage.ts       # @react-native-async-storage wrapper (preferences)
│   │   │
│   │   ├── notifications/
│   │   │   ├── pushService.ts        # @react-native-firebase/messaging token registration
│   │   │   └── notificationHandler.ts # @notifee/react-native display + navigation
│   │   │
│   │   └── realtime/
│   │       └── supabaseRealtime.ts   # Supabase channel subscriptions
│   │
│   ├── hooks/                        # Shared custom hooks
│   │   ├── useDebounce.ts            # Debounced value for search inputs
│   │   ├── useKeyboard.ts            # Keyboard visibility and height
│   │   ├── useNetwork.ts             # @react-native-community/netinfo wrapper
│   │   ├── useRefreshOnFocus.ts      # Refetch data when screen gains focus
│   │   ├── useCountdown.ts           # Timer countdown (OTP resend, session timeout)
│   │   ├── useImagePicker.ts         # react-native-image-picker wrapper
│   │   ├── useClipboard.ts           # @react-native-clipboard/clipboard wrapper
│   │   ├── usePermissions.ts         # react-native-permissions wrapper
│   │   └── useAppState.ts            # AppState foreground/background detection
│   │
│   ├── utils/                        # Pure utility functions
│   │   ├── formatters.ts             # Currency, date, phone, card number formatting
│   │   ├── validators.ts             # Validation with Zod schemas
│   │   ├── currency.ts               # Currency codes, symbols, conversion helpers
│   │   ├── date.ts                   # Date formatting, relative time ("2 hours ago")
│   │   ├── crypto.ts                 # Hashing, encryption helpers
│   │   ├── idempotency.ts            # UUID generation for idempotent API requests
│   │   ├── permissions.ts            # Permission request helpers
│   │   ├── platform.ts              # Platform-specific helpers (iOS vs Android)
│   │   └── logger.ts                 # Console wrapper with log levels (dev vs prod)
│   │
│   └── types/                        # Global TypeScript types
│       ├── global.d.ts               # Module declarations (images, env, SVG, etc.)
│       ├── navigation.ts             # All stack & tab param lists
│       ├── models.ts                 # User, Wallet, Transaction, Card (mirrors Prisma)
│       ├── api.ts                    # API request/response types
│       └── enums.ts                  # TransactionStatus, KYCLevel, CardStatus, etc.
│
├── supabase/                         # Supabase project files
│   ├── config.toml                   # Supabase local dev config
│   ├── seed.sql                      # Demo data for all tables
│   └── migrations/
│       ├── 00001_create_users.sql
│       ├── 00002_create_wallets.sql
│       ├── 00003_create_transactions.sql
│       ├── 00004_create_cards.sql
│       ├── 00005_create_beneficiaries.sql
│       ├── 00006_create_notifications.sql
│       ├── 00007_create_bills.sql
│       ├── 00008_create_kyc_documents.sql
│       ├── 00009_create_budgets.sql
│       ├── 00010_create_payment_requests.sql
│       └── 00011_row_level_security.sql
│
├── prisma/                           # Prisma ORM
│   ├── schema.prisma                 # Complete database schema
│   ├── seed.ts                       # TypeScript seed script with realistic demo data
│   └── migrations/                   # Generated Prisma migrations
│
├── server/                           # Optional Node.js backend (Premium tier)
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── src/
│   │   ├── index.ts                  # Express/Fastify entry point
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── wallet.routes.ts
│   │   │   ├── transfer.routes.ts
│   │   │   ├── card.routes.ts
│   │   │   ├── bill.routes.ts
│   │   │   ├── analytics.routes.ts
│   │   │   ├── kyc.routes.ts
│   │   │   ├── notification.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── wallet.controller.ts
│   │   │   ├── transfer.controller.ts
│   │   │   ├── card.controller.ts
│   │   │   ├── bill.controller.ts
│   │   │   ├── analytics.controller.ts
│   │   │   ├── kyc.controller.ts
│   │   │   ├── notification.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── wallet.service.ts
│   │   │   ├── transfer.service.ts
│   │   │   ├── fee.service.ts        # Fee calculation engine
│   │   │   ├── exchange.service.ts   # Exchange rate provider
│   │   │   ├── card.service.ts
│   │   │   ├── bill.service.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── kyc.service.ts
│   │   │   └── notification.service.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts     # JWT verification
│   │   │   ├── rateLimiter.ts        # Rate limiting per endpoint
│   │   │   ├── validator.ts          # Request body validation with Zod
│   │   │   └── errorHandler.ts       # Global error handler
│   │   ├── prisma/
│   │   │   └── client.ts             # Prisma client instance
│   │   ├── config/
│   │   │   └── env.ts                # Server environment variables
│   │   └── utils/
│   │       ├── idempotency.ts
│   │       └── logger.ts             # Winston/Pino logger
│   └── API.md
│
├── docs/
│   ├── DATABASE.md                   # Schema explanation, ERD, migration guide
│   ├── DEPLOYMENT.md                 # Deploy to Supabase + Railway + App Store / Play Store
│   ├── API.md                        # Endpoint reference
│   ├── screenshots/
│   │   ├── dashboard.png
│   │   ├── transfer.png
│   │   ├── cards.png
│   │   ├── analytics.png
│   │   └── kyc.png
│   └── diagrams/
│       ├── architecture.png
│       ├── data-flow.png
│       ├── navigation-map.png
│       └── erd.png
│
├── scripts/
│   ├── setup.sh                      # One-command project setup
│   ├── generate-types.ts             # Generate TS types from Prisma schema
│   ├── seed-demo.ts                  # Populate demo data
│   └── build-release.sh              # Build APK/AAB and IPA
│
├── fastlane/                         # Automated builds & deployment
│   ├── Fastfile                      # Lanes for iOS and Android
│   ├── Appfile                       # App identifiers
│   └── Matchfile                     # iOS code signing
│
└── .github/                          # CI/CD
    └── workflows/
        ├── lint.yml                  # PR lint + type check
        ├── test.yml                  # Unit + integration tests
        ├── build-android.yml         # Build & deploy Android
        └── build-ios.yml             # Build & deploy iOS
```

---

## CLI-Specific Config Files

### react-native.config.js
```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],  // Auto-links fonts to native projects
};
```

### metro.config.js
```javascript
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = withNativeWind(mergeConfig(defaultConfig, config), {
  input: './global.css',
});
```

### babel.config.js
```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',  // Must be last
  ],
};
```

### tsconfig.json — Path Aliases
```json
{
  "extends": "@react-native/typescript-config/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@features/*": ["src/features/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"],
      "@theme/*": ["src/theme/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@assets/*": ["assets/*"]
    }
  }
}
```

---

## Expo → CLI Library Swap Reference

| Feature              | Expo                          | React Native CLI                              |
|----------------------|-------------------------------|-----------------------------------------------|
| Biometrics           | expo-local-authentication     | react-native-biometrics                       |
| Secure Storage       | expo-secure-store             | react-native-keychain                         |
| Push Notifications   | expo-notifications            | @react-native-firebase/messaging + @notifee   |
| Image Picker         | expo-image-picker             | react-native-image-picker                     |
| Camera               | expo-camera                   | react-native-vision-camera                    |
| Font Loading         | expo-font                     | react-native.config.js assets linking         |
| SVG Support          | react-native-svg              | react-native-svg + react-native-svg-transformer |
| Environment Vars     | expo-constants                | react-native-config                           |
| Splash Screen        | expo-splash-screen            | react-native-splash-screen                    |
| Haptic Feedback      | expo-haptics                  | react-native-haptic-feedback                  |
| Clipboard            | expo-clipboard                | @react-native-clipboard/clipboard             |
| Network Info         | NetInfo (same)                | @react-native-community/netinfo               |
| Permissions          | expo-permissions              | react-native-permissions                      |
| Linear Gradient      | expo-linear-gradient          | react-native-linear-gradient                  |
| Blur View            | expo-blur                     | @react-native-community/blur                  |
| Device Info          | expo-device                   | react-native-device-info                      |
| App State            | React Native core (same)      | React Native core (same)                      |
| Linking / Deep Links | expo-linking                  | React Native Linking (core)                   |
| Maps                 | react-native-maps (same)      | react-native-maps (same)                      |
| Lottie               | lottie-react-native (same)    | lottie-react-native (same)                    |

---

## File Counts

| Module                | Screens | Components | Hooks | Services | Total Files |
|-----------------------|---------|------------|-------|----------|-------------|
| 01. Onboarding        | 4       | 3          | 0     | 0        | ~8          |
| 02. Auth              | 9       | 4          | 3     | 1        | ~20         |
| 03. KYC               | 6       | 4          | 1     | 2        | ~16         |
| 04. Dashboard         | 3       | 6          | 2     | 0        | ~14         |
| 05. Wallet            | 5       | 4          | 2     | 1        | ~14         |
| 06. Transfer          | 8       | 5          | 3     | 1        | ~20         |
| 07. Receive           | 4       | 3          | 1     | 1        | ~11         |
| 08. Cards             | 6       | 5          | 1     | 1        | ~15         |
| 09. Bills             | 5       | 4          | 1     | 1        | ~13         |
| 10. Analytics         | 3       | 5          | 2     | 1        | ~13         |
| 11. Profile           | 8       | 5          | 2     | 1        | ~19         |
| 12. Transactions      | 1       | 3          | 1     | 1        | ~8          |
| **Shared components** | —       | 30+        | 9     | 8        | ~50         |
| **Native (ios+android)** | —    | —          | —     | —        | ~20         |
| **Server (optional)** | —       | —          | —     | 9        | ~30         |
| **CI/CD + Fastlane**  | —       | —          | —     | —        | ~8          |
| **TOTAL**             | **62**  | **81**     | **28**| **27**   | **~280**    |
