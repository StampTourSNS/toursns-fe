import { Meta, StoryObj } from '@storybook/react';
import CountChip from './countChip';

const meta: Meta<typeof CountChip> = {
  title: 'Component/CountChip',
  component: CountChip,
};

export default meta;

type Story = StoryObj<typeof CountChip>;

export const Zero: Story = {
  args: {
    stampCount: 0,
  },
};

export const One: Story = {
  args: {
    stampCount: 1,
  },
};

export const Many: Story = {
  args: {
    stampCount: 5,
  },
};
