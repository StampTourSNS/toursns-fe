// 축제 관련 타입
export interface Festival {
  id: number;
  name: string;
  image: string | null;
  address: string;
  startDate: string;
  endDate: string;
  festivalRegion: string;
  active: string; // JSON 데이터에서 문자열로 되어 있음
  nx: number;
  ny: number;
  festivalNumber: string;
  recommendFood: RecommendFood[];
  recommendTour: RecommendTour[];
}

// 추천 음식점 타입
export interface RecommendFood {
  id: number;
  name: string;
  image: string;
}

// 추천 관광지 타입
export interface RecommendTour {
  id: number;
  name: string;
  image: string;
}

// 사용자 타입
export interface Users {
  id: number;
  name: string;
  image: string | null;
  email: string;
}

// 게시글 타입
export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  userId: number;
  festivalId: number;
  createdAt: string;
  updatedAt: string;
}

// 검색 결과 타입
export interface SearchResult {
  type: 'festival' | 'user' | 'post';
  id: number;
  title: string;
  image: string;
  description?: string;
}

// 전체 데이터 타입
export interface SearchData {
  festivals: Festival[];
  users: Users[];
  posts: Post[];
}
