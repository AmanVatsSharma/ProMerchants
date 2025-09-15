// import { AuthHeader } from "@/components/auth/AuthHeader";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-green-800">
//       <Card>
//         <CardHeader>
//           <AuthHeader label="Hi! There" />
//         </CardHeader>
//         <CardContent>
//           <Link href={'/auth/login'}>
//           <Button>
//             Go to Login
//           </Button>
//           </Link>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client"

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRocket, FaChartLine, FaLock, FaMagic, FaGlobe, FaHeadset, FaCheck, FaArrowRight, FaStar, FaUsers, FaShieldAlt, FaCog, FaDatabase, FaCloud, FaMobile, FaCreditCard, FaClock, FaAward, FaChartBar } from 'react-icons/fa'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Header from '@/components/main/Header'
import Link from 'next/link'

const FeatureCard = ({ icon, title, description, techSpec }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
        <CardHeader className="pb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">{description}</p>
          {techSpec && (
            <div className="pt-3 border-t border-gray-100">
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Tech Stack</div>
              <div className="text-sm text-gray-500 font-mono">{techSpec}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

const PricingCard = ({ plan, price, originalPrice, features, isPopular, ctaText, description }: { 
  isPopular: boolean, 
  features: string[], 
  plan: string, 
  price: number,
  originalPrice?: number,
  ctaText: string,
  description: string
}) => (
  <Card className={`h-full relative ${isPopular ? 'border-green-500 border-2 shadow-xl scale-105' : 'border-gray-200 shadow-lg'} transition-all duration-300 hover:shadow-xl`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <Badge className="bg-green-600 text-white px-4 py-1 text-sm font-semibold">
          {ctaText}
        </Badge>
      </div>
    )}
    <CardHeader className="text-center pb-6">
      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan}</CardTitle>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-4xl font-bold text-gray-900">${price}</span>
        <span className="text-gray-600">/month</span>
      </div>
      {originalPrice && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg text-gray-400 line-through">${originalPrice}</span>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            Save ${originalPrice - price}
          </Badge>
        </div>
      )}
    </CardHeader>
    <CardContent className="px-6">
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <FaCheck className="text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter className="px-6 pb-6">
      <Link href={'/auth/register'} className="w-full">
        <Button className={`w-full ${isPopular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'} text-white font-semibold py-3 rounded-lg transition-all duration-300`}>
          {ctaText}
        </Button>
      </Link>
    </CardFooter>
  </Card>
)

