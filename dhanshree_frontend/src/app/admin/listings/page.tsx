'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building, BedDouble, Car, Ruler, Landmark, MapPin, Calendar, Tag, Camera } from 'lucide-react';
// import { toast } from 'sonner';

const propertySchema = z.object({
  description: z.string().min(10),
  bedrooms: z.number().min(0),
  kitchens: z.number().min(0),
  floors: z.number().min(0),
  livingRooms: z.number().min(0),
  parkingSpaces: z.number().min(0),
  builtArea: z.string().min(1),
  landArea: z.string().min(1),
  builtYear: z.string().min(4),
  status: z.string(),
  type: z.string(),
  askingPrice: z.string(),
  image: z.any().optional(),
});

export default function AddProperty() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/admin/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to submit property');
      }

    //   toast.success('Property submitted successfully!');
    } catch (error: any) {
      console.error('Error:', error);
    //   toast.error(error.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Property</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="general">General Info</TabsTrigger>
            <TabsTrigger value="details">Additional Details</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-5">
              <div className="flex flex-col space-y-5">
                <Label htmlFor="description">Description</Label>
                <Textarea {...register('description')} placeholder="Describe the property..." />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="bedrooms" className="flex items-center gap-2"><BedDouble size={16} className='text-sky-500'/> Bedrooms</Label>
                  <Input type="number" {...register('bedrooms', { valueAsNumber: true })} />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="kitchens" className="flex items-center gap-2"><Building size={16} className='text-sky-500'/> Kitchens</Label>
                  <Input type="number" {...register('kitchens', { valueAsNumber: true })} />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="floors" className="flex items-center gap-2 "><Landmark size={16} className='text-sky-500'/> Floors</Label>
                  <Input type="number" {...register('floors', { valueAsNumber: true })} />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="livingRooms" className="flex items-center gap-2"><MapPin size={16} className='text-sky-500'/> Living Rooms</Label>
                  <Input type="number" {...register('livingRooms', { valueAsNumber: true })} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="parkingSpaces" className="flex items-center gap-2"><Car size={16} className='text-sky-500'/> Parking</Label>
                  <Input type="number" {...register('parkingSpaces', { valueAsNumber: true })} />
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <Button type="submit" className="w-full md:w-1/2">Next</Button>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="builtArea" className="flex items-center gap-2"><Ruler size={16} className='text-sky-500'/> Built-in Area</Label>
                  <Input {...register('builtArea')} placeholder="e.g. 1200 sqft" />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="landArea" className="flex items-center gap-2"><Ruler size={16} className='text-sky-500'/> Land Area</Label>
                  <Input {...register('landArea')} placeholder="e.g. 2000 sqft" />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="builtYear" className="flex items-center gap-2"><Calendar size={16} className='text-sky-500'/> Built Year</Label>
                  <Input {...register('builtYear')} placeholder="e.g. 2015" />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="status" className="flex items-center gap-2"><Tag size={16} className='text-sky-500'/> Status</Label>
                  <select {...register('status')}>
                    <option value="exclusive">Exclusive</option>
                    <option value="featured">Featured</option>
                    <option value="available">Available</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="type" className="flex items-center gap-2"><Building size={16} className='text-sky-500'/> Property Type</Label>
                  <select {...register('type')}>
                    <option value="land">Land</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="askingPrice" className="flex items-center gap-2"><Tag size={16} className='text-sky-500'/> Asking Price</Label>
                  <Input {...register('askingPrice')} placeholder="e.g. Rs75,00,000" />
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <Button type="submit" className="w-full md:w-1/2">Next</Button>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="space-y-5">
              <div className="flex flex-col gap-3">
                <Label htmlFor="image" className="flex items-center gap-2"><Camera size={16}/> Upload Image</Label>
                <Input type="file" {...register('image')} />
              </div>
            </div>

            <div className="pt-4 text-center">
              <Button type="submit" className="w-full md:w-1/2">Submit Property</Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
