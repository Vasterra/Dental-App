/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDentist = /* GraphQL */ `
    query GetDentist($id: ID!) {
        getDentist(id: $id) {
            id
            firstName
            lastName
            phone
            qualifications
            bio
            website
            gdcNumber
            address
            city
            street
            postIndex
            email
            lat
            lng
            registered
            isDisabled
            hasPaidPlan
            services {
                items {
                    id
                    dentistId
                    name
                    createdAt
                    updatedAt

                }
                nextToken
            }
            locations {
                items {
                    id
                    dentistId
                    city
                    address
                    postCode
                    createdAt
                    updatedAt

                }
                nextToken
            }
            images {
                items {
                    id
                    dentistId
                    titleBefore
                    tagsBefore
                    titleAfter
                    tagsAfter
                    service
                    nameBefore
                    nameAfter
                    createdAt
                    updatedAt

                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const listDentists = /* GraphQL */ `
    query ListDentists(
        $filter: ModelDentistFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listDentists(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                firstName
                lastName
                phone
                qualifications
                bio
                website
                gdcNumber
                address
                city
                street
                postIndex
                email
                lat
                lng
                registered
                isDisabled
                hasPaidPlan
                services {
                    nextToken
                }
                locations {
                    nextToken
                }
                images {
                    nextToken
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getService = /* GraphQL */ `
    query GetService($id: ID!) {
        getService(id: $id) {
            id
            dentistId
            name
            createdAt
            updatedAt

        }
    }
`;
export const listServices = /* GraphQL */ `
    query ListServices(
        $filter: ModelServiceFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                dentistId
                name
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;
export const getLocation = /* GraphQL */ `
    query GetLocation($id: ID!) {
        getLocation(id: $id) {
            id
            dentistId
            city
            address
            postCode
            createdAt
            updatedAt

        }
    }
`;
export const listLocations = /* GraphQL */ `
    query ListLocations(
        $filter: ModelLocationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                dentistId
                city
                address
                postCode
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;
export const getServiceForDental = /* GraphQL */ `
    query GetServiceForDental($id: ID!) {
        getServiceForDental(id: $id) {
            id
            name
            createdAt
            updatedAt

        }
    }
`;
export const listServiceForDentals = /* GraphQL */ `
    query ListServiceForDentals(
        $filter: ModelServiceForDentalFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listServiceForDentals(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                name
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;
export const getPremiumFeatures = /* GraphQL */ `
    query GetPremiumFeatures($id: ID!) {
        getPremiumFeature(id: $id) {
            id
            name
            createdAt
            updatedAt

        }
    }
`;
export const listPremiumFeatures = /* GraphQL */ `
    query ListPremiumFeatures(
        $filter: ModelPremiumFeatureFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listPremiumFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                name
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;
export const getWatermark = /* GraphQL */ `
    query GetWatermark($id: ID!) {
        getWatermark(id: $id) {
            id
            dentistId
            lastModifiedDate
            name
            size
            type
            createdAt
            updatedAt

        }
    }
`;
export const listWatermarks = /* GraphQL */ `
    query ListWatermarks(
        $filter: ModelWatermarkFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listWatermarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                dentistId
                lastModifiedDate
                name
                size
                type
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;
export const getPremiumInformation = /* GraphQL */ `
    query GetPremiumInformation($id: ID!) {
        getPremiumInformation(id: $id) {
            id
            price
            termsAndConditions
            createdAt
            updatedAt

        }
    }
`;
export const listPremiumInformations = /* GraphQL */ `
    query ListPremiumInformations(
        $filter: ModelPremiumInformationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listPremiumInformations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                price
                termsAndConditions
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;
export const getImage = /* GraphQL */ `
    query GetImage($id: ID!) {
        getImage(id: $id) {
            id
            dentistId
            titleBefore
            tagsBefore
            titleAfter
            tagsAfter
            service
            nameBefore
            nameAfter
            createdAt
            updatedAt

        }
    }
`;
export const listImages = /* GraphQL */ `
    query ListImages(
        $filter: ModelImageFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                dentistId
                titleBefore
                tagsBefore
                titleAfter
                tagsAfter
                service
                nameBefore
                nameAfter
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;
export const getAdminSettingsSubscriber = /* GraphQL */ `
    query GetAdminSettingsSubscriber($id: ID!) {
        getAdminSettingsSubscriber(id: $id) {
            id
            paidMaxLocations
            paidMaxServices
            paidWebsiteAddress
            paidPhoneNumber
            paidAppearVerified
            freeMaxLocations
            freeMaxServices
            freeWebsiteAddress
            freePhoneNumber
            freeAppearVerified
            createdAt
            updatedAt
        }
    }
`;
export const listAdminSettingsSubscribers = /* GraphQL */ `
    query ListAdminSettingsSubscribers(
        $filter: ModelAdminSettingsSubscriberFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listAdminSettingsSubscribers(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                paidMaxLocations
                paidMaxServices
                paidWebsiteAddress
                paidPhoneNumber
                paidAppearVerified
                freeMaxLocations
                freeMaxServices
                freeWebsiteAddress
                freePhoneNumber
                freeAppearVerified
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getClosedAccount = /* GraphQL */ `
    query GetClosedAccount($id: ID!) {
        getClosedAccount(id: $id) {
            id
            dentistId
            closedAccount
            createdAt
            updatedAt

        }
    }
`;
export const listClosedAccounts = /* GraphQL */ `
    query ListClosedAccounts(
        $filter: ModelclosedAccountFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listClosedAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                dentistId
                closedAccount
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;
export const getClosedSubscription = /* GraphQL */ `
    query GetClosedSubscription($id: ID!) {
        getClosedSubscription(id: $id) {
            id
            dentistId
            closedSubscription
            createdAt
            updatedAt

        }
    }
`;
export const listClosedSubscriptions = /* GraphQL */ `
    query ListClosedSubscriptions(
        $filter: ModelclosedSubscriptionFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listClosedSubscriptions(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                dentistId
                closedSubscription
                createdAt
                updatedAt

            }
            nextToken
        }
    }
`;