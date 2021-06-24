const ListDentists = gql`
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
                city
                street
                postIndex
                email
                lat
                lng
                registered
                services {
                    nextToken
                }
                practices {
                    nextToken
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`

const findCoordinatesDentists = (coordinate, dentists) => {
    let distanceDent = [];

    if (!dentists) {
        return null
    }

    dentists.map((dent) => {
        // @ts-ignore
        const a = {'Longitude': coordinate?.lng, 'Latitude': coordinate?.lat};
        const b = {'Longitude': dent.lng, 'Latitude': dent.lat};
        const distanceCur = (111.111 *
            (180 / Math.PI) * (
                Math.acos(Math.cos(a.Latitude * (Math.PI / 180))
                    * Math.cos(b.Latitude * (Math.PI / 180))
                    * Math.cos((a.Longitude - b.Longitude) * (Math.PI / 180))
                    + Math.sin(a.Latitude * (Math.PI / 180))
                    * Math.sin(b.Latitude * (Math.PI / 180)))))
        if (distanceCur < 100) {
            distanceDent.push(dent)
        }
    })
    return distanceDent
}

exports.handler = async (event) => {
    try {
        console.log(event)
        let {lat, lng} = event.arguments;
        const dentists = await ListDentists.find();
        return findCoordinatesDentists({lat, lng}, dentists.data.listDentists.items)
    } catch (err) {
        console.log(err);
        return new Error(err);
    }

}