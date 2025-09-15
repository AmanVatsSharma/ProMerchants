import type { Metadata } from "next";
import { FaUsers, FaRocket, FaShieldAlt, FaChartLine, FaArrowRight, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaCertificate } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/main/Header';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About ProMerchants | Vedpragya Bharat Private Limited",
  description: "Learn about ProMerchants, a subsidiary of Vedpragya Bharat Private Limited, and our mission to democratize e-commerce technology for businesses of all sizes.",
  keywords: "about promerchants, vedpragya bharat, e-commerce platform, company information, subsidiary",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black pt-20">
        {/* Hero Section */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <Badge variant="outline" className="mb-4 bg-green-50 border-green-200 text-green-700">
              <FaUsers className="mr-2" />
              About ProMerchants
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-600 to-blue-600 bg-clip-text text-transparent">
              Empowering E-commerce Excellence
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600 leading-relaxed">
              ProMerchants is a leading provider of cutting-edge e-commerce solutions, dedicated to helping businesses scale and succeed in the digital marketplace.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
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
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Mission</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <FaRocket className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Innovation</h4>
                      <p className="text-gray-600">Continuously pushing the boundaries of e-commerce technology</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FaShieldAlt className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Security</h4>
                      <p className="text-gray-600">Ensuring the highest standards of data protection and security</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FaChartLine className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Growth</h4>
                      <p className="text-gray-600">Empowering businesses to scale and achieve their full potential</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">By the Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 bg-white shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Active Businesses</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-white shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$2.3B+</div>
                  <div className="text-gray-600">Revenue Generated</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-white shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime Guarantee</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-white shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-600">Expert Support</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Parent Company Information */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">About Our Parent Company</h2>
                <div className="space-y-4 text-green-100 leading-relaxed text-lg">
                  <p>
                    <strong>Vedpragya Bharat Private Limited</strong> is a forward-thinking technology company incorporated on April 28, 2025, and headquartered in Bhiwani, Haryana. As our parent company, Vedpragya Bharat brings decades of combined experience in technology innovation, business strategy, and market development.
                  </p>
                  <p>
                    The company is committed to fostering innovation and supporting subsidiary companies like ProMerchants in delivering cutting-edge solutions to global markets. With a strong foundation in technology and business excellence, Vedpragya Bharat ensures that ProMerchants operates with the highest standards of corporate governance and technological advancement.
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6">Company Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <FaBuilding className="text-green-200 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Company Name:</span><br />
                      Vedpragya Bharat Private Limited
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCertificate className="text-green-200 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">CIN:</span> U47912HR2025PTC131357
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="text-green-200 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Incorporated:</span> April 28, 2025
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-green-200 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Registered Address:</span><br />
                      C/O Aditi, Madhur Colony, Haluwas Opp Bansilal Park<br />
                      Bhiwani, Haryana, 127021
                    </div>
                  </div>
                  <div className="pt-6">
                    <a 
                      href="https://www.vedpragya.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Visit Parent Company
                      <FaArrowRight className="text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Join Our Success Story?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the power of ProMerchants and see how we can help transform your e-commerce business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Free Trial
                </button>
              </Link>
              <Link href="/">
                <button className="border-2 border-gray-300 hover:border-green-600 hover:text-green-600 px-8 py-4 rounded-full text-lg font-semibold">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}