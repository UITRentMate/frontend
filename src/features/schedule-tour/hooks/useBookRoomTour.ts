import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleTourApi } from '../api/scheduleTourApi';
import { scheduleTourKeys } from './scheduleTourKeys';
import type { BookTourPayload, BookTourResponse } from '../types';

export function useBookRoomTour() {
  const queryClient = useQueryClient();

  return useMutation<BookTourResponse, Error, BookTourPayload>({
    mutationKey: scheduleTourKeys.mutations.book(),
    mutationFn: (payload: BookTourPayload) => scheduleTourApi.bookRoomTour(payload),
    onSuccess: (_, variables) => {
      // Invalidate slots cache cho ngày đặt lịch
      queryClient.invalidateQueries({
        queryKey: scheduleTourKeys.slots(variables.roomId, variables.date),
      });
    },
  });
}

export default useBookRoomTour;
