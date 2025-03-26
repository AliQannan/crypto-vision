"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bitcoin, Activity, AlertCircle, BarChart, Wallet, TrendingUp, Star } from "lucide-react";
import PricingSection from "@/components/Plan";

interface Feature {
  icon: React.ReactNode ;

  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
}

const Home: React.FC = () => {
  const features: Feature[] = [
    { icon: <Activity />, title: "Live Market Tracking", description: "Real-time cryptocurrency price monitoring across exchanges" },
    { icon: <TrendingUp />, title: "AI Price Predictions", description: "Machine learning models forecasting market trends" },
    { icon: <AlertCircle />, title: "Risk Alerts", description: "Instant notifications for market volatility and anomalies" },
    { icon: <BarChart />, title: "Technical Analysis", description: "Advanced indicators including RSI, MACD, and Bollinger Bands" },
  ];

  const pricing: PricingPlan[] = [
       {
        name: "Free",
        price: "0",
        features: ["10 coin tracking", "3 price alerts", "live marketing", "Email support (low) "],
       }, 
    {
      name: "Basic",
      price: "9.99",
      features: ["50 coin tracking", "120 price alerts", "live marketing", "1 API key "  , "Email support(high)"],
    },
    {
      name: "Professional",
      price: "50.99",
      features: ["150 coin tracking", "1000 price alerts" , "3 api access",  "AI predictions", "Real-time alerts", "Priority support"],
    },
    {
      name: "Enterprise",
      price: "99.9",
      features: ["Unlimited coins", "API access", "AI predictions ",
"Real-time alerts",
  "Dedicated support" , "Copy Trading"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-32 pb-24 text-center max-w-4xl mx-auto px-4"
      >
        <h1 className="text-5xl font-bold mb-6 text-white">
          Next-Gen
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"> Crypto Intelligence</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Advanced AI-powered cryptocurrency analysis and market forecasting platform
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="crypto-vision/marketing">
          
          <button className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700">Start Tracking Now</button>
          </Link>
          <Link href="#">
            <button className="border border-purple-500 text-purple-500 px-8 py-4 rounded-full text-lg hover:bg-purple-900/20">
              Live Market Demo
            </button>
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Market Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-6 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 transition-all"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-900">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-16 text-white">Premium Plans</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {pricing.map((plan, index) => (
        <div key={index} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
          <div className="text-4xl font-bold mb-6 text-purple-400">
            ${plan.price}
            <span className="text-lg text-gray-400">/month</span>
          </div>
          <ul className="space-y-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300">
                <Wallet className="text-green-400 w-5 h-5" />
                <span className="capitalize">{feature}</span>
                {feature.toLowerCase().includes("copy trading") && (
                  <Star  className="text-yellow-400 w-5 h-5" />
                )}
              </li>
            ))}
          </ul>
          <button className="w-full mt-8 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
            Get Started
          </button>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bitcoin className="text-purple-400 w-8 h-8" />
              <span className="text-xl font-bold">CryptoVision</span>
            </div>
            <p className="text-gray-400">AI-powered cryptocurrency market intelligence platform</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Market</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/market" className="hover:text-white">Live Prices</Link></li>
              <li><Link href="/analysis" className="hover:text-white">Market Analysis</Link></li>
              <li><Link href="/predictions" className="hover:text-white">AI Forecasts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/api" className="hover:text-white">API Documentation</Link></li>
              <li><Link href="/blog" className="hover:text-white">Market Insights</Link></li>
              <li><Link href="/security" className="hover:text-white">Security Audit</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Wallet className="w-5 h-5" /> support@cryptovision.ai
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> 24/7 Emergency Support
              </li>
            </ul>
          </div>
        </div>
      </footer>
   
    </div>
  );
};

export default Home;
