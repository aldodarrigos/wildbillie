export default function BannerHome() {
  return (
    <div id="banner-container" style={styles.bannerContainer} className=" w-full h-screen -mt-24">
        <div className="flex flex-row pt-32 pl-20">
            <div id="banner-content">
                <h1 className="text-white text-4xl font-bold">Kia Ora! <br />Ready to find your
                next challenge?</h1>
            </div>
            <div id="banner-map">

            </div>
        </div>
    </div>
  );
}



const styles = {
    bannerContainer: {
        backgroundImage: "url('/img/bg-banner-home.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }
}