import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  tourismCategories,
  getTourismPlaces,
  type Place,
} from '../data/tourismLoader';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';
import { resolveLucideIcon } from '../lib/utils';
import { MapPin } from 'lucide-react';

const Tourism: React.FC = () => {
  const { category } = useParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategory = () => {
    return tourismCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = resolveLucideIcon(categoryData?.icon);

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getTourismPlaces(category)
        .then(setPlaces)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Tourism"
          description={`Discover the best tourist spots, accommodations, and attractions in ${import.meta.env.VITE_GOVERNMENT_NAME}. Beaches, resorts, cafes, hotels, and more.`}
          keywords="tourism, travel, beaches, resorts, hotels, dining, attractions, tourist spots"
        />
        <Section className="p-3 mb-12">
          <Heading>Tourism</Heading>
          <Text className="text-gray-600 mb-6">
            Discover the best places to visit, stay, and dine in{' '}
            {import.meta.env.VITE_GOVERNMENT_NAME}.
          </Text>

          {tourismCategories.categories.length === 0 ? (
            <Text className="text-gray-500 text-center py-8">
              No tourism categories available at the moment.
            </Text>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tourismCategories.categories.map(cat => {
                const CatIcon = resolveLucideIcon(cat.icon);
                return (
                  <Link key={cat.slug} to={`/tourism/${cat.slug}`}>
                    <Card
                      hoverable
                      className="h-full border-t-4 border-primary-500"
                    >
                      <CardContent>
                        <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 w-fit">
                          <CatIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {cat.category}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {cat.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </Section>
      </>
    );
  }

  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tourism', href: '/tourism' },
            { label: category },
          ]}
          className="mb-8"
        />
        <Banner
          type="error"
          title="Category not found"
          description="The tourism category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={`${categoryData.category} | Tourism`}
        description={categoryData.description}
        keywords={`${categoryData.category}, tourism, travel, attractions, ${import.meta.env.VITE_GOVERNMENT_NAME}`}
      />
      <Section className="p-3 mb-12" maxWidth="full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tourism', href: '/tourism' },
            { label: categoryData.category },
          ]}
          className="mb-8"
        />
        <Icon className="h-8 w-8 mb-4 text-primary-600 rounded-md" />
        <Heading>{categoryData.category}</Heading>
        <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Text>Loading places...</Text>
          </div>
        ) : places.length === 0 ? (
          <Text className="text-gray-500 text-center py-8">
            No places listed for this category yet.
          </Text>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.map(place => (
              <Card
                key={place.slug}
                className="h-full drop-shadow-sm hover:border-primary-200 transition-colors duration-200"
              >
                <CardContent className="p-0!">
                  {place.image && (
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-48 object-cover rounded-t-md"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {place.description}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-sm mb-2 mr-2 ${place.categoryColor ?? 'bg-primary-100 text-primary-700'}`}
                    >
                      {place.category ?? categoryData.category}
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-medium rounded-sm bg-gray-100 text-gray-800 mb-2">
                      <MapPin size={12} />
                      {place.barangay}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {place.mapsUrl && (
                        <a
                          href={place.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          View on Maps
                        </a>
                      )}
                      {place.contact && (
                        <span className="text-xs text-gray-600">
                          {place.contact}
                        </span>
                      )}
                      {place.socialUrl && (
                        <a
                          href={place.socialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          Social Media
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
};

export default Tourism;
