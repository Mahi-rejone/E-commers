"use client";
import { BikeIcon, UserIcon ,LockIcon,MailIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with image and text */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <Image
          className="absolute inset-0 object-cover w-full h-full object-center opacity-10"
          src="/assets/hero_bg.jpeg"
          alt="Login Image"
          fill
          priority
          sizes="50vw"
        />
        <div className="relative text-center px-12">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Welcome Back to Insacart!
          </h2>
          <p className=" text-white/60 font-serif text-xl max-w-sm mx-auto">
            Fresh groceries & organic produce delivered to your doorstep.
          </p>
        </div>
      </div>

      {/*Right side with form */}
      <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <BikeIcon className="text-app-green" size={32} />
              <span className="text-2xl font-medium text-app-green">
                Insacart
              </span>
            </Link>
            <h1 className="text-2xl font-semibold text-app-green mb-2">
              {isLoginState
                ? "Sign in to your account"
                : "Create a new account"}
            </h1>
            <p className="text-app-green/80">
              {isLoginState
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className="text-orange-500 ml-1 font-semibold hover:underline text-orange-600 transition-colors duration-200"
                onClick={() => setIsLoginState(!isLoginState)}
              >
                {isLoginState ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginState && (
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-app-green flex flex-col gap-1"
                >
                  Name
                  <div className="relative">
                    <UserIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-text-light"
                      size={20}
                    />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your full name"
                      className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-green"
                    />
                  </div>
                </label>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-app-green mb-1"
              >
                Email
                <div className="relative">
                  <MailIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-text-light"
                    size={20}
                  />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-green"
                  />
                </div>
              </label>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-app-green mb-1"
              >
                Password
                <div className="relative">
                  <LockIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-text-light"
                    size={20}
                  />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-green"
                  />
                </div>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-app-green text-white py-2 px-4 rounded-md hover:bg-app-green/80 focus:outline-none focus:ring-2 focus:ring-app-green disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : isLoginState
                  ? "Sign In"
                  : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
