# TeaRide Mobile App

A React Native mobile application for the TeaRide ride-sharing platform, built with Expo and TypeScript.

## Features

- **Authentication**: Secure login/register with JWT tokens
- **Real-time Tracking**: Live driver and ride tracking
- **Payment Integration**: M-Pesa payment processing
- **Push Notifications**: Real-time ride updates
- **Offline Support**: Queue requests when offline
- **Maps Integration**: Google Maps with custom markers
- **Multi-role Support**: Passenger and Driver interfaces

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: React Context + Hooks
- **Maps**: React Native Maps
- **HTTP Client**: Axios
- **Forms**: React Hook Form with Yup validation
- **Storage**: Expo SecureStore

## Project Structure

```
src/
├── navigation/          # Navigation configuration
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── passenger/      # Passenger-specific screens
│   ├── driver/         # Driver-specific screens
│   └── shared/         # Shared screens
├── components/         # Reusable components
│   ├── common/         # Common UI components
│   ├── maps/           # Map-related components
│   ├── ride/           # Ride-specific components
│   └── payment/        # Payment components
├── api/                # API layer
├── context/            # React Context providers
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # TypeScript definitions
├── styles/             # Styling system
└── assets/             # Images, icons, fonts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (for development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp env.example .env
   ```

4. Configure your environment variables in `.env`

5. Start the development server:
   ```bash
   npm start
   ```

### Environment Variables

See `env.example` for required environment variables:

- `API_BASE_URL`: Backend API URL
- `GOOGLE_MAPS_API_KEY`: Google Maps API key
- `MPESA_*`: M-Pesa payment configuration
- `EXPO_PUSH_TOKEN`: Push notification token

## Development

### Running on Device

- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web**: `npm run web`

### Building for Production

- **Android**: `npm run build:android`
- **iOS**: `npm run build:ios`

## Architecture

### Navigation

- **AppNavigator**: Root navigation logic
- **AuthNavigator**: Authentication flow
- **MainNavigator**: Main app tabs (Passenger/Driver)

### State Management

- **AuthContext**: User authentication state
- **LocationContext**: User location tracking
- **RideContext**: Active ride state

### API Layer

- Centralized API client with interceptors
- Type-safe endpoints with TypeScript
- Automatic token refresh
- Offline request queueing

## Contributing

1. Follow TypeScript best practices
2. Use the established component patterns
3. Add proper error handling
4. Include TypeScript types for new features
5. Test on both iOS and Android

## License

Private - TeaRide Platform

