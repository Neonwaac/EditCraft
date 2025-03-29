import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";
import TemplatesLayout from "../../layouts/TemplatesLayout/TemplatesLayout";
import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";

function HomePage() {
  return (
    <section className="home-page">
      <NavigationBar />
      <WelcomeBanner />
      <TemplatesLayout />
      <AppFooter />
    </section>
  );
}

export default HomePage;