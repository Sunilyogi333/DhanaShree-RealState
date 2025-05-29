"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyType, PropertyStatus } from "@/types/property";
import { FormFieldConfig } from "@/types/forms";
import { englishToNepaliNumber } from "@/utils/numberUtils";

interface PropertyFormFieldsProps {
  form: UseFormReturn<any>;
  fields: FormFieldConfig[];
  className?: string;
}

export const PropertyFormFields: React.FC<PropertyFormFieldsProps> = ({
  form,
  fields,
  className,
}) => {
  return (
    <>
      {fields.map((field) =>
        field.toNepali ? (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  {field?.icon}
                  {field.label}
                </FormLabel>
                <FormControl>
                  {field.type === "select" ? (
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={formField.value}
                    >
                      <SelectTrigger className={className}>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "checkboxGroup" ? (
                    <div className="grid grid-cols-4 gap-4 mt-5">
                      {field.options?.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name={field.name}
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.value}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      option.value
                                    )}
                                    className="checked:bg-blue-500"
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || [];
                                      if (checked) {
                                        field.onChange([
                                          ...currentValue,
                                          option.value,
                                        ]);
                                      } else {
                                        field.onChange(
                                          currentValue.filter(
                                            (value: string) =>
                                              value !== option.value
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  ) : field.type === "textarea" ? (
                    <Textarea
                      className={className}
                      {...formField}
                      placeholder={field.placeholder}
                      onChange={(e) => {
                        formField.onChange(e);
                        form.setValue(
                          field.name + "Nep",
                          englishToNepaliNumber(e.target.value)
                        );
                      }}
                    />
                  ) : field.type === "unitArea" ? (
                    <div className="flex items-center gap-2">
                      <Input
                        className={className}
                        {...formField}
                        type="number"
                        min={0}
                        placeholder={field.placeholder}
                        onChange={(e) => {
                          const value = e.target.value;
                          const parsed = value === "" ? undefined : Number(value);
                      
                          formField.onChange(parsed); // Send number to RHF
                          form.setValue(`${field.name}Nep`, englishToNepaliNumber(value));
                        }}
                      />
                      <Select
                        onValueChange={(value) => {
                          form.setValue(field.name + "Unit", value);
                        }}
                        defaultValue={form.getValues(field.name + "Unit")}
                      >
                        <SelectTrigger className="w-1/3">
                          <SelectValue placeholder="unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : field.type === "number" ? (
                    <Input
                    className={className}
                    {...formField}
                    type="number"
                    min={0}
                    placeholder={field.placeholder}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsed = value === "" ? undefined : Number(value);
                  
                      formField.onChange(parsed); // Send number to RHF
                      form.setValue(`${field.name}Nep`, englishToNepaliNumber(value));
                    }}
                  />
                  ) : (
                    <Input
                      className={className}
                      {...formField}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={(e) => {
                        formField.onChange(e);
                        form.setValue(
                          field.name + "Nep",
                          englishToNepaliNumber(e.target.value)
                        );
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 font-semibold">
                  {field?.icon}
                  {field.label}
                </FormLabel>
                <FormControl>
                  <Input
                    className={className}
                    {...formField}
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      )}
    </>
  );
};
