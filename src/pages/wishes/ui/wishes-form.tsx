import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Wish } from '@/shared/types/wish';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Switch } from '@/shared/ui/switch';
import { Flex } from '@/shared/ui';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().optional(),
  price: z
    .object({
      amount: z.number().min(0),
      currency: z.string().default('USD'),
    })
    .optional(),
  isVisible: z.boolean().default(true),
  productUrl: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type WishesFormProps = {
  onSubmit: (data: Partial<Wish>) => void;
  onCancel?: () => void;
};

// TODO: Пока что фигня сгенерированная иишкой

export function WishesForm({ onSubmit, onCancel }: WishesFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      isVisible: true,
      productUrl: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: FormValues) => {
    // Transform form values to match Wish type
    const wishData: Partial<Wish> = {
      ...values,
      isFulfilled: false, // New wishes are not fulfilled by default
    };

    onSubmit(wishData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Flex direction="column" gap={4}>
          {/* Image Upload */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center gap-4">
                    <Input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
                    {imagePreview && (
                      <div className="relative w-full max-w-[300px] aspect-square rounded-md overflow-hidden">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Upload an image for your wish (optional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="What do you wish for?" {...field} />
                </FormControl>
                <FormDescription>The name of your wish</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Describe your wish (optional)" {...field} />
                </FormControl>
                <FormDescription>Additional details about your wish</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price.amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? undefined : parseFloat(value));
                    }}
                  />
                </FormControl>
                <FormDescription>Approximate price (optional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product URL */}
          <FormField
            control={form.control}
            name="productUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/product" {...field} />
                </FormControl>
                <FormDescription>Link to the product (optional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Visibility Toggle */}
          <FormField
            control={form.control}
            name="isVisible"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Visibility</FormLabel>
                  <FormDescription>Make your wish visible to others</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Form Actions */}
          <Flex gap={2} justify="end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit">Create Wish</Button>
          </Flex>
        </Flex>
      </form>
    </Form>
  );
}
