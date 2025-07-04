import RankUser from '@/components/rankUserProfile/RankUser';

export default function Home() {
  return (
    <div>
      <main>
        <h1>Hello World</h1>
        <RankUser imageUrl="" name="김철수" cnt={10} />
      </main>
    </div>
  );
}
