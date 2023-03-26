import Link from 'next/link';
import { Avatar, ListItemButton, Typography } from '@mui/material';
import {
  CLINICS_PAGE,
  DOCTORS_PAGE,
  getHighlightedLetters,
  getImageUrl,
} from '@/shared/assets';
import {
  IClinic,
  ISmartSearchQuery,
  SmartSearchLocation,
} from '@/shared/types';

interface Props {
  location: SmartSearchLocation;
  useCustomQuery: boolean;
  handleChooseOptionCb: ((customQuery: ISmartSearchQuery) => void) | undefined;
  closeSearchBox: () => void;
  data: IClinic;
  searchString: string;
}

export const ClinicsItem = ({
  location,
  data: { id, name, address, image },
  useCustomQuery,
  handleChooseOptionCb,
  closeSearchBox,
  searchString,
}: Props): JSX.Element => {
  if (location !== 'clinics') {
    return (
      <ListItemButton
        key={`clinic-${id}`}
        className="complex-item"
        component={Link}
        href={`${DOCTORS_PAGE}?clinic=${id}`}
        onClick={e => {
          if (useCustomQuery && handleChooseOptionCb) {
            e.preventDefault();
            handleChooseOptionCb({
              name: 'clinics',
              value: id.toString(),
            });
            closeSearchBox();
          } else {
            closeSearchBox();
          }
        }}
      >
        <Avatar
          sx={{ width: 40, height: 40 }}
          variant="rounded"
          src={getImageUrl(image.id, name, 'width=80&height=80')}
        />
        <div className="complex-item-info">
          <Typography>{getHighlightedLetters(name, searchString)}</Typography>
          <Typography variant="caption">{address}</Typography>
        </div>
      </ListItemButton>
    );
  }

  return (
    <ListItemButton
      key={`clinic-${id}`}
      className="complex-item"
      component={Link}
      href={`${CLINICS_PAGE}/${id}`}
    >
      <Avatar
        sx={{ width: 40, height: 40 }}
        variant="rounded"
        src={getImageUrl(image.id, name, 'width=80&height=80')}
      />
      <div className="complex-item-info">
        <Typography>{getHighlightedLetters(name, searchString)}</Typography>
        <Typography variant="caption">{address}</Typography>
      </div>
    </ListItemButton>
  );
};
