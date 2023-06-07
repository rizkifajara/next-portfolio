import React from "react";

import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import Link from "next/link";
import { PageInfo } from "../../typings";
import { urlFor } from "@/sanity";

type Props = {
  pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: any) {
  const [text, count] = useTypewriter({
    words: [
      "Hi, My Name Is Rizki 👋",
      "How Can I Help You Today?",
      "Take Your Time ☕",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div
      className="flex flex-col space-y-8 items-center justify-center text-center overflow-hidden"
      style={{ height: "150vh" }}
    >
      <BackgroundCircles />
      <Image
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        src={urlFor(pageInfo.heroImage).url()}
        alt="Avatar"
        height={200}
        width={200}
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          {pageInfo.role}
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
