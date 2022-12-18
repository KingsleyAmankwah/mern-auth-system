import NavBar from "../components/NavBar";

function LandingPage() {
  return (
    <>
      <NavBar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen font-[system-ui]">
          <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full bg-blueGray-800  bg-full bg-center bg-cover bg-[url('./images/register_bg_2.png')] "></div>
        </section>
      </main>
    </>
  );
}

export default LandingPage;
