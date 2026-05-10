import { UsersIcon, Building2Icon, HomeIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const branches = [
  {
    title: 'Elected Officials',
    description:
      'The elected leadership of the Executive and Legislative branches, responsible for policy implementation and law-making.',
    icon: UsersIcon,
    path: '/government/elected-officials',
    category: 'Leadership',
  },
  {
    title: 'Municipal Offices',
    description:
      'Municipal departments and agencies responsible for specific areas of governance.',
    icon: Building2Icon,
    path: '/government/municipal-offices',
    category: 'Administrative',
  },
  {
    title: 'Barangays',
    description:
      'Local government units within the municipality, led by elected officials who manage community-level services and programs.',
    icon: HomeIcon,
    path: '/government/barangays',
    category: 'Local Units',
  },
];

const GovernmentNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="hidden md:grid grid-cols-3 gap-4">
      {branches.map(branch => {
        const isActive = currentPath.startsWith(branch.path);
        const Icon = branch.icon;
        return (
          <Link
            key={branch.path}
            to={branch.path}
            aria-label={`View ${branch.title}`}
            className={classNames(
              'group relative flex min-h-40 flex-col justify-between rounded-2xl border-1 p-4 transition-all duration-300',
              isActive
                ? 'border-primary-500 shadow-sm text-primary-900'
                : 'hover:border-primary-200 border-gray-200 bg-white text-gray-900 shadow-sm hover:shadow-sm'
            )}
            state={{ scrollToContent: true }}
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={classNames(
                    'rounded-xl p-2.5 shadow-sm transition-colors',
                    isActive
                      ? 'bg-white/20 text-primary-900'
                      : 'bg-primary-50 text-primary-600 border-primary-500'
                  )}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={classNames(
                    'text-[10px] font-bold tracking-[0.2em] uppercase',
                    isActive ? 'text-primary-900' : 'text-gray-400'
                  )}
                >
                  {branch.category}
                </span>
              </div>
              <Heading
                level={4}
                className={classNames(
                  'text-xl leading-tight tracking-tight',
                  isActive ? 'text-primary-900' : 'text-gray-900'
                )}
              >
                {branch.title}
              </Heading>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Text
                className={classNames(
                  'line-clamp-2 pr-6 text-xs leading-relaxed font-medium',
                  isActive ? 'text-primary-900' : 'text-gray-500'
                )}
              >
                {branch.description}
              </Text>
              <ChevronRight
                className={classNames(
                  'h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1',
                  isActive ? 'text-primary-900' : 'text-gray-400'
                )}
                aria-hidden="true"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default GovernmentNav;
