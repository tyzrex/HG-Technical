"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Pattern {
  id: number;
  name: string;
  image: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  image: string;
}

// Mock API functions
const fetchPatterns = async (): Promise<Pattern[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Modern Minimalist",
          image: "/minimal.jpg?height=150&width=150",
        },
        {
          id: 2,
          name: "Vintage Classic",
          image: "/vintage.jpg?height=150&width=150",
        },
        {
          id: 3,
          name: "Bold Geometric",
          image: "/bold.webp?height=150&width=150",
        },
        {
          id: 4,
          name: "Natural Organic",
          image: "/natural.jpeg?height=150&width=150",
        },
        {
          id: 5,
          name: "Tech Futuristic",
          image: "/tecg.webp?height=150&width=150",
        },
        {
          id: 6,
          name: "Elegant Luxury",
          image: "/luxury.jpg?height=150&width=150",
        },
      ]);
    }, 800);
  });
};

const fetchEvents = async (): Promise<Event[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Summer Tech Expo",
          date: "June 15-20, 2024",
          image: "/event1.jpg?height=200&width=300",
        },
        {
          id: 2,
          name: "Annual Gaming Convention",
          date: "July 8-12, 2024",
          image: "/event2.jpg?height=200&width=300",
        },
        {
          id: 3,
          name: "Smart Home Summit",
          date: "August 3-5, 2024",
          image: "/event3.jpg?height=200&width=300",
        },
        {
          id: 4,
          name: "Digital Photography Workshop",
          date: "September 18-20, 2024",
          image: "/event4.jpg?height=200&width=300",
        },
      ]);
    }, 800);
  });
};

export default function PatternsEvents() {
  const { data: patterns = [], isLoading: isLoadingPatterns } = useQuery({
    queryKey: ["patterns"],
    queryFn: fetchPatterns,
  });

  const { data: events = [], isLoading: isLoadingEvents } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  return (
    <section className="py-8 container">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 borde border-b-4 border-b-green-500 w-fit">
          Top Patterns of the Month
        </h2>
        {isLoadingPatterns ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {patterns.map((pattern) => (
              <div key={pattern.id}>
                <Link href={`/pattern/${pattern.id}`} className="block group">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-blue-50 dark:bg-blue-900/20">
                    <Image
                      src={pattern.image || "/placeholder.svg"}
                      alt={pattern.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium">{pattern.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 borde border-b-4 border-b-green-500 w-fit">
          Events of the Month
        </h2>
        {isLoadingEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="aspect-video rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((event) => (
              <div key={event.id}>
                <Link href={`/event/${event.id}`} className="block group">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-blue-50 dark:bg-blue-900/20">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-medium">{event.name}</h3>
                        <p className="text-sm opacity-90">{event.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
