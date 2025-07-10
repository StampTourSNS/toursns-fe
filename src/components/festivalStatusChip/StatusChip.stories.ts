import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StatusChip, { StatusType } from './StatusChip';

const meta: Meta<typeof StatusChip> = {
  title: 'Component/StatusChip',
  component: StatusChip,
};

export default meta;

type Story = StoryObj<typeof StatusChip>;

export const Ongoing: Story = {
  args: {
    status: 'Ongoing',
  },
};

export const Scheduled: Story = {
  args: {
    status: 'Scheduled',
  },
};

export const End: Story = {
  args: {
    status: 'End',
  },
};
