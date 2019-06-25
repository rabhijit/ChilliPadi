export const JioSchema = {
    name: 'Jio',
    primaryKey: 'jioId',
    properties: {
        jioId: 'int',
        titleName: 'string',
        location: 'string',
        distanceFromHere: 'int',
        description: 'string',
        numberOfPeople: 'int',
        maxNumber: 'double',
        expiryDate: 'string',
        genderPref: 'int?', // optional
        jioCreator: 'string'
    }
}

export const AccountSchema = {
    name: 'Account',
    primaryKey: 'ID',
    properties: {
        ID: 'string',
        password: 'string',
        name: 'string',
        fac: 'string'
    }
}