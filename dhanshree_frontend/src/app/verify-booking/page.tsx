'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppDispatch, RootState } from '@/store/store';
import { verifyBooking } from '@/store/slices/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  Loader2, ArrowRight } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyBookingPage() {

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

    const dispatch = useDispatch<AppDispatch>();

  const { isLoading, isVerified, error, data } = useSelector((state: RootState) => state.booking);
  
  useEffect(() => {
    if (token) {
      dispatch(verifyBooking(token));
    }
    console.log("data is", data);
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4">Booking Verification</h1>

      {isLoading && (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <p className="text-gray-600">Verifying your booking...</p>
        </div>
      )}

      {data?.success && (
        <div className="flex flex-col items-center gap-4">
        <p className="text-green-600 text-lg font-medium">✅ Booking verified successfully!</p>
        <Link href="/" >
        <Button className="bg-green-600 text-white">Go to Home Page <ArrowRight className="w-4 h-4" /></Button>
        </Link>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-lg font-medium">❌ Error: {error}</p>
      )}
    </div>
  </div>
  );
}
