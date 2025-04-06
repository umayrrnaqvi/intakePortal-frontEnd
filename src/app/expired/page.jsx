import Link from "next/link";
import { XCircle } from "lucide-react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 px-4 text-center">
      <XCircle className="text-red-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Link Expired</h1>
      <p className="text-gray-700 mb-6">
        Sorry, this link has expired or is no longer valid.
      </p>

    </div>
  )
}

export default page