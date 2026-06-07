import { Booking, createBooking } from "@/utils/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertBooking = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (booking: Booking) => createBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookedSlots"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return mutation;
};