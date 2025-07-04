import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Component/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    pageType: {
      control: { type: 'select' },
      options: ['home', 'sns', 'search'],
      description: '헤더의 페이지 타입',
    },
    festivalName: {
      control: { type: 'text' },
      description: '축제 이름 (sns 페이지에서 사용)',
    },
    isLogin: {
      control: { type: 'boolean' },
      description: '로그인 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 홈 페이지 - 로그인하지 않은 상태
export const HomeNotLoggedIn: Story = {
  args: {
    pageType: 'home',
    isLogin: false,
  },
};

// 홈 페이지 - 로그인한 상태
export const HomeLoggedIn: Story = {
  args: {
    pageType: 'home',
    isLogin: true,
  },
};

// SNS 페이지 - 축제 이름 있음
export const SnsWithFestivalName: Story = {
  args: {
    pageType: 'sns',
    festivalName: '부산국제영화제',
    isLogin: false,
  },
};

// 검색 페이지
export const Search: Story = {
  args: {
    pageType: 'search',
    isLogin: false,
  },
};
