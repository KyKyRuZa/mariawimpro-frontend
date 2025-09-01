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
const MainPage = () => {
  return (
    <>
      <Header />
      <WelcomeScreen />

      <section id="forma-obucheniya"><TrainingPage /></section>
      <section id="o-nas"><About /></section>
      <section><Advantage /></section>
      <section id="trenery"><CoachesPage /></section>
      <section id="prays"><PricingPage /></section>
      <section id="novosti"><NewsPage /></section>
      <section><ReviewsPage /></section>
      <section id="kontakty"><MapPage /></section>
       <BotWidget /> 
      <Footer />
    </>
  );
};

export default MainPage;
