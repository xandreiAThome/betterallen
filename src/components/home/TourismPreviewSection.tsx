import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';
import { tourismCategories, getTourismPlaces } from '../../data/tourismLoader';
import type { Place } from '../../data/tourismLoader';
import { useState, useEffect } from 'react';

const PREVIEW_COUNT = 3;

export default function TourismPreviewSection() {
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPlaces() {
      setLoading(true);
      try {
        const allPlaces: Place[] = [];
        for (const cat of tourismCategories.categories) {
          const places = await getTourismPlaces(cat.slug);
          allPlaces.push(...places);
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
    <Section>
      <Heading level={2}>Popular Tourist Spots</Heading>
      <Text className="text-gray-600 mb-6">
        Discover the best places to visit, stay, and dine in{' '}
        {import.meta.env.VITE_GOVERNMENT_NAME}.
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPlaces.map(place => (
          <Card key={place.slug} className="h-full">
            <CardContent>
              {place.image && (
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {place.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{place.description}</p>
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                {place.barangay}
              </span>
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
