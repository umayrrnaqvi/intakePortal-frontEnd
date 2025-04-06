
import Link from "next/link";
import { CheckCircle } from "lucide-react";

import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 px-4 text-center">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Form Submitted!</h1>
      <p className="text-gray-700 mb-6">
        Thank you! Your form is already submitted.
      </p>
    </div>
  )
}

export default page