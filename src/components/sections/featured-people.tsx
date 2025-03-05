"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserWithAvatar, User } from "@/types";
import { fetchUsers } from "@/services/api";

interface Platform {
  id: number;
  name: string;
  logo: string;
}

// Mock API function for platforms (since FakeStore API doesn't have platforms)
const fetchPlatforms = async (): Promise<Platform[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Platform A",
          logo: "/plat.png",
        },
        {
          id: 2,
          name: "Platform B",
          logo: "/plat.png",
        },
        {
          id: 3,
          name: "Platform C",
          logo: "/plat.png",
        },
        {
          id: 4,
          name: "Platform D",
          logo: "/plat.png",
        },
        {
          id: 5,
          name: "Platform E",
          logo: "/plat.png",
        },
        {
          id: 6,
          name: "Platform F",
          logo: "/plat.png",
        },
      ]);
    }, 1000);
  });
};

// Helper function to generate avatar URL based on user name
const generateAvatar = (user: User): UserWithAvatar => {
  // Using DiceBear API to generate avatars based on username
  const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;
  return { ...user, avatar };
};

export default function FeaturedPeople() {
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    select: (data) => data.map(generateAvatar),
  });

  const { data: platforms = [], isLoading: isLoadingPlatforms } = useQuery({
    queryKey: ["platforms"],
    queryFn: fetchPlatforms,
  });

  return (
    <section className="py-8 container mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 borde border-b-4 border-b-green-500 w-fit">
          People
        </h2>
        {isLoadingUsers ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {users.slice(0, 6).map((user) => (
              <div key={user.id} className="flex flex-col items-center">
                <div className="relative w-full h-full rounded-full overflow-hidden mb-2 bg-blue-100">
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={`${user.name.firstname} ${user.name.lastname}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-center">{`${user.name.firstname} ${user.name.lastname}`}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 borde border-b-4 border-b-green-500 w-fit">
          Platforms
        </h2>
        {isLoadingPlatforms ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {platforms.slice(0, 6).map((platform) => (
              <div
                key={platform.id}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 aspect-square flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Image
                  src={platform.logo || "/placeholder.svg"}
                  alt={platform.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
