"use client";

import React from "react";
// HeroUI / React Aria Components থেকে ফর্ম উপাদানগুলোর ইম্পোর্ট
import {
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";

const Form = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const destination = Object.fromEntries(formData.entries());
    console.log(destination);
  };

  // 💡 সাবমিট বাটনের লোডিং স্টেট হ্যান্ডেল করার জন্য (আপাতত ফলস রাখা হয়েছে)
  const isPending = false;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xs my-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 ">
        Add Destinations
      </h1>
      <form onSubmit={onSubmit} className="p-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Destination Name */}
          <div className="md:col-span-2">
            <TextField name="destinationName" isRequired>
              <Label>Destination Name</Label>
              <Input placeholder="Bali Paradise" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Country */}
          <TextField name="country" isRequired>
            <Label>Country</Label>
            <Input placeholder="Indonesia" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Category - Updated Select Component */}
          <div>
            <Select
              name="category"
              isRequired
              className="w-full"
              placeholder="Select category"
            >
              <Label>Category</Label>
              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Beach" textValue="Beach">
                    Beach
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Mountain" textValue="Mountain">
                    Mountain
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="City" textValue="City">
                    City
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Adventure" textValue="Adventure">
                    Adventure
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Cultural" textValue="Cultural">
                    Cultural
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Luxury" textValue="Luxury">
                    Luxury
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Price */}
          <TextField name="price" type="number" isRequired>
            <Label>Price (USD)</Label>
            <Input type="number" placeholder="1299" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Duration */}
          <TextField name="duration" isRequired>
            <Label>Duration</Label>
            <Input placeholder="7 Days / 6 Nights" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Departure Date */}
          <div className="md:col-span-2">
            <TextField name="departureDate" type="date" isRequired>
              <Label>Departure Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Image URL - Removed preview */}
          <div className="md:col-span-2">
            <TextField name="imageUrl" isRequired>
              <Label>Image URL</Label>
              <Input
                type="url"
                placeholder="https://example.com/bali-paradise.jpg"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description</Label>
              <TextArea
                placeholder="Describe the travel experience..."
                className="rounded-3xl"
              />
              <FieldError />
            </TextField>
          </div>
        </div>

        {/* Buttons */}
        <Button
          type="submit"
          variant="outline"
          isLoading={isPending}
          className="rounded-xl w-full bg-cyan-600 text-white font-semibold py-3 cursor-pointer hover:bg-cyan-700 transition-colors"
        >
          {isPending ? "Adding Package..." : "Add Travel Package"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
