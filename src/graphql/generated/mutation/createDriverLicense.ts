import { gql } from "@apollo/client";

export const CREATE_DRIVER_LICENSE = gql`
  mutation createDriverLicense(
    $name: String!
    $birth: String!
    $area: String!
    $licenseNumber: String!
    $serialNumber: String!
  ) {
    createDriverLicense(
      name: $name
      birth: $birth
      area: $area
      licenseNumber: $licenseNumber
      serialNumber: $serialNumber
    ) {
      id
      name
      birth
      area
      licenseNumber
      serialNumber
    }
  }
`;
