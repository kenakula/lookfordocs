import { useCallback } from 'react';
import { Control } from 'react-hook-form';
import { Typography, Collapse, Button } from '@mui/material';
import { ClinicsFilterFormModel } from '@/shared/types';
import { getGroupFiltersCount } from '@/shared/assets';
import { FiltersCounter } from '@/components';
import { StyledFilterGroup, StyledFilterGroupTop } from './styled-components';
import { FilterCheckbox, ClinicsFilterCheckboxName } from './filter-checkbox';

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
  formControl: Control<ClinicsFilterFormModel, any>;
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
  const checkedCount = getGroupFiltersCount(formControl._formValues[name]);

  const getItemName = useCallback((item: IList): string => {
    if (item.name) {
      return item.name;
    }

    if (item.title) {
      return item.title;
    }

    return '';
  }, []);

  return (
    <StyledFilterGroup id={`${name}-group`}>
      <StyledFilterGroupTop>
        <Typography variant="h3">{title}</Typography>
        {checkedCount > 0 ? <FiltersCounter value={checkedCount} /> : null}
      </StyledFilterGroupTop>

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
            name={`${name}.${index}` as ClinicsFilterCheckboxName}
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
