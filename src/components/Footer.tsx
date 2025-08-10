/* eslint-disable */
import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const Footer = () => {
    const services = [
        'Thu mua mít tại vườn',
        'Thu mua mít số lượng lớn',
        'Tư vấn giá mít',
    ];

    const socialLinks = [
        { icon: 'facebook', href: 'https://www.facebook.com/dangkhoa.pham.144', label: 'Facebook' },
        { icon: 'zalo', href: '#', label: 'Zalo' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-6 group">
                            <div className="relative">
                                <Image
                                    src="/images/logo.png"
                                    alt="Vựa mít Khoa"
                                    width={64}
                                    height={64}
                                    className="rounded-full border-4 border-white/20 shadow-2xl transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/20 to-transparent"></div>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                                    Vựa Mít Khoa
                                </h2>
                                <p className="text-emerald-200 text-sm font-medium">Chuyên thu mua mít chất lượng cao</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                            Với nhiều năm kinh nghiệm, chúng tôi cam kết mang đến dịch vụ thu mua mít
                            chất lượng cao, giá cả hợp lý và uy tín hàng đầu.
                        </p>

                        {/* Contact Highlights */}
                        <div className="space-y-3">
                            <div className="flex items-center text-emerald-200 hover:text-white transition-colors duration-300">
                                <svg className="w-5 h-5 mr-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="font-medium">Hotline: 0842 879 238</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 relative">
                            Dịch vụ
                            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                        </h3>
                        <ul className="space-y-3">
                            {services.map((item, index) => (
                                <li key={`service-${index}`}>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-emerald-300 transition-all duration-300 hover:translate-x-2 inline-block group"
                                    >
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            {item}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 relative">
                            Liên hệ
                            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="flex items-center mb-2">
                                    <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-emerald-300 font-medium">Giờ làm việc</span>
                                </div>
                                <p className="text-gray-300 text-sm">Thứ 2 - CN: 6:00 - 18:00</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="flex items-center mb-2">
                                    <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-emerald-300 font-medium">Thu mua nhanh</span>
                                </div>
                                <p className="text-gray-300 text-sm">24/7 - Có mít là có tiền</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Bottom Section */}
                <div className="border-t border-white/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="flex space-x-6">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={`social-${social.icon}-${index}`}
                                        href={social.href}
                                        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-emerald-500 hover:border-emerald-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25 group"
                                        aria-label={social.label}
                                    >
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            {social.icon === 'facebook' && (
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            )}
                                            {social.icon === 'zalo' && (
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/>
                                            )}
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-gray-400 text-sm mb-2">
                                © 2024 Vựa Mít Khoa. Tất cả quyền được bảo lưu.
                            </p>
                            <p className="text-emerald-300 text-sm font-medium">
                                &ldquo;Mít ngon - Giá tốt - Uy tín hàng đầu&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        </footer>
    );
};

export default Footer;