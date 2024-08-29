"use client";
import React, { useState } from "react";
import TextInput from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
export default function Home() {
  const [searchValue, setSearchValue] = useState(""); // State for managing input value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Update state when input changes
  };

  const handleSearch = () => {
    console.log("Searching for weather:", searchValue); // Placeholder for search logic
  };
  return (
    <div className="flex items-end w-full max-w-4xl">
      <TextInput required label="Search weather" />
      <Button className="ml-2">Search</Button>
    </div>
  );
}
