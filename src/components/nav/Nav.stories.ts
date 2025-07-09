import type { Meta, StoryObj } from '@storybook/react';

import Nav from './Nav';

const meta = {
  title: 'Component/Nav',
  component: Nav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: { isActive: Boolean },
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    isActive: true,
  },
};

export const InActive: Story = {
  args: {
    isActive: false,
  },
};