const TestimonialCard = ({ name, company, quote, metrics, avatar, rating }) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
    <CardContent className="p-6">
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-gray-700 mb-6 leading-relaxed">"{quote}"</p>
      
      {/* Metrics */}
      {metrics && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Results</div>
          <div className="text-sm text-green-800 font-medium">{metrics}</div>
        </div>
      )}
      
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-700 font-semibold text-sm">{avatar}</span>
        </div>
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{company}</div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const HomePage = () => {
  const heroControls = useAnimation()
  const [heroRef, heroInView] = useInView()

  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible')
    }
  }, [heroControls, heroInView])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          animate={heroControls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
          transition={{ duration: 0.5 }}
          className="relative py-24 text-center overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          
          <div className="relative z-10">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 mb-8 shadow-sm"
            >
              <FaAward className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ businesses</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-600 to-blue-600 bg-clip-text text-transparent leading-tight"
            >
              Scale Your Business
              <br />
              <span className="text-green-600">10x Faster</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600 leading-relaxed"
            >
              The only e-commerce platform that combines <span className="font-semibold text-gray-800">AI-powered automation</span>, 
              <span className="font-semibold text-gray-800"> enterprise-grade security</span>, and 
              <span className="font-semibold text-gray-800"> lightning-fast performance</span> to maximize your revenue.
            </motion.p>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mb-10"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">2.3s</div>
                <div className="text-sm text-gray-600">Avg Load Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">47%</div>
                <div className="text-sm text-gray-600">Conversion Boost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Expert Support</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
            >
              <Link href={'/auth/register'}>
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Start Free Trial
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-green-600 hover:text-green-600 px-8 py-4 rounded-full text-lg font-semibold">
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-600" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12"
            >
              <p className="text-sm text-gray-500 mb-4">Join thousands of successful businesses</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="text-2xl font-bold text-gray-400">Shopify</div>
                <div className="text-2xl font-bold text-gray-400">WooCommerce</div>
                <div className="text-2xl font-bold text-gray-400">Magento</div>
                <div className="text-2xl font-bold text-gray-400">BigCommerce</div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-green-50 border-green-200 text-green-700">
                <FaStar className="mr-2" />
                Enterprise-Grade Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Built for Scale & Performance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every feature is engineered to maximize your revenue, minimize your costs, and accelerate your growth.
              </p>
            </div>

            {/* Primary Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <FeatureCard
                icon={<FaRocket className="text-3xl text-green-600" />}
                title="Sub-Second Load Times"
                description="Edge computing + CDN optimization delivers 2.3s average load times. 40% faster than competitors means 23% higher conversion rates."
                techSpec="Next.js 14, Edge Runtime, Redis Cache"
              />
              <FeatureCard
                icon={<FaChartLine className="text-3xl text-green-600" />}
                title="AI Revenue Intelligence"
                description="Machine learning algorithms analyze 50+ data points to predict customer behavior, optimize pricing, and boost revenue by up to 47%."
                techSpec="TensorFlow.js, Real-time Analytics, Custom ML Models"
              />
              <FeatureCard
                icon={<FaShieldAlt className="text-3xl text-green-600" />}
                title="Military-Grade Security"
                description="SOC 2 Type II certified with end-to-end encryption, fraud detection, and automated threat monitoring. Zero security breaches in 5 years."
                techSpec="AES-256, PCI DSS, OWASP Top 10 Protection"
              />
              <FeatureCard
                icon={<FaMagic className="text-3xl text-green-600" />}
                title="Dynamic Personalization"
                description="Real-time product recommendations, dynamic pricing, and personalized checkout flows increase average order value by 34%."
                techSpec="GPT-4 Integration, Behavioral Analytics, A/B Testing"
              />
              <FeatureCard
                icon={<FaCloud className="text-3xl text-green-600" />}
                title="Global Infrastructure"
                description="99.9% uptime SLA across 200+ data centers worldwide. Auto-scaling handles traffic spikes without performance degradation."
                techSpec="AWS Global, Kubernetes, Auto-scaling"
              />
              <FeatureCard
                icon={<FaCog className="text-3xl text-green-600" />}
                title="Developer-First API"
                description="RESTful & GraphQL APIs with comprehensive webhooks. Integrate with 500+ tools in minutes, not months."
                techSpec="GraphQL, REST API, Webhook System"
              />
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Technical Excellence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaDatabase className="text-2xl text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Database</div>
                  <div className="text-sm text-gray-600">PostgreSQL 15</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaMobile className="text-2xl text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Mobile</div>
                  <div className="text-sm text-gray-600">PWA Ready</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaCreditCard className="text-2xl text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Payments</div>
                  <div className="text-sm text-gray-600">50+ Gateways</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaClock className="text-2xl text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Deployment</div>
                  <div className="text-sm text-gray-600">CI/CD Pipeline</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-green-50 border-green-200 text-green-700">
                <FaChartBar className="mr-2" />
                Transparent Pricing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Choose Your Growth Plan
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Start free, scale seamlessly. No hidden fees, no surprises. Every plan includes our core features.
              </p>
              
              {/* Money Back Guarantee */}
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-6 py-3 mb-8">
                <FaShieldAlt className="text-green-600" />
                <span className="text-sm font-medium text-green-700">30-day money-back guarantee</span>
              </div>
            </div>

            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-white shadow-lg border">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="annually" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  Annually <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save 20%</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <PricingCard
                    plan="Starter"
                    price={29}
                    originalPrice={39}
                    isPopular={false}
                    features={[
                      "Up to 1,000 products",
                      "2% transaction fee",
                      "Basic analytics dashboard",
                      "24/7 email support",
                      "Mobile app access",
                      "SSL certificate included"
                    ]}
                    ctaText="Start Free Trial"
                    description="Perfect for new businesses"
                  />
                  <PricingCard
                    plan="Professional"
                    price={79}
                    originalPrice={99}
                    features={[
                      "Up to 10,000 products",
                      "1% transaction fee",
                      "Advanced analytics & AI insights",
                      "Priority 24/7 support",
                      "AI-powered recommendations",
                      "Advanced inventory management",
                      "Multi-channel selling",
                      "Custom domain"
                    ]}
                    isPopular
                    ctaText="Most Popular"
                    description="Best for growing businesses"
                  />
                  <PricingCard
                    plan="Enterprise"
                    price={299}
                    originalPrice={399}
                    isPopular={false}
                    features={[
                      "Unlimited products",
                      "0.5% transaction fee",
                      "Custom analytics & reporting",
                      "Dedicated account manager",
                      "AI-powered everything",
                      "Full API access",
                      "White-label solution",
                      "Custom integrations",
                      "Advanced security features"
                    ]}
                    ctaText="Contact Sales"
                    description="For large-scale operations"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="annually">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <PricingCard
                    plan="Starter"
                    price={23}
                    originalPrice={39}
                    isPopular={false}
                    features={[
                      "Up to 1,000 products",
                      "2% transaction fee",
                      "Basic analytics dashboard",
                      "24/7 email support",
                      "Mobile app access",
                      "SSL certificate included"
                    ]}
                    ctaText="Start Free Trial"
                    description="Perfect for new businesses"
                  />
                  <PricingCard
                    plan="Professional"
                    price={63}
                    originalPrice={99}
                    features={[
                      "Up to 10,000 products",
                      "1% transaction fee",
                      "Advanced analytics & AI insights",
                      "Priority 24/7 support",
                      "AI-powered recommendations",
                      "Advanced inventory management",
                      "Multi-channel selling",
                      "Custom domain"
                    ]}
                    isPopular
                    ctaText="Most Popular"
                    description="Best for growing businesses"
                  />
                  <PricingCard
                    plan="Enterprise"
                    price={239}
                    originalPrice={399}
                    isPopular={false}
                    features={[
                      "Unlimited products",
                      "0.5% transaction fee",
                      "Custom analytics & reporting",
                      "Dedicated account manager",
                      "AI-powered everything",
                      "Full API access",
                      "White-label solution",
                      "Custom integrations",
                      "Advanced security features"
                    ]}
                    ctaText="Contact Sales"
                    description="For large-scale operations"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Additional Pricing Info */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">All Plans Include</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Free setup & migration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">99.9% uptime guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Regular feature updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-green-50 border-green-200 text-green-700">
                <FaUsers className="mr-2" />
                Customer Success Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Real Results from Real Businesses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how ProMerchants has helped businesses like yours achieve remarkable growth and success.
              </p>
            </div>

            {/* Success Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">$2.3M</div>
                <div className="text-sm text-gray-600">Average Revenue Increase</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">47%</div>
                <div className="text-sm text-gray-600">Conversion Rate Boost</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">2.3s</div>
                <div className="text-sm text-gray-600">Average Load Time</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <TestimonialCard
                name="Sarah Chen"
                company="CEO, TechGear Solutions"
                quote="ProMerchants increased our conversion rate by 47% in just 3 months. The AI-powered personalization features are game-changing."
                metrics="Revenue: +$1.2M | Conversion: +47% | Load Time: 1.8s"
                avatar="SC"
                rating={5}
              />
              <TestimonialCard
                name="Marcus Rodriguez"
                company="Founder, Urban Fashion Co."
                quote="The performance optimization alone paid for the platform. Our site loads 3x faster, and customers love the experience."
                metrics="Traffic: +156% | Bounce Rate: -34% | AOV: +$47"
                avatar="MR"
                rating={5}
              />
              <TestimonialCard
                name="Dr. Emily Watson"
                company="Owner, Wellness Essentials"
                quote="As a small business owner, the 24/7 support and automated features have been invaluable. Revenue up 89% year-over-year."
                metrics="Revenue: +89% | Orders: +234% | Support: 24/7"
                avatar="EW"
                rating={5}
              />
              <TestimonialCard
                name="James Park"
                company="CTO, Electronics Plus"
                quote="The security features and API flexibility are outstanding. We've integrated with 15+ tools seamlessly."
                metrics="Integrations: 15+ | Security: SOC 2 | Uptime: 99.9%"
                avatar="JP"
                rating={5}
              />
              <TestimonialCard
                name="Lisa Thompson"
                company="Marketing Director, Home Decor Hub"
                quote="The analytics dashboard gives us insights we never had before. ROI increased 67% with data-driven decisions."
                metrics="ROI: +67% | Analytics: Real-time | Insights: 50+ metrics"
                avatar="LT"
                rating={5}
              />
              <TestimonialCard
                name="David Kim"
                company="Founder, Sports Equipment Pro"
                quote="From startup to $5M revenue in 18 months. ProMerchants scaled with us every step of the way."
                metrics="Revenue: $5M | Growth: 18 months | Scale: Unlimited"
                avatar="DK"
                rating={5}
              />
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Trusted by Industry Leaders</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                <div className="text-xl font-bold text-gray-400">Fortune 500</div>
                <div className="text-xl font-bold text-gray-400">Startups</div>
                <div className="text-xl font-bold text-gray-400">Enterprise</div>
                <div className="text-xl font-bold text-gray-400">SMBs</div>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Over 10,000 businesses trust ProMerchants to power their e-commerce success
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-green-50 border-green-200 text-green-700">
                <FaUsers className="mr-2" />
                About ProMerchants
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Empowering E-commerce Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                ProMerchants is a leading provider of cutting-edge e-commerce solutions, dedicated to helping businesses scale and succeed in the digital marketplace.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Company Story */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    ProMerchants was born from a vision to democratize e-commerce technology, making enterprise-grade solutions accessible to businesses of all sizes. As a subsidiary of{' '}
                    <a 
                      href="https://www.vedpragya.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-semibold underline"
                    >
                      Vedpragya Bharat Private Limited
                    </a>
                    , we leverage our parent company's extensive expertise in technology and business innovation.
                  </p>
                  <p>
                    Our platform combines the power of artificial intelligence, modern cloud infrastructure, and user-centric design to deliver unparalleled e-commerce experiences. We believe that every business deserves access to tools that can transform their online presence and drive sustainable growth.
                  </p>
                  <p>
                    With a team of passionate developers, designers, and business strategists, we're committed to pushing the boundaries of what's possible in e-commerce technology while maintaining the highest standards of security, performance, and customer satisfaction.
                  </p>
                </div>
              </div>

              {/* Company Stats */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">By the Numbers</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
                    <div className="text-sm text-gray-600">Active Businesses</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">$2.3B+</div>
                    <div className="text-sm text-gray-600">Revenue Generated</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime Guarantee</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Expert Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Company Information */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">About Our Parent Company</h3>
                  <p className="text-green-100 leading-relaxed mb-6">
                    <strong>Vedpragya Bharat Private Limited</strong> is a forward-thinking technology company incorporated on April 28, 2025, and headquartered in Bhiwani, Haryana. As our parent company, Vedpragya Bharat brings decades of combined experience in technology innovation, business strategy, and market development.
                  </p>
                  <p className="text-green-100 leading-relaxed">
                    The company is committed to fostering innovation and supporting subsidiary companies like ProMerchants in delivering cutting-edge solutions to global markets. With a strong foundation in technology and business excellence, Vedpragya Bharat ensures that ProMerchants operates with the highest standards of corporate governance and technological advancement.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-4">Company Details</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold">Company Name:</span><br />
                      Vedpragya Bharat Private Limited
                    </div>
                    <div>
                      <span className="font-semibold">CIN:</span> U47912HR2025PTC131357
                    </div>
                    <div>
                      <span className="font-semibold">Incorporated:</span> April 28, 2025
                    </div>
                    <div>
                      <span className="font-semibold">Registered Address:</span><br />
                      C/O Aditi, Madhur Colony, Haluwas Opp Bansilal Park<br />
                      Bhiwani, Haryana, 127021
                    </div>
                    <div className="pt-4">
                      <a 
                        href="https://www.vedpragya.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Visit Parent Company
                        <FaArrowRight className="text-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-green-50 border-green-200 text-green-700">
                <FaCog className="mr-2" />
                Technology Stack
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Built on Modern Technology
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powered by cutting-edge technologies and industry-leading infrastructure for maximum performance and reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">Next.js</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Frontend Framework</h3>
                <p className="text-sm text-gray-600">React 18, Server Components, Edge Runtime</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">PostgreSQL</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Database</h3>
                <p className="text-sm text-gray-600">Version 15, Read Replicas, Automated Backups</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">GraphQL</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">API Layer</h3>
                <p className="text-sm text-gray-600">Apollo Client, Real-time Subscriptions</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">AWS</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Cloud Infrastructure</h3>
                <p className="text-sm text-gray-600">Global CDN, Auto-scaling, 99.9% SLA</p>
              </div>
            </div>

            {/* Integration Partners */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">500+ Integrations Available</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-600">Stripe</div>
                  <div className="text-xs text-gray-500">Payments</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-600">Mailchimp</div>
                  <div className="text-xs text-gray-500">Email</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-600">Zapier</div>
                  <div className="text-xs text-gray-500">Automation</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-600">Google Analytics</div>
                  <div className="text-xs text-gray-500">Analytics</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-600">Shopify</div>
                  <div className="text-xs text-gray-500">Migration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-600">Salesforce</div>
                  <div className="text-xs text-gray-500">CRM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white text-center relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-6 bg-white/20 border-white/30 text-white">
                <FaRocket className="mr-2" />
                Limited Time Offer
              </Badge>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Ready to Scale Your Business
                <br />
                <span className="text-green-200">10x Faster?</span>
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                Join 10,000+ successful businesses already using ProMerchants to maximize their revenue and minimize their costs.
              </p>

              {/* Urgency Elements */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <FaClock className="text-green-200" />
                  <span>30-day free trial</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <FaShieldAlt className="text-green-200" />
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <FaUsers className="text-green-200" />
                  <span>10,000+ happy customers</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link href={'/auth/register'}>
                  <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    Start Free Trial Now
                    <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-10 py-4 rounded-full text-xl font-bold">
                  Schedule Demo
                </Button>
              </div>

              {/* Final Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-200" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-200" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-200" />
                  <span>Setup in under 5 minutes</span>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-sm opacity-70 mb-4">Trusted by industry leaders</p>
                <div className="flex justify-center items-center gap-8 opacity-50">
                  <div className="text-lg font-bold">Fortune 500</div>
                  <div className="text-lg font-bold">Startups</div>
                  <div className="text-lg font-bold">Enterprise</div>
                  <div className="text-lg font-bold">SMBs</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    ProMerchants
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                    The most powerful e-commerce platform for modern businesses. Scale faster, sell more, and grow smarter with AI-powered tools.
                  </p>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaHeadset className="text-green-400" />
                    <span className="text-sm text-gray-300">24/7 Expert Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaShieldAlt className="text-green-400" />
                    <span className="text-sm text-gray-300">SOC 2 Type II Certified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-green-400" />
                    <span className="text-sm text-gray-300">99.9% Uptime SLA</span>
                  </div>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Product</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Features</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Pricing</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Integrations</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">API Documentation</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Security</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Performance</a></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Partners</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Press Kit</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Blog</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Case Studies</a></li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Contact Sales</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">System Status</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Community</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Developer Portal</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Migration Guide</a></li>
                </ul>
              </div>
            </div>

            {/* Company Information */}
            <div className="pt-8 border-t border-gray-700 mb-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 text-white">Company Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div>
                    <p className="mb-2">
                      <span className="font-semibold text-green-400">ProMerchants</span> is a subsidiary of{' '}
                      <a 
                        href="https://www.vedpragya.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition-colors underline"
                      >
                        Vedpragya Bharat Private Limited
                      </a>
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Registered Address:</span><br />
                      C/O Aditi, Madhur Colony, Haluwas Opp Bansilal Park<br />
                      Bhiwani, Haryana, 127021
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <span className="font-semibold">CIN:</span> U47912HR2025PTC131357
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Incorporated:</span> April 28, 2025
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Parent Company:</span>{' '}
                      <a 
                        href="https://www.vedpragya.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        www.vedpragya.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-8 border-t border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-400">
                  © 2024 ProMerchants, a subsidiary of Vedpragya Bharat Private Limited. All rights reserved. Built with ❤️ for modern e-commerce.
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>

  )
}

export default HomePage