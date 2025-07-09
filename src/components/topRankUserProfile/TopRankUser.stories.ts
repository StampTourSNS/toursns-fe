import type { Meta, StoryObj } from '@storybook/react';

import TopRankUser from './TopRankUser';

const meta = {
  title: 'Component/TopRankUser',
  component: TopRankUser,
  parameters: {
    layout: 'padded',
    padding: '16px',
  },
  tags: ['autodocs'],
  argTypes: {
    cnt: {
      control: { type: 'number' },
      description: '개수',
    },
    imageUrl: {
      control: { type: 'text' },
      description: '프로필 이미지 URL',
    },
    name: {
      control: { type: 'text' },
      description: '사용자 이름',
    },
  },
} satisfies Meta<typeof TopRankUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {
  args: {
    cnt: 10,
    imageUrl: 'https://picsum.photos/100/100',
    name: '김철수',
  },
};

export const NoProfile: Story = {
  args: {
    cnt: 10,
    imageUrl: '',
    name: '김철수',
  },
};
