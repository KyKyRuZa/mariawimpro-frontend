import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";

import WelcomeScreen from "../../components/pages/WelcomeScreen";
import TrainingPage from "../../components/pages/TrainingPage";
import About from "../../components/pages/About";
import Advantage from "../../components/pages/AdvantagePage";
import CoachesPage from "../../components/pages/CoachesPage";
import PricingPage from "../../components/pages/PricingPage";
import NewsPage from "../../components/pages/NewsPage";
import ReviewsPage from "../../components/pages/ReviewsPage";
import MapPage from "../../components/pages/MapPage";
import BotWidget from '../../components/UI/BotWidget';
import Certificates from "../../components/pages/Certificates";

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
  const { scrollTo, scrollToTop } = location.state || {};

  if (scrollToTop) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else if (scrollTo) {
    scroller.scrollTo(scrollTo, {
      duration: 800,
      smooth: 'easeInOutQuint',
      offset: -90,
    });
  } else {
    scroller.scrollTo('welcome', {
      duration: 800,
      smooth: 'easeInOutQuint',
      offset: -90,
    });
  }
}, []);

  return (
    <>
      <Header />
      <section id="welcome"><WelcomeScreen /></section>
      <section id="forma-obucheniya"><TrainingPage /></section>
      <section id="o-nas"><About /></section>
      <section><Advantage /></section>
      <section id="trenery"><CoachesPage /></section>
      <section id="prays"><PricingPage /></section>
      <section id="novosti"><NewsPage /></section>
      <section><ReviewsPage /></section>
      <section><Certificates/></section>
      {/* <section id="kontakty"><MapPage /></section> */}
      <BotWidget />
      <Footer />
    </>
  );
};

export default MainPage;