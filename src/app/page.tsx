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
import { FaRocket, FaChartLine, FaLock, FaMagic, FaGlobe, FaHeadset, FaCheck } from 'react-icons/fa'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Header from '@/components/main/Header'
import Link from 'next/link'

const FeatureCard = ({ icon, title, description }) => {
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
      <Card className="h-full">
        <CardHeader>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const PricingCard = ({ plan, price, features, isPopular }: { isPopular: boolean, features: string[], plan: string, price: number }) => (
  <Card className={`h-full ${isPopular ? 'border-green-500 border-2' : ''}`}>
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        {plan}
        {isPopular && <Badge variant="secondary">Most Popular</Badge>}
      </CardTitle>
      <div className="text-3xl font-bold">${price}<span className="text-sm font-normal">/month</span></div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <FaCheck className="text-green-500 mr-2" /> {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Link href={'/auth/register'}>
        <Button className="w-full">Start Free Trial</Button>
      </Link>
    </CardFooter>
  </Card>
)

const TestimonialCard = ({ name, company, quote }) => (
  <Card>
    <CardContent className="pt-6">
      <p className="italic mb-4">"{quote}"</p>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-500">{company}</div>
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
          className="py-20 text-center"
        >
          <h1 className="text-5xl font-bold mb-6">Launch Your E-commerce Empire with ProMerchants</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Powerful tools, unbeatable features, and expert support to skyrocket your online business.
            Start your 30-day free trial today!
          </p>
          <Link href={'/auth/register'}>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg">
              Start Free Trial
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-600">No credit card required</p>
        </motion.section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ProMerchants?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FaRocket className="text-2xl text-green-600" />}
                title="Lightning-Fast Performance"
                description="Our optimized platform ensures your store loads quickly, providing a seamless shopping experience for your customers."
              />
              <FeatureCard
                icon={<FaChartLine className="text-2xl text-green-600" />}
                title="Advanced Analytics"
                description="Gain deep insights into your business with our powerful analytics tools, helping you make data-driven decisions."
              />
              <FeatureCard
                icon={<FaLock className="text-2xl text-green-600" />}
                title="Robust Security"
                description="Keep your store and customer data safe with our state-of-the-art security measures and regular updates."
              />
              <FeatureCard
                icon={<FaMagic className="text-2xl text-green-600" />}
                title="AI-Powered Personalization"
                description="Leverage artificial intelligence to create personalized shopping experiences that boost conversions and customer loyalty."
              />
              <FeatureCard
                icon={<FaGlobe className="text-2xl text-green-600" />}
                title="Global Reach"
                description="Expand your business worldwide with our built-in multi-language and multi-currency support."
              />
              <FeatureCard
                icon={<FaHeadset className="text-2xl text-green-600" />}
                title="24/7 Expert Support"
                description="Our dedicated team of e-commerce experts is always ready to assist you, ensuring your success around the clock."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Perfect Plan</h2>
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annually">Annually (Save 20%)</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PricingCard
                    plan="Basic"
                    price={29}
                    isPopular={false}
                    features={[
                      "Up to 1,000 products",
                      "2% transaction fee",
                      "Basic analytics",
                      "24/7 support"
                    ]}
                  />
                  <PricingCard
                    plan="Pro"
                    price={79}
                    features={[
                      "Up to 10,000 products",
                      "1% transaction fee",
                      "Advanced analytics",
                      "Priority 24/7 support",
                      "AI-powered recommendations"
                    ]}
                    isPopular
                  />
                  <PricingCard
                    plan="Enterprise"
                    price={299}
                    isPopular={false}
                    features={[
                      "Unlimited products",
                      "0.5% transaction fee",
                      "Custom analytics",
                      "Dedicated account manager",
                      "AI-powered everything",
                      "API access"
                    ]}
                  />
                </div>
              </TabsContent>
              <TabsContent value="annually">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PricingCard
                    plan="Basic"
                    isPopular={false}
                    price={23}
                    features={[
                      "Up to 1,000 products",
                      "2% transaction fee",
                      "Basic analytics",
                      "24/7 support"
                    ]}
                  />
                  <PricingCard
                    plan="Pro"
                    price={63}
                    features={[
                      "Up to 10,000 products",
                      "1% transaction fee",
                      "Advanced analytics",
                      "Priority 24/7 support",
                      "AI-powered recommendations"
                    ]}
                    isPopular
                  />
                  <PricingCard
                    plan="Enterprise"
                    price={239}
                    isPopular={false}
                    features={[
                      "Unlimited products",
                      "0.5% transaction fee",
                      "Custom analytics",
                      "Dedicated account manager",
                      "AI-powered everything",
                      "API access"
                    ]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                name="Sarah Johnson"
                company="Fashion Boutique Owner"
                quote="ProMerchants transformed my small boutique into a thriving online business. The AI-powered recommendations have significantly boosted my sales!"
              />
              <TestimonialCard
                name="Michael Chen"
                company="Electronics Retailer"
                quote="The performance and security features of ProMerchants are unmatched. Our site loads faster than ever, and we feel confident in the safety of our customer data."
              />
              <TestimonialCard
                name="Emily Rodriguez"
                company="Handmade Crafts Seller"
                quote="As a solo entrepreneur, the 24/7 support from ProMerchants has been a lifesaver. They're always there to help me grow my business."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">Ready to Revolutionize Your E-commerce Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of successful online stores. Start your 30-day free trial now and experience the ProMerchants difference!
            </p>
            <Button size="lg" variant="outline" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg">
              Start Your Free Trial
            </Button>
            <p className="mt-4 text-sm">No credit card required. Cancel anytime.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ProMerchants</h3>
                <p className="text-sm">Empowering e-commerce businesses worldwide.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="hover:underline">Features</a></li>
                  <li><a href="#" className="hover:underline">Pricing</a></li>
                  <li><a href="#" className="hover:underline">Integrations</a></li>
                  <li><a href="#" className="hover:underline">API</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="hover:underline">About Us</a></li>
                  <li><a href="#" className="hover:underline">Careers</a></li>
                  <li><a href="#" className="hover:underline">Partners</a></li>
                  <li><a href="#" className="hover:underline">Press</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="hover:underline">Help Center</a></li>
                  <li><a href="#" className="hover:underline">Contact Us</a></li>
                  <li><a href="#" className="hover:underline">Status</a></li>
                  <li><a href="#" className="hover:underline">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
              © 2023 ProMerchants. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>

  )
}

export default HomePage