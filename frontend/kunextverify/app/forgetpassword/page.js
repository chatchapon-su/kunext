'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'

export default function Verifypage() {
  const BASE_URL = 'https://yourdomainname';
  const [stdCode, setStdCode] = useState('');

  const router = useRouter();

  const requestOTP = async (e) => {
    e.preventDefault();

    if (!stdCode) {
      Swal.fire('Error', 'Please enter your Student Code.', 'error');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/request-otp`, {
        std_code: stdCode,
      });

        Swal.fire('Success', 'OTP sent successfully!', 'success');
        router.push(`/otp?verifystdcode=${stdCode}`);
    } catch (error) {
      Swal.fire('Error', error.message || 'An error occurred.', 'error');
    }
  };

  return (
    <div className="grid min-h-screen bg-white py-10 lg:px-8">
      <div className="mx-auto p-5 bg-white">
        <div className="mx-auto w-full p-5 mb-5">
          <div className="w-full mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form onSubmit={requestOTP} className="space-y-6">
              <h5 className="text-xl font-medium text-gray-900">Request OTP</h5>

              <div>
                <label
                  htmlFor="std_code"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Student Code
                </label>
                <input
                  onChange={(e) => setStdCode(e.target.value)}
                  type="text"
                  name="std_code"
                  id="std_code"
                  value={stdCode}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter your Student Code"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Request OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
