import { z } from "zod";

export const propertySchema = z.object({
  // English fields
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }),
  propertyCode: z.string().min(5, {
    message: "Property code must be at least 5 characters long",
  }),
  bedrooms: z.number().min(0, {
    message: "Bedrooms must be a positive number",
  }),
  kitchens: z.number().min(0, {
    message: "Kitchens must be a positive number",
  }),
  floors: z.number().min(0, {
    message: "Floors must be a positive number",
  }),
  livingRooms: z.number().min(0, {
    message: "Living rooms must be a positive number",
  }),
  parkingSpaces: z.number().min(0, {
    message: "Parking spaces must be a positive number",
  }),
  builtArea: z.string().min(1, {
    message: "Built area is required",
  }),
  landArea: z.string().min(1, {
    message: "Land area is required",
  }),
  builtYear: z.string().min(4, {
    message: "Built year must be at least 4 digits",
  }),
  status: z.enum(["available", "featured", "exclusive"]),
  type: z.enum(["land", "house", "apartment", "villa"]),
  askingPrice: z.string().min(1, {
    message: "Asking price is required",
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed")
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
      "Each file must be less than 5MB"
    )
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
        ),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  // Nepali fields (optional)
  description_np: z
    .string()
    .min(10, {
      message: "विवरण कम्तिमा १० वर्ण लामो हुनुपर्छ",
    })
    .optional(),
  bedroomsNep: z.string().optional(),
  kitchensNep: z.string().optional(),
  floorsNep: z.string().optional(),
  livingRoomsNep: z.string().optional(),
  parkingSpacesNep: z.string().optional(),
  askingPriceNep: z.string().optional(),
  landAreaNep: z
    .string()
    .min(1, {
      message: "जग्गाको क्षेत्र आवश्यक छ",
    })
    .optional(),
  builtAreaNep: z
    .string()
    .min(1, {
      message: "निर्माण क्षेत्र आवश्यक छ",
    })
    .optional(),
  propertyCodeNep: z
    .string()
    .min(5, {
      message: "सम्पत्ति कोड कम्तिमा ५ वर्ण लामो हुनुपर्छ",
    })
    .optional(),
});

// Extract the inferred type
export type PropertyFormValues = z.infer<typeof propertySchema>;
