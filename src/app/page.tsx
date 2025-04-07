import LandingHero from "@/components/Landing/LandingHero";
import KeyFeatures from "@/components/Landing/KeyFeatures";
import Testimonials from "@/components/Landing/Testimonials";
import GetStarted from "@/components/Landing/GetStarted";
import WhyUs from "@/components/Landing/WhyUs";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
export default function Home() {
  // if (localStorage.getItem("user")) {
  //   window.location.href = "/home";
  // }
  return (
    <>
      <Header />
      <LandingHero />
      <WhyUs />
      <KeyFeatures />
      <Testimonials />
      <GetStarted />
      <Footer />
    </>
  );
}
