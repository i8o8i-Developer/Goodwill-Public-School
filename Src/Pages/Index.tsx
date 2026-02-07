import Layout from "@/Components/Layout/Layout";
import HeroSlider from "@/Components/Home/HeroSlider";
import WhyChooseUs from "@/Components/Home/WhyChooseUs";
import SchoolHighlights from "@/Components/Home/SchoolHighlights";
import LatestNotices from "@/Components/Home/LatestNotices";
import PrincipalMessage from "@/Components/Home/PrincipalMessage";
import GalleryPreview from "@/Components/Home/GalleryPreview";
import UpcomingEvents from "@/Components/Home/UpcomingEvents";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Index = () => {
  return (
    <Layout>
      <div className="-mb-2">
        <HeroSlider />
      </div>
        <motion.div initial="visible" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants} custom={1}>
          <WhyChooseUs />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants} custom={2}>
          <SchoolHighlights />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants} custom={3}>
          <PrincipalMessage />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants} custom={4}>
          <LatestNotices />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants} custom={5}>
          <UpcomingEvents />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants} custom={6}>
          <GalleryPreview />
        </motion.div>
      </Layout>
    );
};

export default Index;
