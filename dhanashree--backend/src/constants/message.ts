import { admin } from "./admin"

export const Message = {
  passwordShouldStrong: {
    en: 'Use 8 or more characters with at least one uppercase letter, numbers & symbols',
    ne: '८ वा बढी क्यारेक्टरहरू प्रयोग गर्नुहोस्, कम्तीमा एउटा ठुलो अक्षर, अंक र चिन्ह सहित',
  },
  passwordShouldMatch: {
    en: 'Both password needs to be same',
    ne: 'दुवै पासवर्ड उस्तै हुनुपर्छ',
  },
  validPhoneNumber: {
    en: 'Phone number should be valid',
    ne: 'फोन नम्बर मान्य हुनुपर्छ',
  },
  notFound: {
    en: 'Not found',
    ne: 'फेला परेन',
  },
  updated: {
    en: 'Updated successfully',
    ne: 'सफलतापूर्वक अद्यावधिक गरियो',
  },
  created: {
    en: 'Created successfully',
    ne: 'सफलतापूर्वक सिर्जना गरियो',
  },
  deleted: {
    en: 'Deleted successfully',
    ne: 'सफलतापूर्वक हटाइयो',
  },
  invalidCredentials: {
    en: 'Invalid credentials',
    ne: 'अवैध प्रमाणहरू',
  },
  loginSuccessfully: {
    en: 'Login successfully',
    ne: 'लगइन सफल भयो',
  },
  logoutSuccessfully: {
    en: 'Logout successfully',
    ne: 'लगआउट सफल भयो',
  },
  refresh: {
    en: 'Refresh successfully',
    ne: 'सफलतापूर्वक रिफ्रेश गरियो',
  },
  adminRefresh: {
    en: 'Admin refresh successfully',
    ne: 'एडमिन रिफ्रेश सफल भयो',
  },
  invalidOTP: {
    en: 'Invalid OTP',
    ne: 'अवैध OTP',
  },
  OTPExpired: {
    en: 'OTP has expired',
    ne: 'OTP म्याद सकिएको छ',
  },
  accountVerified: {
    en: 'Account verified successfully',
    ne: 'खाता सफलतापूर्वक प्रमाणित भयो',
  },
  accountAlreadyVerified: {
    en: 'Account already verified',
    ne: 'खाता पहिले नै प्रमाणित गरिएको छ',
  },
  accountNotVerified: {
    en: 'Account not verified',
    ne: 'खाता प्रमाणित गरिएको छैन',
  },
  invalidOldPassword: {
    en: 'Invalid old password',
    ne: 'अवैध पुरानो पासवर्ड',
  },
  checkYourEmailForOTP: {
    en: 'Please check your email for OTP',
    ne: 'कृपया आफ्नो ईमेलमा OTP जाँच गर्नुहोस्',
  },
  passwordReset: {
    en: 'Your password reset successfully',
    ne: 'तपाईंको पासवर्ड सफलतापूर्वक रिसेट गरियो',
  },
  server: {
    en: 'Internal Server Error',
    ne: 'आन्तरिक सर्भर त्रुटि',
  },
  unAuthorized: {
    en: 'You are not authorized to perform this action',
    ne: 'यो कार्य गर्न तपाईंलाई अनुमति छैन',
  },
  mediaUploaded: {
    en: 'Media Uploaded Successfully',
    ne: 'मिडिया सफलतापूर्वक अपलोड गरियो',
  },
  welcomeMessage: {
    en: 'Welcome to the auth server',
    ne: 'प्रमाणीकरण सर्भरमा स्वागत छ',
  },
  emailOrPassword: {
    en: 'Email or Password does not match',
    ne: 'ईमेल वा पासवर्ड मिलेन',
  },
  notAuthorized: {
    en: 'You are not authorized to access this resource',
    ne: 'यो स्रोतमा पहुँच गर्न तपाईंलाई अनुमति छैन',
  },
  tokenExpire: {
    en: 'Token expired',
    ne: 'टोकन म्याद सकिएको छ',
  },
  emailSent: {
    en: 'Email sent successfully',
    ne: 'ईमेल सफलतापूर्वक पठाइयो',
  },
  fetched: {
    en: 'Fetched successfully',
    ne: 'सफलतापूर्वक ल्याइयो',
  },
  badRequest: {
    en: 'Bad request',
    ne: 'खराब अनुरोध',
  },
  bookingAlreadyVerified: {
    en: 'Booking already verified',
    ne: 'बुकिंग पहिले नै प्रमाणित गरिएको छ',
  },
  bookingEmailLimitReached: {
    en: 'You’ve reached the resend limit for today.',
    ne: 'तपाईंले आजको लागि पुन: पठाउने सीमा पुग्नुभएको छ।',
  },
  bookingNotFound: {
    en: 'Booking not found',
    ne: 'बुकिंग फेला परेन',
  },
  requestAlreadyExists: {
    en: 'Request already exists',
    ne: 'अनुरोध पहिले नै अवस्थित छ',
  },
  requestAlreadyVerified: {
    en: 'Request already verified',
    ne: 'अनुरोध पहिले नै प्रमाणित गरिएको छ',
  },
  requestEmailLimitReached: {
    en: 'You’ve reached the resend limit for today.',
    ne: 'तपाईंले आजको लागि पुन: पठाउने सीमा पुग्नुभएको छ।',
  },
  requestNotFound: {
    en: 'Request not found',
    ne: 'अनुरोध फेला परेन',
  },
  requestVerificationEmailSent: {
    en: 'Request verification email sent',
    ne: 'अनुरोध प्रमाणीकरण ईमेल पठाइयो',
  },
  invalidImageIds: {
    en: 'Invalid image IDs provided',
    ne: 'प्रदान गरिएका छवि ID अवैध छन्',
  },
  canNotDeleteThumbnail: {
    en: 'You cannot delete the thumbnail image',
    ne: 'तपाईं थम्बनेल छवि मेटाउन सक्नुहुन्न',
  },
  atLeastThreeNormalImages: {
    en: 'At least 3 normal images must remain after update',
    ne: 'अद्यावधिक पछि कम्तीमा ३ सामान्य छविहरू रहनु पर्छ',
  },
  propertyCodeAlreadyExists: {
    en: 'Property code already exists',
    ne: 'सम्पत्ति कोड पहिले नै अवस्थित छ',
  },
  invalidToken: {
    en: 'Invalid token',
    ne: 'अवैध टोकन',
  },
  invalidFileType: {
    en: 'Only JPEG, PNG, and JPG files are allowed',
    ne: 'केवल JPEG, PNG, र JPG फाइलहरू अनुमति छन्',
  },
  noFileUploaded: {
    en: 'No file uploaded',
    ne: 'कुनै फाइल अपलोड गरिएको छैन',
  },
}

export const getNotFoundMessage = (en: string, ne: string) => {
  return {
    en: `${en} not found`,
    ne: `${ne} फेला परेन`,
  }
}
