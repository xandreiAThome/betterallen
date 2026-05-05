import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { motion } from 'motion/react';

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};
import { Link } from 'react-router-dom';

import { governmentCategories } from '../../data/yamlLoader';

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

interface GovernmentActivitySectionProps {
  title?: string;
  description?: string;
}

export default function GovernmentActivitySection({
  title,
  description,
}: GovernmentActivitySectionProps = {}) {
  const { t } = useTranslation();

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const displayedCategories = governmentCategories.categories as Category[];

  return (
    <Section id="#government">
      <Heading level={2}>{title || t('governmentActivity.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('governmentActivity.description')}
      </Text>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={listVariants}
      >
        {displayedCategories.map(category => (
          <motion.div key={category.slug} variants={itemVariants}>
            <Card hoverable className="border-t-4 border-primary-500">
              <Link
                to={`/government/${category.slug}`}
                className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
              >
                <CardContent className="flex flex-col h-full p-6">
                  <div className="flex gap-2">
                    <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start">
                      {getIcon(category.icon)}
                    </div>

                    <h3 className="text-lg font-semibold mb-4 text-gray-900 self-center">
                      {category.category}
                    </h3>
                  </div>
                  <Text className="text-gray-800">{category.description}</Text>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
