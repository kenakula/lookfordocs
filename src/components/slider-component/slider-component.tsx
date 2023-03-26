import { IconButton, styled } from '@mui/material';
import { SwiperOptions } from 'swiper';
import { Swiper } from 'swiper/react';
import { IconArrowLeft } from '../icons';
import { IconArrowRight } from '../icons/icon-arrow-right';

const StyledSliderWrapper = styled('div')(({ theme }) => ({
  '.swiper-wrapper': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  '.slider-buttons': {
    position: 'absolute',
    display: 'none',
    justifyContent: 'space-between',
    top: '56%',
    left: -50,
    right: -50,
    transform: 'translateY(-50%)',

    [theme.breakpoints.up('xl')]: {
      display: 'flex',
    },
  },

  '.slider-button': {
    opacity: 0.7,
    transition: theme.transitions.create('opacity'),
    borderRadius: '50%',

    '&.swiper-button-disabled': {
      opacity: 0.3,
      pointerEvents: 'none',
    },

    '&:hover': {
      opacity: 1,
    },

    '&:active': {
      backgroundColor: theme.palette.misc.light,
    },

    '&:focus-visible': {
      outline: `4px solid ${theme.palette.primary.light}`,
    },
  },

  '.swiper-pagination': {
    '&.swiper-pagination': {
      bottom: 0,
    },

    '.swiper-pagination-bullet': {
      backgroundColor: theme.palette.primary.light,
      width: 8,
      height: 8,
      opacity: 1,
    },

    '.swiper-pagination-bullet-active': {
      backgroundColor: theme.palette.primary.main,
    },

    '.swiper-pagination-bullet-active-next, .swiper-pagination-bullet-active-prev':
      {
        transform: 'scale(1)',
      },

    '.swiper-pagination-bullet-active-next-next, .swiper-pagination-bullet-active-prev-prev':
      {
        transform: 'scale(0.66)',
        opacity: 0.6,
      },

    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
}));

interface Props {
  options: SwiperOptions;
  children: JSX.Element[] | JSX.Element;
}

export const SliderComponent = ({ options, children }: Props): JSX.Element => {
  return (
    <StyledSliderWrapper>
      <Swiper wrapperTag="ul" {...options}>
        {children}
      </Swiper>
      <div className="slider-buttons">
        <IconButton
          className="button-prev slider-button"
          disableFocusRipple
          disableRipple
        >
          <IconArrowLeft />
        </IconButton>
        <IconButton
          className="button-next slider-button"
          disableFocusRipple
          disableRipple
        >
          <IconArrowRight />
        </IconButton>
      </div>
    </StyledSliderWrapper>
  );
};
