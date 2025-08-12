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

  // 기존 리액트 방식
  // const { data: resData } = useQuery({
  //   queryKey: ["CommonControllerApi", "getCommonCodeList", "FIELD_OF_STUDY"],
  //   queryFn: () =>
  //     axiosApi(CommonControllerApi)
  //       .getCommonCodeList({ codetype: "FIELD_OF_STUDY" })
  //       .then((res) => res.data),
  //   enabled: isLogin && isEngSpec,
  // });

  // 미팅 데이터 생성 api
  //  const createMeeting = ({
  //   data,
  //   onSuccess,
  // }: {
  //   data: ReqEventDto;
  //   onSuccess?: () => void;
  // }) => {
  //   axiosApi(CalendarApi)
  //     .saveCounselingEvent({
  //       reqEventDto: data,
  //     })
  //     .then((res) => {
  //       setIsMeetingFetching(false);
  //       success(t("Meeting created successfully"));
  //       onSuccess?.();
  //       createMeetingModal.close();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

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
