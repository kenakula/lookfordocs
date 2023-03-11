import { ChipComponent } from '@/components';
import { IconFace } from '@/components/icons/icon-face';
import { IChip, IDoctorNosology } from '@/shared/types';
import { Box, Typography } from '@mui/material';
import { StyledDoctorNosology } from './styled-components';

interface Props {
  data: IDoctorNosology;
}

export const DetailedDoctorNosology = ({
  data: { group, list },
}: Props): JSX.Element => {
  const chipsList: IChip[] = list
    .split(',')
    .filter(item => item.trim().length)
    .map(item => ({ text: item.trim(), variant: 'outlined', size: 'medium' }));

  return (
    <StyledDoctorNosology>
      <Box className="nosology-header">
        <span className="nosology-icon">
          <IconFace />
        </span>
        <Box className="nosology-header-info">
          <Typography variant="h4">{group}</Typography>
          <Typography variant="caption">5 проблем</Typography>
        </Box>
      </Box>
      <Box className="nosology-list" component="ul">
        {chipsList.map((chip, index) => (
          <li key={`${chip.text}-${index}`}>
            <ChipComponent data={chip} />
          </li>
        ))}
      </Box>
    </StyledDoctorNosology>
  );
};
