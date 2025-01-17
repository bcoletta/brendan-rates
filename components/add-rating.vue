<script setup lang="ts">
import { format } from '@formkit/tempo';
import BcButton from "~/components/bc-design-system/bc-button.vue";
import BcInput from "~/components/bc-design-system/bc-input.vue";
import BcSearchInput from "~/components/bc-design-system/bc-search-input.vue";
import { searchTMDBMovies } from "~/services/tmdb-api";
import { useNotificationStore } from "~/store/notifications";
import { useUserStore } from "~/store/user";
import type {AddMovieBody, DropdownItem, TMDBMovie, TMDBSearchResult} from "~/types";
import {addMovie} from "~/services/movies";

const $config = useRuntimeConfig();
const $notification = useNotificationStore();
const $user = useUserStore();

const title = ref<string>();
const entertainment = ref<number>();
const story = ref<number>();
const dateWatched = ref<string>();
const tmdbId = ref<number>();
const review = ref<string>();

const saving = ref<boolean>(false);

const reset = () => {
  title.value = '';
  entertainment.value = 0;
  story.value = 0;
  dateWatched.value = format(new Date(), 'YYYY-MM-DD');
  tmdbId.value = -1;
  review.value = '';
};

const searchMovies = (searchTerm:string): Promise<DropdownItem[]> => {
  return searchTMDBMovies(searchTerm, $config.public.tmdbToken)
      .then((json: TMDBSearchResult): DropdownItem[] => {
        return json.results.map((movie: TMDBMovie): DropdownItem => {
          return {
            image: movie.poster_path && `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`,
            text: movie.title,
            value: movie.id,
          };
        });
      })
      .catch(err => {
        console.error(err)
        return [];
      });
};

const setTitle = (item: DropdownItem): void => {
  title.value = item.text;
  tmdbId.value = item.value;
};

const submit = (): void => {
  saving.value = true;

  const payload: AddMovieBody = {
    password: $user.password,
    title: title.value || '',
    tmdbId: tmdbId.value || -1,
    e: entertainment.value || 0,
    s: story.value || 0,
    date: format(dateWatched.value || new Date(), 'M/DD/YYYY'),
    review: review.value,
  }

  addMovie(payload).then(() => {
    console.log("Successfully added");
    saving.value = false;
    $notification.addNotification({
      message: `Rating for ${title.value} added!`,
      color: 'bg-emerald-500',
    });
  }).catch();
};

reset();
</script>

<template>
<div class="mx-4 md:mx-auto p-4 md:max-w-[50%] border border-white">
  <div class="text-center font-semibold">Add Movie Rating</div>

  <bc-search-input label="Title" :search-function="searchMovies" @select="setTitle" />
  <bc-input label="Entertainment" v-model="entertainment" inputType="number" />
  <bc-input label="Story" v-model="story" inputType="number" />
  <bc-input label="Date Watched" v-model="dateWatched" inputType="date" />

  <div class="w-full flex justify-between items-center">
    <bc-button class="" text="Reset" variant="text" @click="reset" />
    <bc-button text="Add" variant="primary" @click="submit" :disabled="saving" />
  </div>
</div>
</template>

<style scoped>

</style>