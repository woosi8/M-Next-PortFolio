"use client";

import { useAddPet, useFindPetsByStatus } from "@/common/api/generated/pet/pet";
import { FindPetsByStatusStatus } from "@/common/api/generated/types";
import { createContainer } from "unstated-next";

const IntroduceContainer = createContainer(() => {
  const {
    mutate: mutateAddPet,
    isPending,
    error,
  } = useAddPet({
    mutation: {
      onSuccess: (data) => {
        console.log("Pet added successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to add pet:", error);
      },
    },
  });

  const petsQuery = useFindPetsByStatus({
    status: FindPetsByStatusStatus.available,
  });

  const {
    data: availablePets,
    isLoading: isLoadingPets,
    error: petsError,
    refetch: refetchPets,
  } = petsQuery;

  const { data: pastMeetingList } = useFindPetsByStatus({
    status: FindPetsByStatusStatus.available,
  });

  console.log(pastMeetingList);

  const handleAddPet = (petData: any) => {
    mutateAddPet({
      data: {
        name: petData.name || "Doggie",
        photoUrls: petData.photoUrls || ["https://example.com/pet.jpg"],
        // Optional fields
        ...(petData.category && { category: petData.category }),
        ...(petData.tags && { tags: petData.tags }),
        ...(petData.status && { status: petData.status }),
      },
    });
  };

  return {
    mutateAddPet,
    handleAddPet,
    isPending,
    error,
    availablePets,
    isLoadingPets,
    petsError,
    refetchPets,
  };
});

export default IntroduceContainer;
