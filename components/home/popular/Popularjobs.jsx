import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetchHook from "../../../hook/useFetchHook.js";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error, reFetchData } = useFetchHook("search", {
    query: "React Native developer",
    page: "1",
  });

  // keep track of first api request
  const [first, setFirst] = useState(true);

  // refecth api data
  const fetch = () => {
    reFetchData();
    setFirst(false);
  };

  const [selectedJob, setSelectedJob] = useState("");

  // handle job card press
  const handleCardPress = (item) => {
    // redirect to job-details route
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          first ? (
            fetch()
          ) : (
            <Text>Something went wrong...</Text>
          )
        ) : (
          // Show popular job card content
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
