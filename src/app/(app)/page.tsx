"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import messages from "@/messages.json";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center min-h-screen justify-center px-4 md:px-24 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Dive into the mystery world of Anonymous Conversations
        </h1>
        <p className="text-lg text-gray-400">
          Explore Mystery message - Where your identity remains a secret.
        </p>
      </section>

      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="w-full">
                  <CardHeader>
                    <h2 className="text-xl font-bold">{message.title}</h2>
                    <p className="text-sm text-gray-500">{message.recieved}</p>
                  </CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <p className="text-lg">{message.content}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Link className="m-4" href="/dashboard">
        <Button>
          Go to Dashboard
        </Button>
      </Link>

      <footer className="mt-8 text-center text-gray-500">
        <p>© 2023 Mystery Message. All rights reserved.</p>
      </footer>
    </main>
  );
}
