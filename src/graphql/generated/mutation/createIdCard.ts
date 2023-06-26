import { gql } from "@apollo/client";

export const CREATE_ID_CARD = gql`
  mutation createIdCard(
    $name: String!
    $registrationNumber: String!
    $issueDate: String!
  ) {
    createIdCard(
      name: $name
      registrationNumber: $registrationNumber
      issueDate: $issueDate
    ) {
      id
      name
      registrationNumber
      issueDate
    }
  }
`;
