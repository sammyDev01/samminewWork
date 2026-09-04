import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
  <div className="w-full bg-slate-50 border-t border-slate-200">

  <div className="
    w-full
    max-w-[1600px]
    mx-auto
    px-4
    min-[375px]:px-5
    sm:px-6
    md:px-8
    lg:px-10
    xl:px-14
    2xl:px-20
    py-10
    sm:py-12
    md:py-14
    lg:py-16
  ">

    {/* FOOTER CONTENT */}
    <div className="
      flex
      flex-col
      gap-10
      sm:grid
      sm:grid-cols-2
      lg:grid-cols-[minmax(0,2fr)_minmax(140px,1fr)_minmax(180px,1fr)]
      xl:grid-cols-[minmax(0,2.5fr)_minmax(160px,1fr)_minmax(200px,1fr)]
      lg:gap-12
      xl:gap-20
    ">

      {/* LOGO + DESCRIPTION */}
      <div className="min-w-0">

        <img
          src={assets.MyLogo}
          alt="Logo"
          className="
            w-48
            min-[375px]:w-32
            sm:w-36
            md:w-40
            h-auto
            object-contain
            mb-4
            sm:mb-5
          "
        />

        <p className="
          w-full
          max-w-2xl
          text-xs
          min-[375px]:text-sm
          text-slate-500
          leading-6
          sm:leading-7
        ">
         The healthcare industry incorporates several sectors that are dedicated to providing health care services and products. As a basic framework for defining the sector, the United Nations' International Standard Industrial Classification categorizes health care as generally consisting of hospital activities, medical and dental practice activities, and "other human health activities." The last class involves activities of, or under the supervision of, nurses, midwives, physiotherapists, scientific or diagnostic laboratories, pathology clinics, residential health facilities, patient advocates[25] or other allied health professions.
        </p>

      </div>


      {/* COMPANY */}
      <div className="min-w-0">

        <p className="
          text-base
          sm:text-lg
          font-semibold
          text-slate-800
          mb-4
          sm:mb-5
        ">
          COMPANY
        </p>

        <ul className="
          flex
          flex-col
          gap-2.5
          sm:gap-3
          text-xs
          sm:text-sm
          text-slate-500
        ">

          <li className="
            cursor-pointer
            hover:text-blue-600
            hover:translate-x-1
            transition-all
            duration-200
          ">
            Home
          </li>

          <li className="
            cursor-pointer
            hover:text-blue-600
            hover:translate-x-1
            transition-all
            duration-200
          ">
            Privacy Policy
          </li>

          <li className="
            cursor-pointer
            hover:text-blue-600
            hover:translate-x-1
            transition-all
            duration-200
          ">
            About Us
          </li>

          <li className="
            cursor-pointer
            hover:text-blue-600
            hover:translate-x-1
            transition-all
            duration-200
          ">
            Contact Us
          </li>

        </ul>

      </div>


      {/* GET IN TOUCH */}
      <div className="min-w-0">

        <p className="
          text-base
          sm:text-lg
          font-semibold
          text-slate-800
          mb-4
          sm:mb-5
        ">
          GET IN TOUCH
        </p>

        <ul className="
          flex
          flex-col
          gap-3
          text-xs
          sm:text-sm
          text-slate-500
        ">

          <li className="break-words">
            +234-806-1898-2109
          </li>

          <li className="
            break-all
            hover:text-blue-600
            transition-colors
          ">
            sasbkakhhv@gmal.com
          </li>

        </ul>

      </div>

    </div>


    {/* BOTTOM */}
    <div className="
      mt-8
      sm:mt-10
      md:mt-12
      pt-5
      sm:pt-6
      border-t
      border-slate-200
    ">

      <p className="
        text-[10px]
        min-[375px]:text-xs
        sm:text-sm
        text-slate-400
        text-center
        leading-5
      ">
        Copyright © 2026 western delta university health services - All Rights Reserved.
      </p>

    </div>

  </div>

</div>
  )
}

export default Footer
