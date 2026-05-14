import { UsersIcon, Landmark } from 'lucide-react';
import SEO from '../../../components/SEO';
import { Heading } from '../../../components/ui/Heading';
import { Text } from '../../../components/ui/Text';
import {
  executiveOfficials,
  legislativeOfficials,
  type ExecutiveOfficial,
  type LegislativeOfficial,
} from '../../../data/yamlLoader';
import ElectedLeaderCard from '../../../components/gov-components/ElectedLeaderCard';
import CouncilMemberCard from '../../../components/gov-components/CouncilMemberCard';

type CouncilMember = LegislativeOfficial;

export default function ElectedOfficials() {
  const executiveList = executiveOfficials as ExecutiveOfficial[];
  const legislativeList = legislativeOfficials as CouncilMember[];
  const electedLeaders = executiveList.filter(o => o.isElected !== false);

  return (
    <>
      <SEO
        title="Elected Officials"
        description="Meet the elected officials of the municipality."
      />

      <main
        className="p-4 md:p-6 md:space-y-12 max-w-7xl mx-auto"
        aria-label="Elected officials directory"
      >
        <section aria-label="Executive Branch">
          <div className="text-center mb-6">
            <Heading level={2}>Elected Officials</Heading>
            <Text size="sm" className="text-gray-600 mt-2 mx-auto">
              The elected leaders and legislative body of the Municipal
              Government.
            </Text>
          </div>

          {/* ── SECTION 1: EXECUTIVE BRANCH ── */}
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
            <Landmark
              className="h-4 w-4 text-primary-500 shrink-0"
              aria-hidden="true"
            />
            <Heading
              level={6}
              className="text-gray-500 text-xs! mb-0 font-bold tracking-widest uppercase"
            >
              Executive Branch
            </Heading>
          </div>
          {/*
          Mobile  → single column
          sm      → 2 columns (mayor + vice mayor side by side)
          lg      → keeps 2 columns (cards are wide enough to read)
        */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {electedLeaders.map((leader, idx) => (
              <ElectedLeaderCard
                key={leader.slug || leader.name || idx}
                leader={leader}
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 2: LEGISLATIVE BRANCH ── */}
        {legislativeList.length > 0 && (
          <section aria-label="Sangguniang Bayan - Legislative Branch">
            <div className="flex items-center gap-3 mb-5 border-yellow border-gray-100 pb-4">
              <UsersIcon
                className="h-4 w-4 text-primary-500 shrink-0"
                aria-hidden="true"
              />
              <Heading
                level={6}
                className="text-gray-500 text-xs! mb-0 font-bold tracking-widest uppercase"
              >
                Sangguniang Bayan
              </Heading>
            </div>

            {/*
            Mobile  → 1 columns (compact council cards fit at ~160 px each)
            md      → 2 columns
            xl      → 3 columns
          */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 items-stretch">
              {legislativeList.map((member, idx) => (
                <CouncilMemberCard key={member.name || idx} member={member} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
