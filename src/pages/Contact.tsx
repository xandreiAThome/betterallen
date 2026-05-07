import SEO from '../components/SEO';
import PageBanner from '@/components/ui/PageBanner';
import Section from '../components/ui/Section';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { resolveLucideIcon } from '../lib/utils';
import hotlinesData from '../data/hotlines.json';
import { FacebookIcon } from 'lucide-react';

const Contact = () => {
  const lguName = import.meta.env.VITE_GOVERNMENT_NAME || 'Local Government';
  const dummyEmail = import.meta.env.VITE_CONTACT_EMAIL;
  const dummyContact = import.meta.env.VITE_CONTACT_PHONE;
  const fb = import.meta.env.VITE_FACEBOOK_URL;

  return (
    <>
      <SEO
        title={`Contact Us - ${lguName}`}
        description={`Contact information and emergency hotlines for ${lguName}`}
      />
      <PageBanner
        title="Contact Us"
        description="Get in touch with us and access emergency hotlines."
        hideSearch={true}
      />

      <Section className="py-12" maxWidth="6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 rounded-full bg-primary-100 text-primary-600">
                  {(() => {
                    const MailIcon = resolveLucideIcon('Mail');
                    return <MailIcon className="sm:w-6 sm:h-6 w-5 h-5" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Email Address
                  </h3>
                  <a
                    href={`mailto:${dummyEmail}`}
                    className="text-gray-700 hover:text-primary-600 text-sm sm:text-base"
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
                <div className="flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 rounded-full bg-primary-100 text-primary-600">
                  {(() => {
                    const PhoneIcon = resolveLucideIcon('Phone');
                    return <PhoneIcon className="sm:w-6 sm:h-6 w-5 h-5" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Contact Number
                  </h3>
                  <a
                    href={`tel:${dummyContact}`}
                    className="text-gray-700 hover:text-primary-600 text-sm sm:text-base"
                  >
                    {dummyContact}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center sm:w-12 sm:h-12 w-8 h-8 rounded-full bg-primary-100 text-primary-600">
                  <FacebookIcon className="sm:w-6 sm:h-6 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Facebook Page
                  </h3>
                  <a className="text-primary-700" href={fb}>
                    {fb}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <Card>
            <CardContent className="p-0!">
              <div className="w-full">
                <div className="w-full bg-primary-600 text-white px-6 py-4 rounded-t-md">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">Office Hours</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="p-6 flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600">
                      {(() => {
                        const Icon = resolveLucideIcon('Clock');
                        return <Icon className="w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Monday - Friday
                      </div>
                      <div className="text-sm text-gray-700">
                        8:00 AM - 5:00 PM
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600">
                      {(() => {
                        const Icon = resolveLucideIcon('Coffee');
                        return <Icon className="w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Lunch Break
                      </div>
                      <div className="text-sm text-gray-700">
                        12:00 NN - 1:00 PM
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600">
                      {(() => {
                        const Icon = resolveLucideIcon('Calendar');
                        return <Icon className="w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Closed
                      </div>
                      <div className="text-sm text-gray-700">
                        Weekends, National, and Local Holidays
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Emergency Hotlines
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotlinesData.hotlines.map(hotline => {
            const Icon = resolveLucideIcon(hotline.icon);
            return (
              <Card key={hotline.slug} hoverable className="h-full">
                <CardContent className="">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-50 text-red-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      {hotline.name}
                    </h3>
                    <a
                      href={`tel:${hotline.number}`}
                      className="font-mono text-xl font-bold text-red-600 hover:text-red-700"
                    >
                      {hotline.number}
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
};

export default Contact;
