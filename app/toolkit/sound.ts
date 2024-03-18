import { retry } from "@reduxjs/toolkit/query/react";
import api from "./api";
import { Sound } from "../types/Sound";

type SoundsResponse = Sound[];

export const SoundsApi = api.injectEndpoints({
  endpoints: (build) => ({
    addSound: build.mutation<Sound, Partial<Sound>>({
      query: (body) => ({
        url: `lost-sound`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Sounds", id: "LIST" }],
    }),
    getSound: build.query<Sound[], string>({
      query: () => ({ url: `sounds` }),
      providesTags: (_Sound = [], _err) => [
        ..._Sound.map(({ _id }) => ({ type: "Sounds", _id } as const)),
        { type: "Sounds" as const, id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useAddSoundMutation, useGetSoundQuery } = SoundsApi;
