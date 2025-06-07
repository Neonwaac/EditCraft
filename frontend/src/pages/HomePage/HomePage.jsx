import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";
import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import TemplatesLayout from "../../layouts/TemplatesLayout/TemplatesLayout";

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
