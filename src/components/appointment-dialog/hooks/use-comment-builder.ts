import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RequestFormModel } from '@/shared/models';
import { IAppointment } from '@/shared/types';
import { getCommentMessage } from '../assets';

export const useCommentBuilder = (
  target: IAppointment | null,
  valueSetter: UseFormSetValue<RequestFormModel>,
) => {
  useEffect(() => {
    if (target) {
      valueSetter('comment', getCommentMessage(target));
    }

    return () => valueSetter('comment', '');
  }, [target, valueSetter]);
};
