"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUsers } from "@/services/api";
import type { User, UserWithAvatar } from "@/types";

// Helper function to generate avatar URL based on user name
const generateAvatar = (user: User): UserWithAvatar => {
  // Using DiceBear API to generate avatars based on username
  const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;
  return { ...user, avatar };
};

export default function TopMembers() {
  const [currentMembersPage, setCurrentMembersPage] = useState(0);
  const [currentWinnersPage, setCurrentWinnersPage] = useState(0);
  const itemsPerPage = 6;

  const { data: allUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    select: (data) => data.map(generateAvatar),
  });

  // Split users into two groups for members and winners
  // In a real app, this would be based on actual data distinctions
  const members = allUsers.slice(0, Math.ceil(allUsers.length / 2));
  const winners = allUsers.slice(Math.ceil(allUsers.length / 2));

  const totalMembersPages = Math.ceil(members.length / itemsPerPage);
  const totalWinnersPages = Math.ceil(winners.length / itemsPerPage);

  const handlePrevMembersPage = () => {
    setCurrentMembersPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextMembersPage = () => {
    setCurrentMembersPage((prev) =>
      prev < totalMembersPages - 1 ? prev + 1 : prev
    );
  };

  const handlePrevWinnersPage = () => {
    setCurrentWinnersPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextWinnersPage = () => {
    setCurrentWinnersPage((prev) =>
      prev < totalWinnersPages - 1 ? prev + 1 : prev
    );
  };

  const displayedMembers = members.slice(
    currentMembersPage * itemsPerPage,
    (currentMembersPage + 1) * itemsPerPage
  );
  const displayedWinners = winners.slice(
    currentWinnersPage * itemsPerPage,
    (currentWinnersPage + 1) * itemsPerPage
  );

  return (
    <section className="py-8 container">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Top Members of the Month</h2>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handlePrevMembersPage}
              disabled={currentMembersPage === 0 || isLoadingUsers}
              variant="outline"
              size="icon"
              className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              onClick={handleNextMembersPage}
              disabled={
                currentMembersPage === totalMembersPages - 1 || isLoadingUsers
              }
              variant="outline"
              size="icon"
              className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
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
          <div
            key={currentMembersPage}
            className="grid grid-cols-3 md:grid-cols-6 gap-4"
          >
            {displayedMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-2 bg-blue-100">
                  <Image
                    src={member.avatar || "/placeholder.svg"}
                    alt={`${member.name.firstname} ${member.name.lastname}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-center">{`${member.name.firstname} ${member.name.lastname}`}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Top Lucky Draw Winners</h2>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handlePrevWinnersPage}
              disabled={currentWinnersPage === 0 || isLoadingUsers}
              variant="outline"
              size="icon"
              className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              onClick={handleNextWinnersPage}
              disabled={
                currentWinnersPage === totalWinnersPages - 1 || isLoadingUsers
              }
              variant="outline"
              size="icon"
              className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
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
          <div
            key={currentWinnersPage}
            className="grid grid-cols-3 md:grid-cols-6 gap-4"
          >
            {displayedWinners.map((winner) => (
              <div key={winner.id} className="flex flex-col items-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-2 bg-blue-100">
                  <Image
                    src={winner.avatar || "/placeholder.svg"}
                    alt={`${winner.name.firstname} ${winner.name.lastname}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-yellow-400 rounded-full"></div>
                </div>
                <span className="text-sm text-center">{`${winner.name.firstname} ${winner.name.lastname}`}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
