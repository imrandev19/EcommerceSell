import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:gap-0 md:flex-row md:items-start md:justify-between bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href={"/"} className="flex items-center">
          <Image src={"/logo.png"} width={36} height={36} />
          <p className="hidden text-white md:block text-md font-medium tracking-wider">
            SELLERCECOMMERCE
          </p>
        </Link>
        <p className="text-sm text-gray-400">2005 SELLER ECOMMERCE</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start ">


    <p className="text-sm text-amber-50">Links</p>
    <Link href={'/'}>Homepage</Link>
    <Link href={'/'}>Contact</Link>
    <Link href={'/'}>Terms of Services</Link>
    <Link href={'/'}>Homepage</Link>
    <Link href={'/'}>Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start ">


    <p className="text-sm text-amber-50">Links</p>
    <Link href={'/'}>Homepage</Link>
    <Link href={'/'}>Contact</Link>
    <Link href={'/'}>Terms of Services</Link>
    <Link href={'/'}>Homepage</Link>
    <Link href={'/'}>Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start ">


    <p className="text-sm text-amber-50">Links</p>
    <Link href={'/'}>Homepage</Link>
    <Link href={'/'}>Contact</Link>
    <Link href={'/'}>Terms of Services</Link>
    <Link href={'/'}>Homepage</Link>
    <Link href={'/'}>Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
