const names = [
    'Aaron',
    'Benjamin',
    'Charlotte',
    'Daniel',
    'Elijah',
    'Fiona',
    'Gregory',
    'Harper',
    'Isabella',
    'James',
    'Kevin',
    'Logan',
    'Mason',
    'Noah',
    'Oliver',
    'Paula',
    'Quentin',
    'Rachel',
    'Samuel',
    'Timothy',
    'Uma',
    'Violet',
    'Will',
    'Xia',
    'Yasmin',
    'Zheng',
];

const thoughtTexts = [
    'Thoughts are words of our mind.',
    'Taking a moment to appreciate the beauty of nature.',
    'Feeling inspired after reading a powerful book.',
    'Grateful for sunny days and good company.',
    'How to make money on the App Store',
    'Sometimes the journey is more important than the destination.',
    'Reflecting on the past year',
    'Hello world',
    'Another possible solution to the algorithm',
    'Just finished reading To Kill a Mockingbird',
    'Loving my new job at the tech startup.',
];

const possibleReactions = [
    'I agree!',
    'I tried your method, here were the results',
    'This was awesome',
    'Thank you for the great content',
    'Please check out my response',
    'Subscribe to my blog please',
    'Reply: The side effects of in app purchases on digital marketplaces',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
    `${getRandomArrItem(names)}`;

// Function to generate random videos that we can add to the database. Includes video responses.
const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(thoughtTexts),
            username: getRandomName(),
            reactions: [...getReactions(2)],
        });
    }
    return results;
};

// Create the reactions that will be added to each thought
const getReactions = (int) => {
    if (int === 1) {
        return getRandomArrItem(possibleReactions);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            reactionBody: getRandomArrItem(possibleReactions),
            username: getRandomName(),
        });
    }
    return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, getReactions };
