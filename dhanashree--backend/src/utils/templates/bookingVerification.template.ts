export function getBookingVerificationTemplate(verifyUrl: string): string {
  return `
    <p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
      <p style="line-height: 2vh; text-align: center;">
        Thank you for booking a property with us. To confirm your booking, please click the button below:
      </p>
      <p style="text-align: center;">
        <a href="${verifyUrl}" style="cursor: pointer; text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 5px;">
          Verify Booking
        </a>
      </p>
      <p style="text-align: center;">
        This link will expire in 24 hours for security reasons.
      </p>
      
      <b>Note:</b>
      <p style="font-size: 14px;">
        If you did not make this booking, you can safely ignore this email.
      </p>
    </p>`
}
