import { gql } from "@apollo/client";

export const GET_FAVORITES = gql`
  query getFavorites {
    favorites @client {
      _id
      title
      popularity
      poster_path
      tags
      overview
    }
  }
`