import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';
import { tourismCategories, getTourismPlaces } from '../../data/tourismLoader';
import type { Place } from '../../data/tourismLoader';
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const PREVIEW_COUNT = 3;

type PreviewPlace = Place & {
  category: string;
  categorySlug: string;
  categoryColor: string;
};

export default function TourismPreviewSection() {
  const [featuredPlaces, setFeaturedPlaces] = useState<PreviewPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPlaces() {
      setLoading(true);
      try {
        const allPlaces: PreviewPlace[] = [];
        for (const cat of tourismCategories.categories) {
          const places = await getTourismPlaces(cat.slug);
          allPlaces.push(
            ...places.map(place => ({
              ...place,
              category: place.category ?? cat.category,
              categorySlug: cat.slug,
              categoryColor:
                place.categoryColor ?? 'bg-primary-100 text-primary-700',
            }))
          );
        }

        const featured = allPlaces.filter(p => p.featured);
        if (featured.length > 0) {
          setFeaturedPlaces(featured.slice(0, PREVIEW_COUNT));
        } else {
          setFeaturedPlaces(allPlaces.slice(0, PREVIEW_COUNT));
        }
      } catch (error) {
        console.error('Failed to load tourism places:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedPlaces();
  }, []);

  if (loading) {
    return (
      <Section>
        <Heading level={2}>Popular Tourist Spots</Heading>
        <Text className="text-gray-600 mb-6">Loading popular spots...</Text>
      </Section>
    );
  }

  if (featuredPlaces.length === 0) {
    return null;
  }

  return (
    <Section className="border-0.5 border-gray-100 bg-gray-50" maxWidth="full">
      <h3 className="text-primary-600 font-bold text-md mb-2 flex items-center gap-1 uppercase tracking-wider">
        <MapPin />
        TOURISM
      </h3>
      <Heading level={2}>Discover Allen</Heading>
      <Text className="text-gray-600 mb-6">
        Discover the best places to visit, stay, and dine in{' '}
        {import.meta.env.VITE_GOVERNMENT_NAME}.
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPlaces.map(place => (
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
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-sm mb-2 mr-2 ${place.categoryColor}`}
                >
                  {place.category}
                </span>
                <span className=" inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-medium rounded-sm bg-gray-100 text-gray-800 mb-2">
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

      <div className="mt-8 text-center">
        <Link
          to="/tourism"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          View All →
        </Link>
      </div>
    </Section>
  );
}
