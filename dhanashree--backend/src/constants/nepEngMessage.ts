export const Message = {
  passwordShouldStrong: 'Use 8 or more characters with at least one uppercase letter, numbers & symbols',
  passwordShouldMatch: 'Both password needs to be same',
  validPhoneNumber: 'Phone number should be valid',
  notFound: 'Not found',
  updated: 'Updated successfully',
  invalidCredentials: 'Invalid credentials',
  emailOrPhoneAlreadyInUse: 'Email or phone already in use',
  loginSuccessfully: 'Login successfully',
  logoutSuccessfully: 'Logout successfully',
  refresh: ' Refresh Successfully',
  adminRefresh: 'admin refresh Successfully',
  invalidOTP: 'Invalid OTP',
  OTPExpired: 'OTP has expired',
  accountVerified: 'Account verified successfully',
  accountAlreadyVerified: 'Account already verified',
  accountNotVerified: 'Account not verified',
  invalidOldPassword: 'Invalid old password',
  checkYourEmailForOTP: 'Please check your email for OTP',
  passwordReset: 'Your password reset successfully',
 server: {
    en: 'Internal Server Error',
    ne: 'आन्तरिक सर्भर त्रुटि',
  },
  unAuthorized: 'You are not authorized to perform this action',
  mediaUploaded: 'Media Uploaded Successfully',
  welcomeMessage: 'welcome in auth server',
  emailOrPassword: 'Email or Password not match',
  NOT_AUTHORIZED_MESSAGE: 'You are not authorized to access this resources',
  tokenExpire: 'Token Expire',
  emailSent: 'Email sent successfully',
  fetched: 'Fetched successfully',
  created: 'Created successfully',
  deleted: 'Deleted successfully',
}

export const alreadyExist = (en: string, ne: string) => {
  return {
    en: `${en} already exist`,
    ne: `${ne} पहिले नै अवस्थित छ`,
  }
}

export const deletedMessage = (en: string, ne: string) => {
  return {
    en: `${en} deleted successfully`,
    ne: `${ne} सफलतापूर्वक हटाइयो`,
  }
}
export const UpdatedMessage = (en: string, ne: string) => {
  return {
    en: `${en} updated successfully`,
    ne: `${ne} ससफलतापूर्वक अइडेट गरियो`,
  }
}
export const CreatedMessage = (en: string, ne: string) => {
  return {
    en: `${en} updated successfully`,
    ne: `${ne} सफलतापूर्वक सिर्जना गरियो`,
  }
}