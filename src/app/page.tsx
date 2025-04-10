import AppBannerHome from '@/components/AppBannerHome';
import AppTitle from '@/components/AppTitle';
import AppMainEvents from '@/components/AppMainEvents';
import AppContainer from '@/components/AppContainer';

export default function Home() {
  return (
    <AppContainer variant="xl">
      <main className="">
        <AppBannerHome />
        <AppTitle>Events coming soon</AppTitle>
        <AppMainEvents />
      </main>
      <footer></footer>
    </AppContainer>
  );
}
