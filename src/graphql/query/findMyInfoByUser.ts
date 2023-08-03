import { gql } from "../generated";

export const FIND_MY_INFO_BY_USER = gql(/* GraphQL */ `
  query findMyInfoByUser {
    findMyInfoByUser {
      identity
      createdAt
      walletAddressKind
      walletAddress
      level
      connectionDate
      countryCode
      phone
      emailAuth {
        id
        email
        createdAt
      }
      idCard {
        id
        name
        registrationNumber
        issueDate
      }
      driverLicense {
        id
        name
        birth
        area
        licenseNumber
        serialNumber
      }
      passport {
        id
        name
        passportNumber
        issueDate
        expirationDate
        birth
      }
      positiveFeedbackCount
      negativeFeedbackCount
      offerCompleteCount
    }
  }
`);
