import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";

export const SearchBar = () => {
  const params = useLocalSearchParams<{
    query: string;
  }>();
  const [query, setQuery] = React.useState(params.query || "");

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) {
      router.setParams({ query: null });
    }
  };

  const handleSubmit = () => {
    if (query.trim()) {
      router.setParams({ query });
    }
  };
  return (
    <View className="search-bar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholderTextColor="#A0A0A0"
        returnKeyType="search"
      />
      <TouchableOpacity
        className="pr-5"
        onPress={() => router.setParams({ query })}
      >
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5D5F6D"
        />
      </TouchableOpacity>
    </View>
  );
};
