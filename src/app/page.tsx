import Header from '@/components/header/Header';

export default function Home() {
  return (
    <div>
      <main>
        <Header pageType="home" festivalName="축제이름" isLogin={true} />
        <h1>Hello World</h1>
      </main>
    </div>
  );
}
