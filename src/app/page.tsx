import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import ProfileSection from "@/components/ProfileSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Global UI chrome */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Sidebar />

      {/* Page content */}
      <main>
        <HeroSection />
        <ProfileSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
