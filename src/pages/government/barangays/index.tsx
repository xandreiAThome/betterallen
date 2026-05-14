import { MapPinIcon, User2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card, CardContent } from '@/components/ui/Card';
import Banner from '@/components/ui/Banner';
import { toTitleCase } from '@/lib/stringUtils';
import { barangays, type Barangay } from '@/data/yamlLoader';

const sortedBarangays = (barangays as Barangay[])
  .slice()
  .sort((a, b) => a.barangay_name.localeCompare(b.barangay_name));

export default function BarangaysIndex() {
  return (
    <>
      <SEO
        title="Barangays"
        description={`Browse the ${sortedBarangays.length} component barangays of the municipality, including officials and contact information.`}
        keywords="barangays, local government units, community, municipal subdivisions"
      />
      <main
        className="p-4 md:p-6 md:space-y-12 max-w-7xl mx-auto"
        aria-label="Barangays directory"
      >
        <div className="text-center mb-6">
          <Heading level={2}>Barangays</Heading>
          <Text size="sm" className="text-gray-600 mt-2 mx-auto">
            The component barangays of the municipality.
          </Text>
        </div>

        <div className="mb-5 flex flex-col md:flex-row md:items-center gap-4">
          <Text
            size="xs"
            className="text-gray-500 font-bold tracking-widest uppercase"
          >
            {sortedBarangays.length} component barangays
          </Text>
        </div>

        {sortedBarangays.length === 0 ? (
          <Banner type="info" description="No barangays found." />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedBarangays.map(brgy => {
              const punong = brgy.officials?.find(
                o => o.role && o.role.includes('Punong Barangay')
              );
              const skChair = brgy.officials?.find(
                o => o.role && o.role.includes('SK Chairperson')
              );

              return (
                <article
                  key={brgy.slug}
                  className="h-full"
                  aria-label={`${toTitleCase(brgy.barangay_name.replace('BARANGAY ', ''))} barangay profile`}
                >
                  <Card className="border border-gray-200 shadow-sm flex h-full flex-col rounded-xl bg-white hover:border-primary-200">
                    <CardContent className="flex h-full flex-col space-y-4 p-4">
                      {/* Header Row */}
                      <div className="flex items-start gap-3">
                        <div
                          className="bg-kapwa-bg-surface text-primary-400 border-primary-400 shrink-0 rounded-lg border p-2 shadow-sm"
                          aria-hidden="true"
                        >
                          <MapPinIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Heading
                            level={5}
                            className="text-kapwa-text-strong text-base leading-tight font-bold"
                          >
                            {toTitleCase(
                              brgy.barangay_name.replace('BARANGAY ', '')
                            )}
                          </Heading>
                          <Text className="text-kapwa-text-support mt-0.5 text-xs font-bold tracking-widest uppercase">
                            Barangay Profile
                          </Text>
                        </div>
                      </div>

                      {/* Punong Barangay Row */}
                      <div className="border-kapwa-border-weak bg-kapwa-bg-surface-raised/50 flex items-center gap-2 rounded-xl border px-3 py-2">
                        <div
                          className="border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-disabled shrink-0 rounded-full border p-1 shadow-sm"
                          aria-hidden="true"
                        >
                          <User2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <Text
                            size="xs"
                            className="text-kapwa-text-support text-[10px]! mb-0.5 leading-none font-bold tracking-tighter uppercase"
                          >
                            Punong Barangay
                          </Text>
                          <Text
                            size="sm"
                            className="text-gray-900 leading-tight font-bold"
                          >
                            {punong?.name
                              ? toTitleCase(punong.name)
                              : 'Awaiting Data'}
                          </Text>
                          {(punong?.contact || punong?.email) && (
                            <div className="mt-1 flex flex-col gap-0.5 text-[11px] text-kapwa-text-support">
                              {punong?.contact && (
                                <span className="truncate">
                                  {punong.contact}
                                </span>
                              )}
                              {punong?.email && (
                                <span className="truncate">{punong.email}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* SK Chairperson Row */}
                      <div className="border-kapwa-border-weak bg-kapwa-bg-surface-raised/50 flex items-center gap-2 rounded-xl border px-3 py-2">
                        <div
                          className="border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-disabled shrink-0 rounded-full border p-1 shadow-sm"
                          aria-hidden="true"
                        >
                          <User2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <Text
                            size="xs"
                            className="text-kapwa-text-support text-[10px]! mb-0.5 leading-none font-bold tracking-tighter uppercase"
                          >
                            SK Chairperson
                          </Text>
                          <Text
                            size="sm"
                            className="text-gray-900 leading-tight font-bold"
                          >
                            {skChair?.name
                              ? toTitleCase(skChair.name)
                              : 'Awaiting Data'}
                          </Text>
                          {(skChair?.contact || skChair?.email) && (
                            <div className="mt-1 flex flex-col gap-0.5 text-[11px] text-kapwa-text-support">
                              {skChair?.contact && (
                                <span className="truncate">
                                  {skChair.contact}
                                </span>
                              )}
                              {skChair?.email && (
                                <span className="truncate">
                                  {skChair.email}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
