import SEO from '../components/SEO';
import PageBanner from '../components/ui/PageBanner';
import Section from '../components/ui/Section';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { resolveLucideIcon } from '../lib/utils';
import hotlinesData from '../data/hotlines.json';

const Contact = () => {
  const lguName = import.meta.env.VITE_GOVERNMENT_NAME || 'Local Government';
  const dummyEmail = 'contact@lgu-example.gov.ph';
  const dummyContact = '(02) 1234-5678';

  return (
    <>
      <SEO
        title={`Contact Us - ${lguName}`}
        description={`Contact information and emergency hotlines for ${lguName}`}
      />
      <PageBanner
        title="Contact Us"
        description="Get in touch with us and access emergency hotlines."
      />

      <Section className="py-12" maxWidth="7xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Get In Touch</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mb-12">
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

        <h2 className="mb-6 text-2xl font-bold text-gray-900">Office Hours</h2>
        <div className="mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600">
                  {(() => {
                    const ClockIcon = resolveLucideIcon('Clock');
                    return <ClockIcon className="w-6 h-6" />;
                  })()}
                </div>
                <div className="w-full">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">
                    Schedule
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-gray-600 border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-2 pr-6 font-medium text-gray-900 whitespace-nowrap">
                            Monday - Friday
                          </th>
                          <th className="py-2 pr-6 font-medium text-gray-900 whitespace-nowrap">
                            Lunch Break
                          </th>
                          <th className="py-2 font-medium text-gray-900 whitespace-nowrap">
                            Closed
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-3 pr-6">8:00 AM - 5:00 PM</td>
                          <td className="py-3 pr-6">12:00 NN - 1:00 PM</td>
                          <td className="py-3">
                            Weekends, National, and Local Holidays
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-50 text-red-600">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      {hotline.name}
                    </h3>
                    <p className="font-mono text-xl font-bold text-red-600">
                      {hotline.number}
                    </p>
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
