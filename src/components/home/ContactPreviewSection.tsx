import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { resolveLucideIcon } from '../../lib/utils';

const ContactPreviewSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <Section className="py-16 bg-white" maxWidth="7xl">
      <motion.div
        className="flex flex-col items-center justify-between mb-10 md:flex-row"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-2 text-gray-600">
            Get in touch or access emergency hotlines.
          </p>
        </div>
        <Link
          to="/contact"
          className="hidden sm:inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          View All →
        </Link>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600">
                  {(() => {
                    const MailIcon = resolveLucideIcon('Mail');
                    return <MailIcon className="w-6 h-6" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Email Address
                  </h3>
                  <a
                    href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                    className="text-gray-600 hover:text-primary-600 sm:text-base text-sm"
                  >
                    {import.meta.env.VITE_CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600">
                  {(() => {
                    const PhoneIcon = resolveLucideIcon('Phone');
                    return <PhoneIcon className="w-6 h-6" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Contact Number
                  </h3>
                  <p className="text-gray-600">
                    {import.meta.env.VITE_CONTACT_PHONE}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8 text-center md:hidden"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Link
          to="/contact"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          View All →
        </Link>
      </motion.div>
    </Section>
  );
};

export default ContactPreviewSection;
