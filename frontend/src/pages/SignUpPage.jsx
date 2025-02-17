import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* left side*/}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo*/}
          <div className="mb-8 text-center" >
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex items-center justify-center transition-colors size12 rounded-x1 bg-primary/10 group-hover:bg-primary/20">
                <MessageSquare className="size-6 text-primary" />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* fullName */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-meduim">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e => setFormData({ ...formData, fullName: e.target.value }))}
                />
              </div>
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-meduim">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e => setFormData({ ...formData, email: e.target.value }))}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-meduim">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e => setFormData({ ...formData, password: e.target.value }))}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="w-full btn btn-primary" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}

            </button>
          </form>

          {/* Have account? */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have account? {" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side*/}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />


    </div>
  )
}

export default SignUpPage