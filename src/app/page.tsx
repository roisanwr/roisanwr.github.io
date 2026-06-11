import Navbar from "@/components/Navbar";
import HeroSignal from "@/components/HeroSignal";
import BroadcastTicker from "@/components/BroadcastTicker";
import AboutSignal from "@/components/AboutSignal";
import TerminalExperience from "@/components/TerminalExperience";
import ExpandableProjects from "@/components/ExpandableProjects";
import ContactSignal from "@/components/ContactSignal";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import HUDStatus from "@/components/HUDStatus";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <HUDStatus />
      <Navbar />

      <main>
        <HeroSignal />
        <BroadcastTicker />
        <AboutSignal />
        <BroadcastTicker
          items={[
            "Experience",
            "Lead Engineer",
            "Studio Developer",
            "UI Engineer",
            "Upstatement",
            "Apple",
            "Scout",
          ]}
          speed={25}
        />
        <TerminalExperience />
        <BroadcastTicker
          items={[
            "Selected Work",
            "Open Source",
            "Side Projects",
            "Shipped to Production",
            "Built with Passion",
          ]}
          speed={20}
        />
        <ExpandableProjects />
        <ContactSignal />
      </main>

      <Footer />
    </>
  );
}
