import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../types/navigation';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import { getResponsivePadding, isSmallScreen } from '../../utils/responsive';

const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  role: yup.string().oneOf(['passenger', 'driver']).required('Role is required'),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'passenger',
    },
    mode: 'onChange',
  });

  const selectedRole = watch('role');

  // Reset form when component mounts to ensure clean state
  useEffect(() => {
    reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'passenger',
    });
  }, [reset]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      });
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again.');
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRoleChange = (role: 'passenger' | 'driver') => {
    setValue('role', role);
  };

  return (
    <SafeAreaView style={styles.container} key="register-screen">
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={true}
          alwaysBounceVertical={false}
          overScrollMode="auto"
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join TeaRide today</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.roleSelector}>
            <Button
              title="Passenger"
              onPress={() => handleRoleChange('passenger')}
              variant={selectedRole === 'passenger' ? 'primary' : 'outline'}
              style={styles.roleButton}
            />
            <Button
              title="Driver"
              onPress={() => handleRoleChange('driver')}
              variant={selectedRole === 'driver' ? 'primary' : 'outline'}
              style={styles.roleButton}
            />
          </View>

          <View style={styles.nameRow}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  key="firstName-input"
                  label="First Name"
                  placeholder="First name"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.firstName?.message}
                  style={styles.halfInput}
                  wrapperStyle={styles.halfInputWrapper}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  key="lastName-input"
                  label="Last Name"
                  placeholder="Last name"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.lastName?.message}
                  style={styles.halfInput}
                  wrapperStyle={styles.halfInputWrapper}
                />
              )}
            />
          </View>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                key="email-input"
                label="Email"
                placeholder="Enter your email"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                key="phone-input"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.phone?.message}
                keyboardType="phone-pad"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                key="password-input"
                label="Password"
                placeholder="Create a password"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? 'eye-off' : 'eye'}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                key="confirmPassword-input"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
                secureTextEntry={!showConfirmPassword}
                rightIcon={showConfirmPassword ? 'eye-off' : 'eye'}
                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          />

          <Button
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.registerButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Already have an account? Sign In"
            onPress={handleLogin}
            variant="text"
            style={styles.loginButton}
          />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: getResponsivePadding(spacing.lg),
    paddingTop: getResponsivePadding(spacing.xl),
    paddingBottom: getResponsivePadding(spacing.xl * 3), // Extra bottom padding for small screens
    minHeight: '100%', // Ensure content takes full height
    flexGrow: 1, // Allow content to grow beyond screen height
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.darkColor,
    marginBottom: spacing.sm,
    ...typography.heading1,
  },
  subtitle: {
    color: colors.gray,
    ...typography.body,
  },
  form: {
    // Remove flex: 1 to allow natural content sizing
  },
  roleSelector: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  roleButton: {
    flex: 1,
  },
  nameRow: {
    flexDirection: isSmallScreen() ? 'column' : 'row', // Stack vertically on small screens
    gap: spacing.sm,
    marginBottom: spacing.md,
    flexWrap: 'wrap', // Allow wrapping on very small screens
  },
  halfInput: {
    flex: 1,
    minWidth: 120, // Minimum width to prevent too small inputs
  },
  halfInputWrapper: {
    flex: 1,
    marginBottom: 0, // Override the default margin from Input component
    minWidth: 120, // Minimum width for wrapper
  },
  registerButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightGray,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.gray,
    ...typography.caption,
  },
  loginButton: {
    marginTop: spacing.md,
  },
});

export default RegisterScreen;

