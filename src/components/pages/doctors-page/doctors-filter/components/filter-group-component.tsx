import { Typography, Collapse, Button } from '@mui/material';
import { Control } from 'react-hook-form';
import { DoctorsFilterCheckboxName, FilterCheckbox } from './filter-checkbox';
import { StyledFilterGroup } from './styled-components';
import { FilterFormModel } from '@/shared/types';

const SHOWED_CHECKBOXES_COUNT = 5;
const ITEM_HEIGHT = 36;

interface IList {
  id: number;
  name?: string;
  title?: string;
}

interface Props<T> {
  title: string;
  id: string;
  expandedBlocks: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<FilterFormModel, any>;
  handleExpandGroup: (id: string) => void;
  list: T[];
  name: string;
}

export const FilterGroupComponent = <T extends IList>({
  title,
  expandedBlocks,
  formControl,
  handleExpandGroup,
  id,
  list,
  name,
}: Props<T>): JSX.Element => {
  const needToExpand = list.length > SHOWED_CHECKBOXES_COUNT;

  const getItemName = (item: IList): string => {
    if (item.name) {
      return item.name;
    }
    if (item.title) {
      return item.title;
    }

    return '';
  };

  return (
    <StyledFilterGroup id={`${name}-group`}>
      <Typography variant="h3">{title}</Typography>
      <Collapse
        collapsedSize={
          needToExpand ? ITEM_HEIGHT * SHOWED_CHECKBOXES_COUNT : undefined
        }
        in={expandedBlocks.includes(id) || !needToExpand}
      >
        {list.map((item, index: number) => (
          <FilterCheckbox
            key={item.id}
            value={item.id.toString()}
            formControl={formControl}
            name={`${name}.${index}` as DoctorsFilterCheckboxName}
            label={getItemName(item)}
          />
        ))}
      </Collapse>
      {needToExpand ? (
        <Button
          type="button"
          variant="text"
          disableFocusRipple
          disableRipple
          onClick={() => handleExpandGroup(id)}
          className="collapse-button"
        >
          {expandedBlocks.includes(id) ? 'Скрыть' : 'Показать все'}
        </Button>
      ) : null}
    </StyledFilterGroup>
  );
};
