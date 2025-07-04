import RankUser from '@/components/rankUserProfile/RankUser';

export default function Home() {
  return (
    <div>
      <main>
        <h1>Hello World</h1>
        <RankUser
          cnt={10}
          imageUrl="https://picsum.photos/100/100"
          name="김철수"
        />
      </main>
    </div>
  );
}
