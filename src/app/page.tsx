import AppBannerHome from '@/components/AppBannerHome';
import AppTitle from '@/components/AppTitle';
import AppMainEvents from '@/components/AppMainEvents';

export default function Home() {
  return (
    <div>
      <main className="">
        <AppBannerHome />
        <AppTitle>Events coming soon</AppTitle>
        <AppMainEvents />
      </main>
      <footer></footer>
    </div>
  );
}
