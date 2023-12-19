import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetchHook from "../../../hook/useFetchHook.js";

// Nearby Jobs
const Nearbyjobs = () => {
  const router = useRouter();
  // fetch search data
  const { data, isLoading, error, reFetchData } = useFetchHook("search", {
    query: "React Native developer",
    num_pages: "1",
  });

  // keep track of first api request
  const [first, setFirst] = useState(true);

  // refetch api data
  const fetch = () => {
    reFetchData();
    setFirst(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      {/* Nearby Job Content */}
      <View style={styles.cardsContainer}>
        {isLoading ? (
          // Loader
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          first ? (
            fetch()
          ) : (
            <Text>Something went wrong...</Text>
          )
        ) : (
          // show nearby job card
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
