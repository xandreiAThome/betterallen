import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { resolveLucideIcon } from '../../lib/utils';
import { Button } from '../ui/button';

const ContactPreviewSection = () => {
  const dummyEmail = 'contact@lgu-example.gov.ph';
  const dummyContact = '(02) 1234-5678';

  return (
    <Section className="py-16 bg-gray-50" maxWidth="7xl">
      <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-2 text-gray-600">
            Get in touch or access emergency hotlines.
          </p>
        </div>
        <Link to="/contact" className="hidden md:block">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  href={`mailto:${dummyEmail}`}
                  className="text-gray-600 hover:text-primary-600"
                >
                  {dummyEmail}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <p className="text-gray-600">{dummyContact}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link to="/contact">
          <Button variant="outline" className="w-full">
            View All
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default ContactPreviewSection;
