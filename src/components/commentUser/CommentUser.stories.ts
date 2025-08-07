import type { Meta, StoryObj } from '@storybook/react';

import CommentUser from './CommentUser';

const meta = {
  title: 'Component/CommentUser',
  component: CommentUser,
  parameters: {
    layout: 'padded',
    padding: '16px',
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: { type: 'text' },
      description: '프로필 이미지 URL',
    },
    name: {
      control: { type: 'text' },
      description: '사용자 이름',
    },
    comment: {
      control: { type: 'text' },
      description: '댓글 내용',
    },
    isUser: {
      control: { type: 'boolean' },
      description: '현재 사용자의 댓글인지 여부',
    },
  },
} satisfies Meta<typeof CommentUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserIsMeWithImage: Story = {
  args: {
    imageUrl: 'https://picsum.photos/100/100',
    name: '김철수',
    comment: '안녕하세요',
    isUser: true,
    userId: 1,
  },
};

export const UserIsMeWithoutImage: Story = {
  args: {
    imageUrl: null,
    name: '김철수',
    comment: '안녕하세요',
    isUser: true,
    userId: 1,
  },
};

export const UserIsNotMeWithImage: Story = {
  args: {
    imageUrl: 'https://picsum.photos/100/100',
    name: '김철수',
    comment: '안녕하세요',
    isUser: false,
    userId: 1,
  },
};

export const UserIsNotMeWithoutImage: Story = {
  args: {
    imageUrl: null,
    name: '김철수',
    comment: '안녕하세요',
    isUser: false,
    userId: 1,
  },
};
