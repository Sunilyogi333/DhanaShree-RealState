import {
  HomeIcon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';


const features = [
  {
    name: 'Verified Listings',
    description:
      'All properties are thoroughly verified to ensure authenticity, legality, and accuracy before listing.',
    icon: HomeIcon,
  },
  {
    name: 'Advanced Search Filters',
    description:
      'Use filters like location, price, property type, and amenities to easily find your dream property.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Virtual Property Tours',
    description:
      'Experience properties remotely with high-quality virtual tours and detailed visuals.',
    icon: VideoCameraIcon,
  },
  {
    name: 'Trusted Agents & Developers',
    description:
      'Connect with experienced real estate professionals and verified developers to guide your purchase or rental.',
    icon: BuildingOffice2Icon,
  },
];

export default function Feature() {
  return (
    <div className="bg-white lg:py-24 py-52">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-sky-600">Find your perfect space</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Smart solutions for your real estate journey
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Discover a seamless real estate experience with tools to search, explore, and connect with trusted experts.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16 hover:shadow-2xl p-10 rounded-lg ">
                <dt className="text-base font-semibold text-gray-900">
                  <div className="absolute lg:top-9 top-15 left-2 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
