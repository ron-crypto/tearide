import * as yup from 'yup';

// Email validation
export const emailSchema = yup.string()
  .email('Invalid email address')
  .required('Email is required');

// Password validation
export const passwordSchema = yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');

// Phone number validation (Kenyan format)
export const phoneSchema = yup.string()
  .matches(/^(\+254|0)[0-9]{9}$/, 'Invalid phone number format')
  .required('Phone number is required');

// Name validation
export const nameSchema = yup.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .required('Name is required');

// Login form validation
export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

// Registration form validation
export const registerSchema = yup.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.string()
    .oneOf(['passenger', 'driver'], 'Invalid role')
    .required('Role is required'),
});

// Forgot password validation
export const forgotPasswordSchema = yup.object({
  email: emailSchema,
});

// Reset password validation
export const resetPasswordSchema = yup.object({
  token: yup.string().required('Reset token is required'),
  newPassword: passwordSchema,
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Profile update validation
export const profileUpdateSchema = yup.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
});

// Change password validation
export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Ride request validation
export const rideRequestSchema = yup.object({
  pickup: yup.string().required('Pickup location is required'),
  destination: yup.string().required('Destination is required'),
  rideType: yup.string()
    .oneOf(['standard', 'comfort', 'premium'], 'Invalid ride type')
    .required('Ride type is required'),
});

// Payment validation
export const paymentSchema = yup.object({
  amount: yup.number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  method: yup.string()
    .oneOf(['mpesa', 'cash', 'card'], 'Invalid payment method')
    .required('Payment method is required'),
  phoneNumber: yup.string().when('method', {
    is: 'mpesa',
    then: phoneSchema,
    otherwise: yup.string(),
  }),
});

// Location validation
export const locationSchema = yup.object({
  latitude: yup.number()
    .min(-90, 'Invalid latitude')
    .max(90, 'Invalid latitude')
    .required('Latitude is required'),
  longitude: yup.number()
    .min(-180, 'Invalid longitude')
    .max(180, 'Invalid longitude')
    .required('Longitude is required'),
});

// Rating validation
export const ratingSchema = yup.object({
  rating: yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  comment: yup.string().max(500, 'Comment must be less than 500 characters'),
});

// Support ticket validation
export const supportTicketSchema = yup.object({
  subject: yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .required('Subject is required'),
  description: yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .required('Description is required'),
  priority: yup.string()
    .oneOf(['low', 'medium', 'high', 'urgent'], 'Invalid priority')
    .required('Priority is required'),
  category: yup.string().required('Category is required'),
});

