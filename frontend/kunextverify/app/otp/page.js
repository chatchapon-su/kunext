'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Verifypage() {

  const BASE_URL = 'https://yourdomainname'
  const router = useRouter()

  const [otp, setOtp] = useState('')
  const [setpassword, setSetPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [stdcode, setStdCode] = useState(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setStdCode(searchParams.get('verifystdcode'))
  }, [])

  const verifyOtp = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(`${BASE_URL}/otpverify`, {
        std_code: stdcode,
        std_otp: otp
      })

      setIsModalOpen(true)
      Swal.fire({
        icon: 'success',
        title: 'OTP verified successfully',
        confirmButtonText: 'OK'
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid OTP or something went wrong',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const resetPassword = async (event) => {
    event.preventDefault()

    if (!setpassword || !confirmpassword || setpassword !== confirmpassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match or are empty',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return
    }

    try {
      const userdatapassword = {
        std_code: stdcode,
        std_password: setpassword
      }
      const response = await axios.post(`${BASE_URL}/confirmpasswordotp`, userdatapassword)

      Swal.fire({
        icon: 'success',
        title: 'Password reset successfully',
        confirmButtonText: 'OK'
      })
      router.push('https://yourdomainname/')
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while resetting the password',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
    <div className="grid min-h-screen bg-white py-10 lg:px-8">
      {!isModalOpen && (
        <div className="mx-auto p-5 bg-white">
          <div className="mx-auto w-full p-5 mb-5">
            <div className="w-full mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-white dark:border-gray-200">
              <form onSubmit={verifyOtp} className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900">กรอก OTP เพื่อยืนยัน</h5>
                <h5 className="text-md font-medium text-gray-900">รหัสนิสิตของคุณคือ {stdcode}</h5>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="กรอก OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  ยืนยัน OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="w-full mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-white dark:border-gray-200 mt-6">
          <form onSubmit={resetPassword} className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900">ตั้งรหัสผ่านใหม่</h5>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="รหัสผ่าน"
                value={setpassword}
                onChange={(e) => setSetPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="ยืนยันรหัสผ่าน"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              ตั้งรหัสผ่านใหม่
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
