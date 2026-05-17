"use client";

import React from "react";
// react-toastify ইম্পোর্ট করা হলো
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // সাবমিট বাটনের লোডিং স্টেট হ্যান্ডেল করার জন্য state
  const [isPending, setIsPending] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget; // ফর্মের রেফারেন্স রাখা হলো রিসেট করার জন্য
    const formData = new FormData(form);

    const destination = Object.fromEntries(formData.entries());
    console.log(destination);

    setIsPending(true); // লোডিং শুরু

    try {
      const res = await fetch('http://localhost:5000/destinations', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(destination) // সেমিকোলন দেওয়া যাবে না
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);

        // 🎉 সফল হলে টোস্ট নোটিফিকেশন
        toast.success("Destination added successfully! ✈️");

        // 🧹 ফর্মের ফিলগুলো ফাঁকা (Reset) করার জন্য
        form.reset(); 
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to the server!");
    } finally {
      setIsPending(false); // লোডিং শেষ
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xs my-6">
      {/* 🧩 টোস্ট কন্টেইনারটি এখানে যুক্ত করা হলো */}
      <ToastContainer position="top-center" autoClose={3000} />

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

          {/* Category */}
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

          {/* Image URL */}
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