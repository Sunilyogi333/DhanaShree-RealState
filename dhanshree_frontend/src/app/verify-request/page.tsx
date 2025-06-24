'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppDispatch, RootState } from '@/store/store';
import { verifyRequest } from '@/store/slices/requestSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2, ArrowRight, CheckCircle, XCircle } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyRequestPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isVerified, error, data } = useSelector((state: RootState) => state.request);
  
  useEffect(() => {
    if (token) {
      dispatch(verifyRequest(token));
    }
    console.log("Request verification data:", data);
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">Request Verification</h1>

        {isLoading && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-gray-600">Verifying your request...</p>
          </div>
        )}

        {data?.success && !isLoading && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-green-600">Request Verified Successfully!</h2>
              <p className="text-gray-600">
                Thank you for your request. Our team will contact you within 24 hours.
              </p>
            </div>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                Go to Home Page 
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-red-600">Verification Failed</h2>
              <p className="text-gray-600">{error}</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="px-6 py-2">
                Go to Home Page
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {!token && !isLoading && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <XCircle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-yellow-600">Invalid Link</h2>
              <p className="text-gray-600">
                The verification link is invalid or missing. Please check your email again.
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="px-6 py-2">
                Go to Home Page
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}