// pages/about/index.tsx
import React from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Users, 
  Award, 
  TrendingUp,
  Heart,
  Shield,
  Zap,
  Globe,
  Target,
  Eye,
  CheckCircle,
  Quote
} from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative `bg-linear-to-br` from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-5xl font-bold mb-6 text-black leading-tight">
                  Welcome to <span className="text-amber-500">Mimi Store</span>
                </h1>
                <p className="text-xl text-black mb-8 leading-relaxed">
                  Your trusted partner in online shopping. We're dedicated to bringing you quality products, exceptional service, and an unforgettable shopping experience.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                    <div className="text-3xl text-black font-bold">5+</div>
                    <div className="text-sm text-blue-600">Years Experience</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                    <div className="text-3xl  text-black font-bold">50K+</div>
                    <div className="text-sm text-blue-600">Happy Customers</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                    <div className="text-3xl  text-black font-bold">10K+</div>
                    <div className="text-sm text-blue-600">Products Sold</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"
                    alt="Mimi Store"
                    className="rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Our Story"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2019, Mimi Store began with a simple vision: to make quality products accessible to everyone in Nigeria. What started as a small online shop has grown into one of the country's most trusted e-commerce platforms.
                  </p>
                  <p>
                    Our journey has been driven by our commitment to customer satisfaction and our passion for delivering excellence. From electronics to fashion, home goods to accessories, we've carefully curated a collection that meets the diverse needs of our customers.
                  </p>
                  <p>
                    Today, we're proud to serve thousands of customers across Nigeria, offering fast delivery, secure payments, and exceptional customer service. But we're just getting started – our vision is to become West Africa's leading e-commerce destination.
                  </p>
                </div>
                
               

               <div className="mt-8 flex gap-4">
                    <Link
                    href="/products"
                   className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
             Shop Now
                   </Link>

                   <Link
                      href="/contact"
                        className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                   >
                     Contact Us
                    </Link>
              </div>

              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-amber-600 font-bold mb-4">Mission & Vision</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Guiding principles that drive everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="`bg-linear-to-br` from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To provide our customers with a seamless online shopping experience by offering high-quality products, competitive prices, and exceptional customer service. We strive to make shopping convenient, secure, and enjoyable for everyone.
                </p>
              </div>

              {/* Vision */}
              <div className="`bg-linear-to-br` from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become West Africa's most trusted and innovative e-commerce platform, where customers find everything they need with confidence. We envision a future where quality products and excellent service are accessible to all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-amber-600 font-bold mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that define who we are and how we work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Value 1 */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-blue-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer First</h3>
                <p className="text-gray-600 text-sm">
                  Your satisfaction is our top priority. We listen, understand, and deliver beyond expectations.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Assured</h3>
                <p className="text-gray-600 text-sm">
                  We only offer products that meet our high standards for quality and authenticity.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-purple-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Trust & Security</h3>
                <p className="text-gray-600 text-sm">
                  Your data and transactions are protected with industry-leading security measures.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-orange-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  We continuously improve our platform to provide the best shopping experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-amber-600 font-bold mb-4">Why Choose Mimi Store?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Here's what makes us different from the rest
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="text-blue-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Wide Product Range</h3>
                  <p className="text-gray-600 text-sm">
                    From electronics to fashion, find everything you need in one place with thousands of products to choose from.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Zap className="text-green-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Same-day delivery in Lagos and express shipping to all major cities across Nigeria.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="text-purple-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Secure Payment</h3>
                  <p className="text-gray-600 text-sm">
                    Multiple payment options with bank-level encryption to keep your transactions safe and secure.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="text-orange-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Quality Guarantee</h3>
                  <p className="text-gray-600 text-sm">
                    100% authentic products with a 7-day return policy if you're not completely satisfied.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Users className="text-red-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">
                    Our dedicated customer support team is always ready to assist you with any questions or concerns.
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-indigo-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Best Prices</h3>
                  <p className="text-gray-600 text-sm">
                    Competitive pricing with regular discounts and promotions to give you the best value for money.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-amber-600 font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate people behind Mimi Store
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">Amaka Okonkwo</h3>
                  <p className="text-blue-600 text-sm mb-3">Founder & CEO</p>
                  <p className="text-gray-600 text-sm">
                    Visionary leader with 10+ years in e-commerce
                  </p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">Chukwudi Eze</h3>
                  <p className="text-blue-600 text-sm mb-3">Head of Operations</p>
                  <p className="text-gray-600 text-sm">
                    Logistics expert ensuring timely deliveries
                  </p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">Funke Adeyemi</h3>
                  <p className="text-blue-600 text-sm mb-3">Customer Success Lead</p>
                  <p className="text-gray-600 text-sm">
                    Dedicated to making customers happy
                  </p>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                  alt="Team Member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">Emeka Nwosu</h3>
                  <p className="text-blue-600 text-sm mb-3">Tech Lead</p>
                  <p className="text-gray-600 text-sm">
                    Building innovative shopping experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-amber-600 font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real experiences from real customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <Quote className="text-blue-600 mb-4" size={32} />
                <p className="text-gray-600 mb-6 italic">
                  "Mimi Store has been my go-to for all my online shopping needs. Fast delivery, great prices, and excellent customer service!"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                    alt="Customer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Blessing Okafor</div>
                    <div className="text-sm text-gray-500">Lagos, Nigeria</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <Quote className="text-blue-600 mb-4" size={32} />
                <p className="text-gray-600 mb-6 italic">
                  "I love the variety of products available. I always find exactly what I'm looking for, and the quality is always top-notch."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop"
                    alt="Customer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Tunde Bakare</div>
                    <div className="text-sm text-gray-500">Abuja, Nigeria</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <Quote className="text-blue-600 mb-4" size={32} />
                <p className="text-gray-600 mb-6 italic">
                  "Secure payments, easy returns, and responsive support team. Mimi Store has earned my trust and loyalty!"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
                    alt="Customer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Chioma Nnadi</div>
                    <div className="text-sm text-gray-500">Port Harcourt, Nigeria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 `bg-linear-to-r` from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
            <p className="text-xl text-blue-600 mb-8">
              Join thousands of satisfied customers and discover why Mimi Store is Nigeria's favorite online shopping destination.
            </p>
           import Link from "next/link";

<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Link
    href="/products"
    className="px-8 py-4 bg-blue-600 text-white rounded-lg border font-semibold hover:bg-gray-100 transition-colors"
  >
    Browse Products
  </Link>

  <Link
    href="/contact"
    className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-600 rounded-lg  font-semibold hover:bg-white/10 transition-colors"
  >
    Get In Touch
  </Link>
</div>

          </div>
        </section>
      </div>
    </div>
  );
}