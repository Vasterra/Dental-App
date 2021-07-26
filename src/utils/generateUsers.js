export function generateRandomPoints(center, radius, count) {
    var points = [];
    for (var i=0; i<count; i++) {
        points.push(generateRandomPoint(center, radius,i));
    }
    return points;
}


/**
 * Generates number of random geolocation points given a center and a radius.
 * Reference URL: http://goo.gl/KWcPE.
 * @param  {Object} center A JS object with lat and lng attributes.
 * @param  {number} radius Radius in meters.
 * @return {Object} The generated random points as JS object with lat and lng attributes.
 */
function generateRandomPoint(center, radius, i) {
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius/111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x/Math.cos(y0);

    // Resulting point.
    return {
        address: null,
        bio: "h6н55675675каа ввтраногнагнагнаганре",
        city: null,
        createdAt: "2021-07-23T10:00:50.668Z",
        customerID: null,
        email: "kerix67585@activesniper.com",
        firstName: "еккееккекекекекее",
        hasPaidPlan: i < 10 ? true : false,
        id: i + 'b20e9bc6-8064-43fa-9c6b-89c207f7f262',
        images: {nextToken: null},
        lastName: null,
        lat: y+y0,
        lng: xp+x0,
        locations: {nextToken: null},
        paymentMethodID: null,
        phone: null,
        postIndex: null,
        qualifications: "апрпарапра",
        registered: true,
        services: {
            items: [{name: 'service 1'}]
        },
        street: null,
        subscriptionID: null,
        updatedAt: "2021-07-23T10:16:03.048Z",
        website: null,
    }
}