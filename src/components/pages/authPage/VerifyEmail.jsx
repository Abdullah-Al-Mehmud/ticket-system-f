import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Mail, CheckCircle, XCircle, Loader2, ArrowLeft } from "lucide-react";
import { useVerifyEmailMutation } from "../../../store/features/auth/AuthApiSlice";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const { token } = useParams();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail(token).unwrap();
        setStatus("success");
        setMessage(response.message || "Email verified successfully!");
      } catch (error) {
        setStatus("error");
        setMessage(
          error?.data?.message ||
            error?.data?.error ||
            "Verification failed. Please try again."
        );
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [token, verifyEmail]);

  const renderContent = () => {
    if (isLoading || status === "loading") {
      return (
        <div className="text-center">
          <Loader2 className="w-16 h-16 mx-auto mb-6 text-amber-600 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Verifying your email...
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your email address.
          </p>
        </div>
      );
    }

    if (status === "success") {
      return (
        <div className="text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Email Verified!
          </h2>
          <p className="text-gray-600 mb-8">{message}</p>
          <Button
            asChild
            className="bg-amber-600 hover:bg-amber-700 text-white px-8">
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center">
        <XCircle className="w-16 h-16 mx-auto mb-6 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Verification Failed
        </h2>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="outline"
            className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8">
            <Link to="/resend-verification">Resend Verification Email</Link>
          </Button>
          <Button
            asChild
            className="bg-amber-600 hover:bg-amber-700 text-white px-8">
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          {renderContent()}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;