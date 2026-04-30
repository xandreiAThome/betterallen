import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { serviceCategories } from '../../data/yamlLoader';

const PREVIEW_COUNT = 6;

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

export default function ServicesSection({
  title,
  description,
  preview = true,
}: {
  title?: string;
  description?: string;
  preview?: boolean;
}) {
  const { t } = useTranslation();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsLargeScreen(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const allCategories = serviceCategories.categories as Category[];
  const displayedCategories =
    preview && !isLargeScreen
      ? allCategories.slice(0, PREVIEW_COUNT)
      : allCategories;
  const hasMore =
    preview && !isLargeScreen && allCategories.length > PREVIEW_COUNT;

  return (
    <Section>
      <Heading level={2}>{title || t('services.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('services.description')}
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map(category => (
          <Card
            key={category.slug}
            hoverable
            className="border-t-4 border-primary-500"
          >
            <Link
              to={`/services/${category.slug}`}
              className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
            >
              <CardContent className="flex flex-col h-full p-6">
                <div className="flex gap-2">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start">
                    {getIcon(category.icon)}
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-gray-900 self-center">
                    {t(`services.${category.slug}.category`, {
                      defaultValue: category.category,
                    })}
                  </h3>
                </div>
                <Text className="text-gray-800">{category.description}</Text>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            View All →
          </Link>
        </div>
      )}
    </Section>
  );
}
