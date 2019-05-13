const faker = require('faker');
const axios = require('axios');

const IDEA_GENERATOR = 'https://appideagenerator.com/call.php';
const IDEA_API = 'http://localhost:3000';

const randomInt = () => Math.floor(Math.random() * 10);

const generateIdea = async () => {
  const { data } = await axios.get(IDEA_GENERATOR);
  console.log(data);
  return data.replace(/\n/g, '');
};

const generateUser = async () => {
  const { data } = await axios.post(`${IDEA_API}/register`, {
    username: faker.internet.userName(),
    password: 'password',
  });
  console.log(data.token);
  return data.token;
};

const postNewIdea = async token => {
  const idea = await generateIdea();
  const { data } = await axios.post(
    `${IDEA_API}/api/ideas`,
    {
      idea,
      description: faker.lorem.paragraph(),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(data);
  return idea;
};

(async () => {
  const randomUserNum = randomInt();
  const randomIdeasNum = randomInt();
  for (let index = 0; index < randomUserNum; index++) {
    const token = await generateUser();
    for (let i = 0; i < randomIdeasNum; i++) {
      const idea = await postNewIdea(token);
    }
  }
})();
